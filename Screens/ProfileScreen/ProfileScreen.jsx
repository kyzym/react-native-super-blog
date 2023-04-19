import React, { useEffect, useState, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Feather } from "@expo/vector-icons";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import POSTS from "../../assets/vars/posts";
import styles from "./ProfileScreenStyles";
import PostCard from "../../Components/PostCard/PostCard";

const ProfileScreen = ({ navigation }) => {
  const [userImg, setUserImg] = useState(1);
  const [posts, setPosts] = useState(POSTS);

  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get("window").height
  );

  // const onPressAddImage = useCallback(() => {
  //   setUserImg(1);
  // }, []);

  // const onPressRemoveImage = useCallback(() => {
  //   setUserImg(null);
  // }, []);

  // const onPressLogout = useCallback(() => {
  //   navigation.navigate("LoginScreen");
  // }, [navigation]);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setWindowWidth(width);
      const height = Dimensions.get("window").height;
      setWindowHeight(height);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);

    return () => dimensionsHandler.remove();
  }, []);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/PhotoBG.jpg")}
        resizeMode="cover"
        style={{ ...styles.imageBG, width: windowWidth, height: windowHeight }}
      >
        <FlatList
          ListHeaderComponent={
            <View
              style={{
                ...styles.profile,
                marginTop: windowWidth > 500 ? 100 : 147,
                width: windowWidth,
              }}
            >
              <View
                style={{
                  ...styles.imgUserContainer,
                  left: (windowWidth - 120) / 2,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setUserImg(1);
                  }}
                  activeOpacity={0.8}
                  style={{
                    ...styles.imgAdd,
                    display: userImg === 1 ? "none" : "flex",
                  }}
                >
                  <Image
                    width={25}
                    height={25}
                    source={require("../../assets/images/add.png")}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setUserImg(null);
                  }}
                  activeOpacity={0.8}
                  style={{
                    ...styles.imgDel,
                    display: userImg === null ? "none" : "flex",
                  }}
                >
                  <Image
                    width={25}
                    height={25}
                    source={require("../../assets/images/del.png")}
                  />
                </TouchableOpacity>
                {userImg === 1 ? (
                  <Image
                    style={styles.avatarImage}
                    source={require("../../assets/images/UserIcon.jpg")}
                  />
                ) : null}
              </View>
              <View style={{ position: "absolute", right: 16, top: 22 }}>
                <Feather name="log-out" size={24} color={"#BDBDBD"} />
              </View>
              <View
                style={{
                  ...styles.userTitleWrapper,
                  width: windowWidth - 16 * 2,
                }}
              >
                <Text
                  style={{ ...styles.userTitle, fontFamily: "Roboto-Medium" }}
                >
                  Natali Romanova
                </Text>
              </View>
            </View>
          }
          data={posts}
          renderItem={({ item }) => (
            <PostCard
              post={item}
              windowWidth={windowWidth}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;
