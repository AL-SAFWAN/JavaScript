import firebase from "firebase";
import {
  USERS_DATA_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USER_POST_STATE_CHANGE,
  USER_STATE_CHANGE,
  CLEAR_DATA
} from "./type";

export function  clearData(dispatch){
  dispatch({type:CLEAR_DATA })
}

export function fetchUser(dispatch, uid) {

  firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get()
    .then((snap) => {
      // (snap,firebase.auth().currentUser.uid)
      if (snap.exists) {
        dispatch({ type: USER_STATE_CHANGE, currentUser: snap.data() });
      } else {
      }
    });
}
export function fetchUserPost(dispatch, uid) {

  firebase
    .firestore()
    .collection("posts")
    .doc(uid)
    .collection("userPosts")
    .orderBy("creation", "asc")
    .get()
    .then((snap) => {
      let posts = snap.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data };
      });
      dispatch({ type: USER_POST_STATE_CHANGE, posts });
    });
}
export function fetchUserFollowing(dispatch, store) {
 firebase
    .firestore()
    .collection("following")
    .doc(firebase.auth().currentUser.uid)
    .collection("userFollowing")
    .onSnapshot((snap) => {
      let following = snap.docs.map((doc) => {
        return doc.id;
      });
      dispatch({ type: USER_FOLLOWING_STATE_CHANGE, following });
      following.forEach((uid) => {
        dispatch(() => fetchUsersData(dispatch, store, uid));
      });
    });
}

export function fetchUsersData(dispatch, store, uid) {
  ("STORE IN FETCH", store, uid);
  const found = store.usersState.users.some((e) => e.uid === uid);
  if (!found) {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((snap) => {
        if (snap.exists) {
          let user = snap.data();
          user.uid = snap.id;
          dispatch({ type: USERS_DATA_STATE_CHANGE, user });
          dispatch(() => fetchUserFollowersPost(dispatch, store, user));
        } else {
          ("user does not exist");
        }
      });
  }
}

export function fetchUserFollowersPost(dispatch, store, user) {

  firebase
    .firestore()
    .collection("posts")
    .doc(user.uid)
    .collection("userPosts")
    .orderBy("creation", "asc")
    .get()
    .then((snap) => {
      const uid = snap.docs[0].ref.path.split("/")[1];
      console.log(snap.docs[0].ref.path.split("/")[1], uid);
      let posts = snap.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data, user };
      });
      dispatch({ type: USER_POSTS_STATE_CHANGE, posts, uid });
    });
}
