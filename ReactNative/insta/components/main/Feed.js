import React from "react";
import { Text, View, Image, FlatList, StyleSheet } from "react-native";

export default function Feed() {
  return (
    <View style={style.container}>
      <Text>Feed</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    margin: 40,
  },
});
