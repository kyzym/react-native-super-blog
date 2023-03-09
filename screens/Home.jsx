import { StyleSheet, Text, View } from "react-native";
import { PostsScreen } from "./PostsScreen";
export const Home = () => {
  return (
    <View style={styles.container}>
      <PostsScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
