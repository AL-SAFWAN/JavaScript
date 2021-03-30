import firebase from "firebase";
import { USER_STATE_CHANGE } from "./type";

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
