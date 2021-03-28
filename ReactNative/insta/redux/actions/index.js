import firebase from "firebase";
import { USER_STATE_CHANGE } from "./type";

export function fetchUser(dispatch) {
  console.log("is this called");
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((snap) => {
      if (snap.exists) {
        console.log(snap.data(), "check here");
        dispatch({ type: USER_STATE_CHANGE, currentUser: snap.data() });
      } else {
        console.log("user does not exist");
      }
    });
}
