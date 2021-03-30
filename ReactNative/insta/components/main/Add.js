import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { Camera } from "expo-camera";
import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function Add({navigation}) {
  const [hasCamPermission, setHasCamPermission] = useState(null);
  const [hasGalPermission, setHasGalPermission] = useState(null);

  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  const [type, setType] = useState(Camera.Constants.Type.back);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const Cam = await Camera.requestPermissionsAsync();
        setHasCamPermission(Cam.status === "granted");
      } else {
        // it is the web
        if (await Camera.isAvailableAsync()) {
          setHasCamPermission(true);
        }
      }
      const Gal = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalPermission(Gal.status === "granted");
    })();
  }, []);

  if (hasCamPermission === null || hasGalPermission === null) {
    return <View />;
  }
  if (hasCamPermission === false || hasGalPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.camera}
          type={type}
          ratio={"1:1"}
        />
      </View>
      <Button
        title="Flip"
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      />
      <Button
        title="capture"
        onPress={() => {
          takePicture();
        }}
      />
      <Button
        title="Pick Image"
        onPress={() => {
          pickImage();
        }}
      />
      <Button
        title="Save"
        onPress={() => {
          navigation.navigate('Save',{image});
        }}
      />
      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {},
  container: {
    flex: 1,
  },
  camera: { flex: 1, aspectRatio: 1 },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
});
