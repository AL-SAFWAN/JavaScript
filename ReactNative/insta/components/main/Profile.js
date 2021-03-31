import React from "react";
import { Text, View, Image, FlatList, StyleSheet } from "react-native";
import { connect, useSelector } from "react-redux";

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

function Profile({ currentUser, posts }) {
  const state = useSelector((state) => state.user);
  console.log(currentUser, posts, state);
  return (
    <View style={style.container}>
      <View style={style.containerInfo}>
        <Text>{currentUser.name}</Text>
        <Text>{currentUser.email}</Text>
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
});

export default connect(mapStateToProps, null)(Profile);
