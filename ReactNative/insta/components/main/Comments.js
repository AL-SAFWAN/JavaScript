import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Button,
} from "react-native";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersData } from "../../redux/actions";
require("firebase/firestore");

export default function Comments(props) {
  const ref = useRef("");
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState("");
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    console.log(state)
    const matchUserToComments = (comments) => {
      const newCom = [...comments]
      newCom.forEach((comment) => {
        const user = state.usersState.users.find(
          (user) => user.uid === comment.creator
        );
        if (user == undefined) {
          dispatch(() => {
            fetchUsersData(dispatch, state, comment.creator, false);
          });
        } else {
          comment.user = user;
        }
      });
      setComments(newCom);
    };

    if (props.route.params.postId !== postId) {
      firebase
        .firestore()
        .collection("posts")
        .doc(props.route.params.uid)
        .collection("userPosts")
        .doc(props.route.params.postId)
        .collection("comments")
        .get()
        .then((snap) => {
          let comments = snap.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          matchUserToComments(comments);
          setPostId(props.route.params.postId);
        });
    } else {
      matchUserToComments(comments);
    }
  }, [props.route.params.postId, state]);

  const sendComment = () => {
    firebase
      .firestore()
      .collection("posts")
      .doc(props.route.params.uid)
      .collection("userPosts")
      .doc(props.route.params.postId)
      .collection("comments")
      .add({
        creator: firebase.auth().currentUser.uid,
        text,
      });
  };
  return (
    <View style={style.container}>
      <FlatList
        numColumns={1}
        horizontal={false}
        data={comments}
        renderItem={({ item }) => {
          return (
            <View>
              {item.user != undefined ? <Text>name: { item.user.name}</Text> : null}
              <Text> {item.text}</Text>
            </View>
          );
        }}
      />
      <View>
        <TextInput
          placeholder="comment..."
          onChangeText={(search) => {
            ref.current = search;
            setText(search);
          }}
        />
        <Button
          title="Post"
          onPress={() => {
            sendComment();
          }}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    // flex: 1,
    margin: 40,
  },
});
