import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "./PostCardStyles";

const PostCard = ({ post, windowWidth, navigation, avatarImage }) => {
  return (
    <View style={{ ...styles.cardContainer, width: windowWidth }}>
      <Image
        source={{ uri: post.photo }}
        style={{ ...styles.cardImage, width: windowWidth - 16 * 2 }}
      />
      <Text
        style={{
          ...styles.cardTitle,
          width: windowWidth - 16 * 2,
          fontFamily: "Roboto-Medium",
        }}
      >
        {post.title}
      </Text>
      <View style={{ ...styles.cardThumb, width: windowWidth - 16 * 2 }}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={styles.cardWrapper}
              onPress={() =>
                navigation.navigate("CommentsScreen", {
                  postId: post.id,
                  photo: post.photo,
                  commentsQuantity: post.commentsQuantity,
                  avatarImage,
                })
              }
            >
              <Feather name="message-circle" size={24} color={"#FF6C00"} />
              <Text style={styles.cardText}>{post.commentsQuantity}</Text>
            </TouchableOpacity>

            {/* <View style={{ ...styles.cardWrapper, marginLeft: 24 }}>
              <Feather name="thumbs-up" size={24} color={"#FF6C00"} />
              <Text style={styles.cardText}>{post.likes}</Text>
            </View> */}
            <TouchableOpacity
              style={styles.cardWrapper}
              onPress={
                post.likeStatus
                  ? () =>
                      removeLike(post.id, post.likesQuantity, post.likeStatus)
                  : () => addLike(post.id, post.likesQuantity, post.likeStatus)
              }
            >
              <View style={{ ...styles.cardWrapper, marginLeft: 24 }}>
                <Feather name="thumbs-up" size={24} color={"#FF6C00"} />
                <Text style={styles.cardText}>{post.likesQuantity}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ ...styles.cardWrapper, marginLeft: 145 }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("MapScreen", {
                  latitude: post.location.latitude,
                  longitude: post.location.longitude,
                })
              }
            >
              <Feather name="map-pin" size={24} color={"#BDBDBD"} />
            </TouchableOpacity>

            <Text style={styles.cardText}>{post.nameLocation}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostCard;
