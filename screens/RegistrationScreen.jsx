import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useKeyboardListener } from "../helpers/hooks";

import { colors } from "../helpers/vars";

const bgImage = require("../assets/images/PhotoBG.jpg");

export const RegistrationScreen = ({ navigation }) => {
  const [isFocused, setIsFocused] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isIconActive, setIsIconActive] = useState(false);

  const isKeyboardShown = useKeyboardListener();

  const initialState = {
    name: "",
    email: "",
    password: "",
  };
  const [userState, setUserState] = useState(initialState);

  const onSubmit = () => {
    const { name, email, password } = userState;
    if (!name || !email || !password) {
      return alert("need to fill all fields");
    }
    console.log(userState);
    setUserState(initialState);
    navigation.navigate("Home");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground source={bgImage} style={styles.bgImage}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={{ ...styles.form, marginBottom: isKeyboardShown ? -200 : 0 }}
          >
            <Text style={styles.formTitle}>Registration</Text>
            <TextInput
              style={[
                styles.input,
                isFocused === "name" && styles.inputFocused,
              ]}
              placeholder="Input name"
              placeholderTextColor={colors.placeholderTextColor}
              onChangeText={(value) =>
                setUserState((state) => ({ ...state, name: value.trim() }))
              }
              onFocus={() => {
                setIsFocused("name");
              }}
              onBlur={() => setIsFocused(false)}
              value={userState.name}
            ></TextInput>
            <TextInput
              style={[
                styles.input,
                isFocused === "email" && styles.inputFocused,
              ]}
              placeholder="Input email"
              placeholderTextColor={colors.placeholderTextColor}
              onChangeText={(value) =>
                setUserState((state) => ({ ...state, email: value.trim() }))
              }
              onFocus={() => {
                setIsFocused("email");
              }}
              onBlur={() => setIsFocused(false)}
              value={userState.email}
            ></TextInput>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[
                  styles.input,
                  isFocused === "password" && styles.inputFocused,
                ]}
                placeholder="Input password"
                placeholderTextColor={colors.placeholderTextColor}
                onChangeText={(value) =>
                  setUserState((state) => ({
                    ...state,
                    password: value.trim(),
                  }))
                }
                onFocus={() => {
                  setIsFocused("password");
                }}
                onBlur={() => setIsFocused(false)}
                value={userState.password}
              ></TextInput>

              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.passwordToggleButton}
                activeOpacity={0.8}
              >
                <Text style={styles.passwordToggleButtonText}>
                  {showPassword ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.btnSign}
              title="Register"
              onPress={onSubmit}
              activeOpacity={0.8}
            >
              <Text style={styles.btnText}>Register</Text>
            </TouchableOpacity>

            <Text
              style={styles.linkLogin}
              onPress={() => navigation.navigate("Login")}
            >
              Already have an account? Login here
            </Text>

            <View style={styles.photoBox}>
              <Pressable
                onPress={() => setIsIconActive(!isIconActive)}
                style={styles.iconWrapper}
              >
                {isIconActive ? (
                  <Ionicons
                    name="ios-close-circle-outline"
                    size={27}
                    color={colors.placeholderTextColor}
                  ></Ionicons>
                ) : (
                  <Ionicons
                    name="add-circle-outline"
                    size={27}
                    color={colors.orange}
                  ></Ionicons>
                )}
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",

    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  form: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: colors.formBackgroundColor,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 92,
    paddingBottom: 78,
  },
  formTitle: {
    fontSize: 30,
    marginBottom: 32,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
  },
  input: {
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.inputBorderColor,
    backgroundColor: colors.backgroundColor,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: colors.inputTextColor,
  },
  inputFocused: {
    borderColor: colors.orange,
  },
  passwordToggleButton: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: [{ translateY: -17 }],
  },
  passwordToggleButtonText: {
    fontSize: 16,
    color: colors.blue,
    fontFamily: "Roboto-Regular",
  },
  btnSign: {
    height: 51,
    backgroundColor: colors.orange,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 43,
  },
  btnText: {
    fontSize: 16,
    color: colors.btnTextColor,
    fontFamily: "Roboto-Regular",
  },
  linkLogin: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
    color: colors.blue,
  },
  photoBox: {
    backgroundColor: colors.backgroundColor,
    width: 120,
    height: 120,
    borderRadius: 16,
    position: "absolute",
    alignSelf: "center",
    top: -60,
  },
  iconWrapper: {
    position: "absolute",
    right: -12.5,
    bottom: 20,
    maxWidth: 25,
  },
});
