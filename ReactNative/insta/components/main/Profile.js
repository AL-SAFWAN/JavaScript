import firebase from "firebase";
import React, { useState, useEffect } from "react";
import { Text, View, Image, FlatList, StyleSheet, Button } from "react-native";
import { connect, useSelector, useDispatch } from "react-redux";
import { fetchUser, fetchUserPost } from "../../redux/actions";

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

function Profile(props) {
  const [following, setFollowing] = useState(false);
  const { currentUser, posts  } = props;
  const dispatch = useDispatch();

  const state = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(() => fetchUser(dispatch, props.route.params.uid));
    dispatch(() => fetchUserPost(dispatch, props.route.params.uid));

    if (props.following.indexOf(props.route.params.uid) > -1) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, [props.route.params.uid, props.following]);

  const onFollow = () => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(props.route.params.uid)
      .set({});
  };

  const onUnFollow = () => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(props.route.params.uid)
      .delete();
  };

  if (currentUser === null) return <View></View>;

  return (
    <View style={style.container}>
      <View style={style.containerInfo}>
        <Text>{currentUser.name}</Text>
        <Text>{currentUser.email}</Text>
        {props.route.params.uid !== firebase.auth().currentUser.uid && (
          <View>
            {following ? (
              <Button title="Following" onPress={() => onUnFollow()} />
            ) : (
              <Button title="Follow" onPress={() => onFollow()} />
            )}
          </View>
        )}
      </View>
      <View style={style.containerGallery}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => {
            return (
              <AspectView style={style.containerImage}>
                <Image style={style.image} source={{ uri: item.downloadURL }} />
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
    flex: 1,
  },
  containerImage: {
    flex: 1 / 3,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.user.currentUser,
  posts: store.user.posts,
  following: store.user.following,
});

export default connect(mapStateToProps, null)(Profile);
