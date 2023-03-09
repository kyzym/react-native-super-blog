import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

import { PostsScreen } from "../screens/PostsScreen";
import { CreatePostsScreen } from "../screens/CreatePostsScreen";
import { ProfileScreen } from "../screens/ProfileScreen";

import { Feather } from "@expo/vector-icons";

import { colors } from "../helpers/vars";
import { View } from "react-native";

export const TabMenu = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 83,
          paddingHorizontal: 56,
        },
        headerStyle: { height: 71 },
        headerTitleAlign: "center",
        headerRightContainerStyle: { paddingRight: 16, paddingBottom: 9 },
        headerLeftContainerStyle: { paddingLeft: 16, paddingBottom: 9 },
      }}
    >
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <Feather name="grid" size={24} color={colors.navIconsColor} />
          ),
          headerRight: () => (
            <Feather
              name="log-out"
              size={24}
              color={colors.placeholderTextColor}
            />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <View
              style={{
                backgroundColor: colors.orange,
                borderRadius: 20,
                width: 70,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
              activeOpacity={0.8}
            >
              <Feather name="plus" size={20} color={colors.btnTextColor} />
            </View>
          ),
        }}
        name="CreatePosts"
        component={CreatePostsScreen}
      />
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: (focused, color, size) => (
            <Feather name="user" size={24} color={colors.navIconsColor} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};
