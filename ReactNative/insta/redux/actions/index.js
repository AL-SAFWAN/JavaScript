import firebase from "firebase";
import {
  USERS_DATA_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USER_POST_STATE_CHANGE,
  USER_STATE_CHANGE,
  CLEAR_DATA,
  USERS_LIKES_STATE_CHANGE,
} from "./type";

export function clearData(dispatch) {
  dispatch({ type: CLEAR_DATA });
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
        dispatch(() => fetchUsersData(dispatch, store, uid, true));
      });
    });
}

export function fetchUsersData(dispatch, store, uid, isPost) {
  "STORE IN FETCH", store, uid;
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
          if (isPost) {
            dispatch(() => fetchUserFollowersPost(dispatch, store, user));
          }
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
      // console.log(snap.kf.query.path.segments[1]);

      const uid = snap.kf.query.path.segments[1];
      // console.log(snap.docs[0].ref.path.split("/")[1], uid);
      let posts = snap.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data, user };
      });
      posts.forEach((post) => {
        console.log(post.id);
        dispatch(() => {
          fetchUserFollowersLikes(dispatch, store, user, post.id);
        });
      });
      dispatch({ type: USER_POSTS_STATE_CHANGE, posts, uid });
    });
}

export function fetchUserFollowersLikes(dispatch, store, user, postId) {
  firebase
    .firestore()
    .collection("posts")
    .doc(user.uid)
    .collection("userPosts")
    .doc(postId)
    .collection("likes")
    .doc(firebase.auth().currentUser.uid)
    .onSnapshot((snap) => {
      const postId = snap["f_"].path.segments[3];
      // snap.kf.query.path.segments[1]
      let currentUserLike = false;
      if (snap.exists) {
        currentUserLike = true;
      }
      console.log(snap.exists)
      dispatch({ type: USERS_LIKES_STATE_CHANGE, postId, currentUserLike });
    });
}
