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

import { useSelector } from "react-redux";
import db from "../../../firebase/config";
import { useWindowDimensions } from "react-native";

const CommentsScreen = ({ navigation, route }) => {
  const { postId, photo } = route.params;
  const [posts, setPosts] = useState(POST_DATA);
  const windowDimensions = useWindowDimensions();

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { login } = useSelector((state) => state.auth);
  const commentHandler = (comment) => setComment(comment);

  const onSend = async () => {
    if (!comment.trim()) {
      Alert.alert(`Enter your comment, please`);
      return;
    }
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({ comment, login, date, time });

    Alert.alert(`Your comment has been sent!`);

    setComment("");
    Keyboard.dismiss();
  };

  const getCommentsFromFirestore = async () => {
    try {
      await db
        .firestore()
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .onSnapshot((data) =>
          setAllComments(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          )
        );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCommentsFromFirestore();
  }, []);
  console.log(allComments);

  return (
    <View style={{ ...styles.container }}>
      <FlatList
        removeClippedSubviews={false}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Image
              style={{
                ...styles.cardImage,
                width: windowDimensions.width - 16 * 2,
              }}
              source={{ uri: photo }}
            />
          </View>
        }
        contentContainerStyle={{ width: windowDimensions.width - 16 * 2 }}
        data={allComments}
        renderItem={({ item }) => (
          <View
            style={{
              ...styles.commentWrapper,
              width: windowDimensions.width - 16 * 2,
            }}
          >
            {/* <Image source={{ uri: item.commentAvatar }} style={styles.commentAvatarImage} /> */}
            <View
              style={{
                ...styles.commentTextContainer,
                width: windowDimensions.width - 28 - 16 * 3,
              }}
            >
              <Text style={styles.commentText}>{item.comment}</Text>
              <Text style={styles.commentDate}>
                {item.date} | {item.time}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        // ListFooterComponent={
        //   <View style={{ width: "100%", marginBottom: 32 }}>
        //     <TextInput
        //       value={comment}
        //       style={styles.input}
        //       placeholder="Leave comment..."
        //       cursorColor={"#BDBDBD"}
        //       placeholderTextColor={"#BDBDBD"}
        //       onChangeText={commentHandler}
        //     />
        //     <TouchableOpacity style={styles.sendButton} onPress={onSend}>
        //       <FontAwesome5
        //         name="arrow-circle-up"
        //         size={34}
        //         color={"#FF6C00"}
        //       />
        //     </TouchableOpacity>
        //   </View>
        // }
      />
      <View style={{ width: "100%", marginBottom: 12 }}>
        <TextInput
          value={comment}
          style={styles.input}
          placeholder="Leave comment..."
          cursorColor={"#BDBDBD"}
          placeholderTextColor={"#BDBDBD"}
          onChangeText={commentHandler}
        />
        <TouchableOpacity style={styles.sendButton} onPress={onSend}>
          <FontAwesome5 name="arrow-circle-up" size={34} color={"#FF6C00"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentsScreen;
