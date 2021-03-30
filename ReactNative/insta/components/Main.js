import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/actions";
// import user from "../redux/reducers/user";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import Feed from "./main/Feed";
import Add from "./main/Add";
import Profile from "./main/Profile";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const Empty = () => {
  return null;
};

export default function Main() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { currentUser } = state.user;

  useEffect(() => {
    dispatch(() => fetchUser(dispatch));
  }, [dispatch]);
  console.log(currentUser, state);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("Add");
          },
        })}
        name="MainAdd"
        component={Empty}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="plus" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="account-circle" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
