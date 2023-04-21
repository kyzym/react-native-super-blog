import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
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

const initialState = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = ({ navigation }) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const windowDimensions = useWindowDimensions();

  const showPasswordHandler = useCallback(() => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }, []);

  const keyboardHide = useCallback(async () => {
    setShowKeyboard(false);
    Keyboard.dismiss();

    if (state.login === "" || state.email === "" || state.password === "") {
      return alert("All fields need to be filled!");
    }

    try {
      await dispatch(authSignUpUser(state));

      console.log(state);
      setState(initialState);

      navigation.navigate("Home");
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  }, [state, navigation]);

  const keyboardHideOut = useCallback(() => {
    setShowKeyboard(false);
    Keyboard.dismiss();
  }, []);

  const handleInputChange = useCallback((field, value) => {
    setState((prevState) => ({ ...prevState, [field]: value }));
  }, []);

  return (
    <TouchableWithoutFeedback onPress={keyboardHideOut}>
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
                    style={styles.imgUser}
                    source={require("../../assets/images/UserIcon.jpg")}
                  />
                ) : null}
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
                value={state.login}
                onChangeText={(value) => handleInputChange("login", value)}
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
                value={state.email}
                onChangeText={(value) => handleInputChange("email", value)}
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
                  value={state.password}
                  onChangeText={(value) => handleInputChange("password", value)}
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
                onPress={keyboardHide}
                style={styles.button}
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
