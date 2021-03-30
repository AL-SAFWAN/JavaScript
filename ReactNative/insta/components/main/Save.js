import React, { useState } from "react";
import { View, Image, TextInput, Button } from "react-native";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

export default function Save(props) {
  const [caption, setCaption] = useState("");

    const savePostData =(url)=>{
        firebase.firestore().collection('posts').doc(firebase.auth().currentUser.uid)
        .collection('userPosts').add({
            downloadURL : url, 
            caption,
            creation: firebase.firestore.FieldValue.serverTimestamp()
        }).then(()=>{
            props.navigation.popToTop()
        })
    }

  const uploadImage = async () => {
    const uri = props.route.params.image;
    const response = await fetch(uri);
    const blob = await response.blob();

    const task = firebase
      .storage()
      .ref()
      .child(
        `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
      )
      .put(blob);

    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };
    const taskComplete = () => {
      task.snapshot.ref.getDownloadURL().then((url) => {
        savePostData(url)
        console.log(url, 'comp');
      });
    };
    const taskError = (snapshot) => {
      console.log(snapshot,'err');
    };

    task.on("state_changed", taskProgress, taskError, taskComplete);
  };

  return (
    <View>
      <Image source={{ uri: props.route.params.image }} />
      <TextInput
        placeholder="Write a Caption ..."
        onChangeText={(caption) => setCaption(caption)}
      />
      <Button title={"Save"} onPress={() => uploadImage()} />
    </View>
  );
}
