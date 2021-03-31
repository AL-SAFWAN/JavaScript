import React from "react";
import { Text, View, Image, FlatList } from "react-native";
import { connect , useSelector} from "react-redux";

function Profile({currentUser, posts}) {
    const state = useSelector(state => state.user)
    console.log(currentUser,posts,state)
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
}
const mapStateToProps = (store) => ({
  currentUser: store.user.currentUser,
  posts: store.user.posts,
});

export default connect(mapStateToProps, null)(Profile);
