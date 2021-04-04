import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "firebase";

import Landing from "./components/auth/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Main from "./components/Main";
import { Text, View } from "react-native";

import { Provider } from "react-redux";
import store from "./redux/store";
import Add from "./components/main/Add";
import Save from "./components/main/Save";
import Comments from "./components/main/Comments";

// use environmental variable later
const firebaseConfig = {
  apiKey: "AIzaSyAlGveKciizCZ8c1qKpGTq2xFISKSGhORk",
  authDomain: "instaclone-dd2f3.firebaseapp.com",
  projectId: "instaclone-dd2f3",
  storageBucket: "instaclone-dd2f3.appspot.com",
  messagingSenderId: "121026205239",
  appId: "1:121026205239:web:03c77f45a692fa5bb151b2",
  measurementId: "G-YM1TG94F0H",
};

firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

export default function App(props) {
  const [{ loaded, loggedIn }, setState] = useState({
    loaded: false,
    loggedIn: false,
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setState({
          loaded: true,
          loggedIn: false,
        });
      } else {
        setState({
          loaded: true,
          loggedIn: true,
        });
      }
    });
  }, []);

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (!loggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={Main}
            navigation={props.navigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Add"
            component={Add}
            navigation={props.navigation}
          />
          <Stack.Screen
            name="Save"
            component={Save}
            navigation={props.navigation}
          />
          <Stack.Screen
            name="Comments"
            component={Comments}
            navigation={props.navigation}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
