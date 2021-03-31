import React, { useState, useRef } from "react";
import {
  Text,
  View,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";
require("firebase/firestore");

export default function Search(props) {
  const ref = useRef("");
  const [users, setUsers] = useState([]);

  const fetchUsers = (search) => {
    firebase
      .firestore()
      .collection("users")
      .where("name", ">=", search)
      .get()
      .then((snap) => {
        let users = snap.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        console.log(users);
        setUsers(users);
      });
  };

  return (
    <View style={style.container}>
      <TextInput
        placeholder="search user..."
        onChangeText={(search) => {
          ref.current = search;
          fetchUsers(search);
        }}
      />
      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({ item }) => {
          if (ref.current === "") return;
          return (
            <TouchableOpacity 
            onPress={()=>{
                props.navigation.navigate('Profile', {uid: item.id})
            }}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    margin: 40,
  },
});
