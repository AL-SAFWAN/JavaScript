import React, { useEffect } from "react";
import { Text, View } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/actions";
import user from "../redux/reducers/user";

export default function Main() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { currentUser } = state.user;

  useEffect(() => {
    dispatch(() => fetchUser(dispatch));
  }, [dispatch]);
  const hello = 'yo'

  if (currentUser == undefined) return <Text>User info loading... </Text>;
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text> {currentUser.name} is logged in... </Text>
    </View>
  );
}
