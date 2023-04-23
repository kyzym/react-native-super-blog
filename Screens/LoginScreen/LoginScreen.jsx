import React, { useEffect, useState, useCallback } from "react";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
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
  const windowDimensions = useWindowDimensions();

  const dispatch = useDispatch();

  const showPasswordHandler = () => {
    const toggle = showPassword ? false : true;
    setShowPassword(toggle);
  };

  const keyboardHide = async () => {
    setShowKeyboard(false);
    Keyboard.dismiss();
    if (!state.email.trim() || !state.password.trim()) {
      return alert("All fields need to be filled!");
    }

    try {
      await dispatch(authSignInUser(state));

      setState(initialState);

      navigation.navigate("Home");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
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
            width: windowDimensions.width,
            height: windowDimensions.height,
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                width: windowDimensions.width,
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
