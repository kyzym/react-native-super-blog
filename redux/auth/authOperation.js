import db from "../../firebase/config";

import { authSlice } from "./authReducer";

const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await db
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log("user_reg", user);
      return user;
    } catch (error) {
      console.log("error_authSignUpUser", error.message);
      console.log(error.message);
      throw error;
    }
  };

const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await db.auth().signInWithEmailAndPassword(email, password);
      console.log("user_login", user);
      return user;
    } catch (error) {
      console.log("error_authSignInUser", error.message);
      console.log(error.message);
      throw error;
    }
  };

const authSignOutUser = () => async (dispatch, getState) => {};

export { authSignInUser, authSignUpUser, authSignOutUser };
