import React, { useEffect, useState, useCallback } from "react";
import {
  Dimensions,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styles from "./LoginScreenStyles";
import { getBorderColor } from "../../assets/helpers/utils";

import { useDispatch } from "react-redux";
import { authSignInUser } from "../../redux/auth/authOperation";

const initialState = {
  email: "",
  password: "",
};

const LoginScreen = ({ navigation }) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);

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

  const dispatch = useDispatch();

  const showPasswordHandler = () => {
    const toggle = showPassword ? false : true;
    setShowPassword(toggle);
  };

  const keyboardHide = () => {
    setShowKeyboard(false);
    Keyboard.dismiss();
    if (!state.email.trim() || !state.password.trim()) {
      return alert("All field need to bo filled!");
    }
    dispatch(authSignInUser(state));
    console.log(state);
    setState(initialState);
    navigation.navigate("Home");
  };

  const keyboardHideOut = () => {
    setShowKeyboard(false);
    Keyboard.dismiss();
  };

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
            width: windowWidth,
            height: windowHeight,
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                width: windowWidth,
                marginBottom: showKeyboard ? -250 : 0,
              }}
            >
              <Text style={styles.titleText}>Login</Text>

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
                <Text style={styles.textButton}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={styles.accountText}>
                  Don't have account yet? Register
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
