import { StyleSheet, Text, View } from "react-native";
import { PostsScreen } from "./PostsScreen";
import { TabMenu } from "../components/TabMenu";
export const Home = () => {
  return (
    <TabMenu>
      <PostsScreen />
    </TabMenu>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
