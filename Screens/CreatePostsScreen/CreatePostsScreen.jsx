import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { useIsFocused } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import db from "../../firebase/config";
import uuid from "react-native-uuid";

import { Feather, FontAwesome } from "@expo/vector-icons";
import styles from "./CreatePostsScreenStyles";

const CreatePostsScreen = ({ navigation }) => {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState(null);
  const [location, setLocation] = useState(null);
  const [nameLocation, setNameLocation] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const { userId, login } = useSelector((state) => state.auth);
  const uniquePostId = uuid.v4();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const keyboardHideOut = () => {
    setShowKeyboard(false);
    Keyboard.dismiss();
  };

  const takePicture = async () => {
    if (camera) {
      try {
        const { uri } = await camera.takePictureAsync({ quality: 0.1 });

        let location = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setLocation(coords);

        setPhoto(uri);
      } catch (e) {
        if (
          e.message.includes(
            "Call to function 'ExponentCamera.takePicture' has been rejected"
          )
        ) {
          await MediaLibrary.requestPermissionsAsync();
          await Camera.requestCameraPermissionsAsync();
          const { uri } = await camera.takePictureAsync();
          setPhoto(uri);
        } else {
          throw e;
        }
      }
    }
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);

    const file = await response.blob();

    await db.storage().ref(`postImage/${uniquePostId}`).put(file);

    const processedPhoto = await db
      .storage()
      .ref("postImage")
      .child(uniquePostId)
      .getDownloadURL();
    setPhoto(processedPhoto);

    return processedPhoto;
  };

  const uploadPostToServer = async () => {
    try {
      const photo = await uploadPhotoToServer();

      await db.firestore().collection("posts").add({
        id: uniquePostId,
        photo,
        location,
        title,
        nameLocation,
        userId,
        login,
        createdAt: new Date().getTime(),
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const addPostBtn = () => {
    setShowKeyboard(false);
    Keyboard.dismiss();
    if (!photo) return;

    const post = {
      photo,
      location,
      title,
      nameLocation,
      commentsQuantity: 0,
      likesQuantity: 0,
      likeStatus: false,
    };

    uploadPostToServer();
    navigation.navigate("DefaultScreen", { post });

    setPhoto(null);
    setTitle(null);
    setLocation(null);
    setNameLocation(null);
  };

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const isFocused = useIsFocused();

  return (
    <TouchableWithoutFeedback onPress={keyboardHideOut}>
      <View style={styles.container}>
        {isFocused && (
          <Camera
            style={styles.camera}
            type={type}
            ref={(ref) => {
              setCamera(ref);
            }}
          >
            {photo && (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 100,
                  height: 100,
                }}
              >
                <Image
                  source={{ uri: photo }}
                  style={{
                    width: 100,
                    height: 100,
                  }}
                />
              </View>
            )}

            <TouchableOpacity onPress={takePicture} style={styles.photoIcon}>
              <FontAwesome name="camera" size={24} color={"#BDBDBD"} />
            </TouchableOpacity>
          </Camera>
        )}

        {photo ? (
          <TouchableOpacity>
            <Text style={styles.addPhoto}>Edit photo</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Text style={styles.addPhoto}>Upload photo</Text>
          </TouchableOpacity>
        )}

        <View style={styles.form}>
          <TextInput
            style={{ ...styles.input, paddingLeft: 0 }}
            placeholder="Title..."
            placeholderTextColor={"#BDBDBD"}
            inputMode="text"
            value={title}
            onChangeText={(value) => setTitle(value)}
          />
          <View style={styles.inputBox}>
            <TouchableOpacity style={styles.inputIcon}>
              <Feather name="map-pin" size={24} color={"#BDBDBD"} />
            </TouchableOpacity>

            <TextInput
              style={{ ...styles.input, paddingLeft: 32 }}
              placeholder="Location..."
              placeholderTextColor={"#BDBDBD"}
              inputMode="text"
              value={nameLocation}
              onChangeText={(value) => setNameLocation(value)}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={addPostBtn}
            disabled={!photo}
            style={{
              ...styles.button,
              backgroundColor: photo ? "#FF6C00" : "#F6F6F6",
            }}
          >
            <Text
              style={{
                ...styles.textButton,
                color: photo ? "#FFFFFF" : "#BDBDBD",
              }}
            >
              Share
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setPhoto(null);
              setTitle(null);
              setNameLocation(null);
              navigation.navigate("PostsScreen");
            }}
            style={styles.buttonGo}
          >
            <Feather name="trash-2" size={24} color={"#BDBDBD"} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;
