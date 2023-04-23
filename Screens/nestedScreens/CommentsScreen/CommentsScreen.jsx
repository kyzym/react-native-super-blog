import React, { useEffect, useState } from "react";

import { FontAwesome5 } from "@expo/vector-icons";

import * as SplashScreen from "expo-splash-screen";
import {
  Alert,
  FlatList,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import styles from "./CommentsScreenStyles";

import { useDispatch, useSelector } from "react-redux";
import db from "../../../firebase/config";
import { useWindowDimensions } from "react-native";
import { updateCommentsQuantityAction } from "../../../redux/comments/commentsSlice";

const CommentsScreen = ({ navigation, route }) => {
  const windowDimensions = useWindowDimensions();
  const { postId, photo } = route.params;
  const { login, avatarImage } = useSelector((state) => state.auth);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  // console.log(allComments.length);
  const commentHandler = (comment) => setComment(comment);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(updateCommentsQuantityAction(postId, allComments.length));
    };
  }, [allComments.length, postId, dispatch]);

  const onSend = async () => {
    if (!comment.trim()) {
      Alert.alert(`Enter your comment, please`);
      return;
    }
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    db.firestore().collection("posts").doc(postId).collection("comments").add({
      comment,
      login,
      date,
      time,
      avatarImage,
    });

    const updatedCommentsQuantity = allComments.length + 1;
    await db.firestore().collection("posts").doc(postId).update({
      commentsQuantity: updatedCommentsQuantity,
    });

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
  // console.log("allComments.length", allComments.length);

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
            {/* {console.log("item__", item)} */}
            <Image
              source={{ uri: item.avatarImage }}
              style={{
                width: 28,
                height: 28,
                backgroundColor: "#F6F6F6",
                marginRight: 16,
                borderRadius: 16,
                resizeMode: "cover",
              }}
            />
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
      />
      <View style={{ width: "100%", marginBottom: 12, alignItems: "flex-end" }}>
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
