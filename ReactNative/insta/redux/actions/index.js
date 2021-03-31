import firebase from "firebase";
import {
  USER_FOLLOWING_STATE_CHANGE,
  USER_POST_STATE_CHANGE,
  USER_STATE_CHANGE,
} from "./type";

export function fetchUser(dispatch, uid) {
  console.log("fetch user called");
  firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get()
    .then((snap) => {
      // console.log(snap,firebase.auth().currentUser.uid)
      if (snap.exists) {
        dispatch({ type: USER_STATE_CHANGE, currentUser: snap.data() });
      } else {
        console.log("user does not exist");
      }
    });
}
export function fetchUserPost(dispatch, uid) {
  console.log("fetch user post called");
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
export function fetchUserFollowing(dispatch) {
  console.log("fetch user post called");
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
    });
}
