import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CreatePostsScreen from "./Screens/CreatePostsScreen/CreatePostsScreen";
import Home from "./Screens/Home/Home";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import PostsScreen from "./Screens/PostsScreen/PostsScreen";
import RegistrationScreen from "./Screens/RegistrationScreen/RegistrationScreen";

const MainStack = createStackNavigator();
const ScreenStack = createStackNavigator();

const useRouter = (isAuth) => {
  return !isAuth ? (
    <MainStack.Navigator initialRouteName="Login">
      <MainStack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
      <MainStack.Screen
        options={{ headerShown: false }}
        name="Register"
        component={RegistrationScreen}
      />
    </MainStack.Navigator>
  ) : (
    <ScreenStack.Navigator initialRouteName="Home">
      <ScreenStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      <ScreenStack.Screen
        options={{ headerShown: true }}
        name="Posts"
        component={PostsScreen}
      />
      <ScreenStack.Screen
        options={{ headerShown: true }}
        name="CreatePostsScreen"
        component={CreatePostsScreen}
      />
    </ScreenStack.Navigator>
  );
};

export default useRouter;
