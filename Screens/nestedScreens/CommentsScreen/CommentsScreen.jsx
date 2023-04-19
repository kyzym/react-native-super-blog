import React, { useEffect, useState } from "react";

import { FontAwesome5 } from "@expo/vector-icons";

import * as SplashScreen from "expo-splash-screen";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import POST_DATA from "../../../assets/vars/postData";
import styles from "./CommentsScreenStyles";

const CommentsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState(POST_DATA);

  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get("window").height
  );
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
  const [comment, setComment] = useState("");

  const commentHandler = (comment) => setComment(comment);

  const onSend = () => {
    if (!comment.trim()) {
      Alert.alert(`Enter your comment, please`);
      return;
    }
    Alert.alert(`Your comment has been sent!`);
    console.log(comment);
    setComment("");
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <Image
            style={{
              ...styles.cardImage,
              width: windowWidth - 16 * 2,
            }}
            source={require("../../../assets/images/Sea.jpg")}
          />
        }
        contentContainerStyle={{ width: windowWidth - 16 * 2 }}
        data={posts.comments}
        renderItem={({ item }) => <Text>Текст</Text>}
        ListFooterComponent={
          <View style={{ width: "100%", marginBottom: 32 }}>
            <TextInput
              value={comment}
              style={styles.input}
              placeholder="Leave comment..."
              cursorColor={"#BDBDBD"}
              placeholderTextColor={"#BDBDBD"}
              onChangeText={commentHandler}
            />
            <TouchableOpacity style={styles.sendButton} onPress={onSend}>
              <FontAwesome5
                name="arrow-circle-up"
                size={34}
                color={"#FF6C00"}
              />
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

export default CommentsScreen;
