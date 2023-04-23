import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styles from "./RegistrationScreenStyle.js";
import { getBorderColor } from "../../assets/helpers/utils.js";

import { useDispatch } from "react-redux";
import { authSignUpUser } from "../../redux/auth/authOperation";
import { useWindowDimensions } from "react-native";

import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const RegistrationScreen = ({ navigation }) => {
  const windowDimensions = useWindowDimensions();
  const dispatch = useDispatch();

  const [focusedInput, setFocusedInput] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const [showKeyboard, setShowKeyboard] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [pickedImagePath, setPickedImagePath] = useState("");

  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const showPasswordHandler = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const hideKeyboard = useCallback(() => {
    setShowKeyboard(false);
    Keyboard.dismiss();
  }, []);

  const registerUser = async () => {
    if (
      login === "" ||
      email === "" ||
      password === "" ||
      pickedImagePath === ""
    ) {
      return alert("All fields need to be filled, even avatar!");
    }

    setIsLoading(true);
    try {
      const imageRef = await uploadPhotoToServer();

      const newUser = {
        login,
        email,
        password,
        avatarImage: imageRef,
      };
      const res = await dispatch(authSignUpUser(newUser));
      console.log(`${res},"res"\n ${imageRef},imageRef `);
      setLogin("");
      setEmail("");
      setPassword("");
      setPickedImagePath("");

      // navigation.navigate("Home");
    } catch (error) {
      alert("Registration failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadAvatar = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      // if (permissionResult.granted === false) {
      //   alert("You've refused to allow this app to access your photos!");
      //   return;
      // }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.1,
      });

      if (!result.canceled) {
        setPickedImagePath(result.assets[0].uri);
      }
    } catch (error) {
      console.log("error-message", error.message);
    }
  };

  const deleteAvatar = () => setPickedImagePath("");

  const uploadPhotoToServer = async () => {
    try {
      const response = await fetch(pickedImagePath);
      const file = await response.blob();
      const storage = getStorage();
      const uniquePostId = Date.now().toString();
      const storageRef = ref(storage, `avatarImage/${uniquePostId}`);
      await uploadBytes(storageRef, file);
      const photoRef = await getDownloadURL(storageRef);
      return photoRef;
    } catch (error) {
      console.log("error-message.upload-photo", error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
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
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{ ...styles.form, marginBottom: showKeyboard ? -192 : 0 }}
            >
              <View style={styles.imgUserContainer}>
                {pickedImagePath ? (
                  <>
                    <View>
                      <Image
                        style={styles.avatarImage}
                        source={{ uri: pickedImagePath }}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={deleteAvatar}
                      style={{
                        ...styles.imgDel,
                      }}
                    >
                      <Image
                        width={25}
                        height={25}
                        source={require("../../assets/images/del.png")}
                      />
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    {/* <View></View> */}
                    <TouchableOpacity
                      onPress={downloadAvatar}
                      style={{
                        ...styles.imgAdd,
                      }}
                    >
                      <Image
                        width={25}
                        height={25}
                        source={require("../../assets/images/add.png")}
                      />
                    </TouchableOpacity>
                  </>
                )}
              </View>

              <Text style={styles.titleText}>Registration</Text>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: getBorderColor("login", focusedInput),
                }}
                placeholder="Login"
                placeholderTextColor={"#BDBDBD"}
                inputMode="text"
                value={login}
                onChangeText={(login) => setLogin(login)}
                onFocus={() => {
                  setFocusedInput("login");
                  setShowKeyboard(true);
                }}
                onBlur={() => setFocusedInput(null)}
              />
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: getBorderColor("email", focusedInput),
                }}
                placeholder="Email address"
                placeholderTextColor={"#BDBDBD"}
                inputMode="email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                onFocus={() => {
                  setFocusedInput("email");
                  setShowKeyboard(true);
                }}
                onBlur={() => setFocusedInput(null)}
              />
              <View style={styles.inputPasswordContainer}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: getBorderColor("password", focusedInput),
                  }}
                  placeholder="Password"
                  placeholderTextColor={"#BDBDBD"}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={(password) => setPassword(password)}
                  onFocus={() => {
                    setFocusedInput("password");
                    setShowKeyboard(true);
                  }}
                  onBlur={() => {
                    setFocusedInput(null);
                  }}
                />
                <TouchableOpacity
                  style={styles.passwordShow}
                  activeOpacity={0.8}
                  onPress={showPasswordHandler}
                >
                  <Text style={styles.passwordShowText}>
                    {!showPassword ? "Show" : "Hide"}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={registerUser}
                style={styles.button}
                disabled={isLoading}
              >
                <Text style={styles.textButton}>Register</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.accountText}>
                  Already have an account? Log in
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;
