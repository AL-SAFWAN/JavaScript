import firebase from "firebase";
import React, { useState, useEffect } from "react";
import { Text, View, Image, FlatList, StyleSheet, Button } from "react-native";
import parseErrorStack from "react-native/Libraries/Core/Devtools/parseErrorStack";
import { connect, useSelector, useDispatch } from "react-redux";
import {
  fetchUser,
  fetchUserPost,
  fetchUserFollowing,
} from "../../redux/actions";

function AspectView(props) {
  const [layout, setLayout] = React.useState(null);

  const { aspectRatio = 1, ...inputStyle } =
    StyleSheet.flatten(props.style) || {};
  const style = [inputStyle, { aspectRatio }];

  if (layout) {
    const { width = 0, height = 0 } = layout;
    if (width === 0) {
      style.push({ width: height * aspectRatio, height });
    } else {
      style.push({ width, height: width * aspectRatio });
    }
  }

  return (
    <View
      {...props}
      style={style}
      onLayout={({ nativeEvent: { layout } }) => setLayout(layout)}
    />
  );
}

function Feed(props) {
  const [posts, setPost] = useState([]);
  // const { currentUser, posts } = props;
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  console.log(props, posts);
  useEffect(() => {
    if (
      props.usersFollowingLoaded == props.following.length &&
      props.following.length !== 0
    ) {
      props.feed.sort((x, y) => {
        return x.creation - y.creation;
      });
      setPost(props.feed);
    }
  }, [props.usersFollowingLoaded, props.feed]);

  const onLike = (uid, postId) => {
    console.log(uid,postId)
    firebase
      .firestore()
      .collection("posts")
      .doc(uid)
      .collection("userPosts")
      .doc(postId)
      .collection("likes")
      .doc(firebase.auth().currentUser.uid)
      .set({});
  };
  const onUnLike = (uid, postId) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(uid)
      .collection("userPosts")
      .doc(postId)
      .collection("likes")
      .doc(firebase.auth().currentUser.uid)
      .delete();
  };
  return (
    <View style={style.container}>
      <View style={style.containerGallery}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => {
            console.log(item);
            return (
              <AspectView style={style.containerImage}>
                <Text style={style.containerImage}>{item.user.name}</Text>
                <Image style={style.image} source={{ uri: item.downloadURL }} />
                {item.currentUserLike ? (
                  <Button
                    title="unlike"
                    onPress={() => {
                      onUnLike(item.user.uid, item.id);
                    }}
                  />
                ) : (
                  <Button
                    title="like"
                    onPress={() => {
                      onLike(item.user.uid, item.id);
                    }}
                  />
                )}
                <Text
                  style={style.containerImage}
                  onPress={() => {
                    props.navigation.navigate("Comments", {
                      postId: item.id,
                      uid: item.user.uid,
                    });
                  }}
                >
                  View comments ...
                </Text>
              </AspectView>
            );
          }}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  containerInfo: {
    margin: 20,
  },
  containerGallery: {
    // flex: 1,
  },
  containerImage: {
    // flex: 1 / 1,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  following: store.userState.following,
  feed: store.usersState.feed,
  feed: store.usersState.feed,

  usersFollowingLoaded: store.usersState.usersFollowingLoaded,
});

export default connect(mapStateToProps, null)(Feed);
