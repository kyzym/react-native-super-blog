import React from "react";
import Posts from "../PostsScreen/PostsScreen";

import TubButtonsMenu from "../../TubButtonsMenu";

const Home = ({ navigation }) => {
  return (
    <TubButtonsMenu>
      <Posts />
    </TubButtonsMenu>
  );
};

export default Home;
