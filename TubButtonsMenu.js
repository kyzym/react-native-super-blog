import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, View } from "react-native";
import { AntDesign, Entypo, Feather, Fontisto } from "@expo/vector-icons";

import CreatePostsScreen from "./Screens/CreatePostsScreen/CreatePostsScreen";
import PostsScreen from "./Screens/PostsScreen/PostsScreen";
import ProfileScreen from "./Screens/ProfileScreen/ProfileScreen";

const Tab = createBottomTabNavigator();

const TubButtonsMenu = ({ navigation }) => {
  const iconSize = 24;
  const iconColor = "rgba(33, 33, 33, 0.8)";

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 71,
          justifyContent: "center",
          paddingLeft: 80,
          paddingRight: 80,
        },
        headerTitleAlign: "center",
        headerStyle: { height: 88 },
        headerShadowVisible: {
          elevation: 1,
          backgroundColor: "#FFFFFF",
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 0.5 },
          shadowOpacity: 0.3,
          shadowRadius: 27.18,
        },
        headerTitleStyle: {
          fontFamily: "Roboto-Medium",
          marginBottom: 11,
          fontSize: 17,
          lineHeight: 22,
          color: "#212121",
        },
        headerRightContainerStyle: { paddingRight: 16, paddingBottom: 9 },
        headerLeftContainerStyle: { paddingLeft: 16, paddingBottom: 9 },
      }}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          title: "Posts",
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarIcon: () => (
            <AntDesign name="appstore-o" size={iconSize} color={iconColor} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Entypo name="log-out" size={iconSize} color={"#BDBDBD"} />
            </TouchableOpacity>
          ),
        }}
        name="PostsScreen"
        component={PostsScreen}
      />
      <Tab.Screen
        options={{
          title: "Create post",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="arrow-left" size={iconSize} color={"#BDBDBD"} />
            </TouchableOpacity>
          ),
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: { display: "none" },
          tabBarIcon: () => (
            <View
              style={{
                alignItems: "center",
                backgroundColor: "#FF6C00",
                width: 70,
                height: 40,
                padding: 13.5,
                borderRadius: 20,
              }}
            >
              <Fontisto name="plus-a" size={13} color="white" />
            </View>
          ),
        }}
        name="CreatePostsScreen"
        component={CreatePostsScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          title: "Profile",
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarIcon: () => (
            <Feather name="user" size={iconSize} color={iconColor} />
          ),
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default TubButtonsMenu;
