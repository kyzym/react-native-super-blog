import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
  },
  container: {
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 32,
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  camera: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginBottom: 8,
    height: 240,
    justifyContent: "center",
    alignItems: "center",
  },
  photoIcon: {
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  addPhoto: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  form: {
    marginTop: 40,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    marginBottom: 32,
    padding: 15,
  },
  inputBox: {
    position: "relative",
  },
  inputIcon: {
    position: "absolute",
    top: 18,
  },
  button: {
    borderRadius: 100,
    width: "100%",
    padding: 16,
    maxWidth: 343,
    marginBottom: 100,
    marginLeft: "auto",
    marginRight: "auto",
  },
  textButton: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  buttonGo: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
export default styles;
