import firebase from "firebase";
import { USER_POST_STATE_CHANGE, USER_STATE_CHANGE } from "./type";

export function fetchUser(dispatch) {
  console.log("fetch user called");
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((snap) => {
      console.log(snap,firebase.auth().currentUser.uid)
      if (snap.exists) {
        console.log(snap.data(), "check here");
        dispatch({ type: USER_STATE_CHANGE, currentUser: snap.data() });
      } else {
        console.log("user does not exist");
      }
    });
}
export function fetchUserPost(dispatch) {
  console.log("fetch user post called");
  firebase
    .firestore()
    .collection("posts")
    .doc(firebase.auth().currentUser.uid)
    .collection('userPosts').orderBy('creation', 'asc')
    .get()
    .then((snap) => {
      let posts = snap.docs.map(doc =>{
        const data = doc.data()
        const id = doc.id
        return {id,...data}
      })
      dispatch({type: USER_POST_STATE_CHANGE, posts})
    });
}
