import React, { useEffect, useState, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Feather } from "@expo/vector-icons";
import {
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./ProfileScreenStyles";
import { useDispatch, useSelector } from "react-redux";
import db from "../../firebase/config";
import {
  collection,
  query,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/compat/firestore";
import { authSignOutUser } from "../../redux/auth/authOperation";
import { useWindowDimensions } from "react-native";
import PostCard from "../../Components/PostCard/PostCard";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userId, login, avatarImage } = useSelector((state) => state.auth);
  const [userImg, setUserImg] = useState(1);
  const [posts, setPosts] = useState([]);
  const windowDimensions = useWindowDimensions();

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const signOut = () => {
    // navigation.navigate('Register');
    dispatch(authSignOutUser());
  };

  const getDataFromFirestore = async () => {
    try {
      await db
        .firestore()
        .collection("posts")
        .where("userId", "==", userId)
        .onSnapshot((data) =>
          setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDataFromFirestore();
  }, []);

  const addLike = async (postId, likesQuantity) => {
    try {
      const ref = await db.firestore().collection("posts").doc(postId);
      ref.update({
        likesQuantity: likesQuantity + 1,
        likeStatus: true,
      });
    } catch (error) {
      console.log("error-message.add-like", error.message);
    }
  };

  const removeLike = async (postId, likesQuantity) => {
    try {
      const ref = await db.firestore().collection("posts").doc(postId);
      ref.update({
        likesQuantity: likesQuantity - 1,
        likeStatus: false,
      });
    } catch (error) {
      console.log("error-message.add-like", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/PhotoBG.jpg")}
        resizeMode="cover"
        style={{
          ...styles.imageBG,
          width: windowDimensions.width,
          height: windowDimensions.height,
        }}
      >
        <FlatList
          ListHeaderComponent={
            <View
              style={{
                ...styles.profile,
                marginTop: windowDimensions.width > 500 ? 100 : 147,
                width: windowDimensions.width,
              }}
            >
              <View
                style={{
                  ...styles.imgUserContainer,
                  left: (windowDimensions.width - 120) / 2,
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
                    source={{ uri: avatarImage }}
                  />
                ) : null}
              </View>
              <View style={{ position: "absolute", right: 16, top: 22 }}>
                <Feather
                  name="log-out"
                  size={24}
                  color={"#BDBDBD"}
                  onPress={signOut}
                />
              </View>
              <View
                style={{
                  ...styles.userTitleWrapper,
                  width: windowDimensions.width - 16 * 2,
                }}
              >
                <Text
                  style={{ ...styles.userTitle, fontFamily: "Roboto-Medium" }}
                >
                  {login}
                </Text>
              </View>
            </View>
          }
          data={posts}
          renderItem={({ item }) => (
            <>
              <PostCard
                post={item}
                windowWidth={windowDimensions.width}
                navigation={navigation}
                avatarImage={avatarImage}
              />
            </>
          )}
          showsVerticalScrollIndicator={false}
        />
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;
