import db from "../../firebase/config";

import { authSlice } from "./authReducer";

const authSignUpUser =
  ({ login, email, password, avatarImage }) =>
  async (dispatch, getState) => {
    try {
      await db.auth().createUserWithEmailAndPassword(email, password);

      const user = await db.auth().currentUser;

      await user.updateProfile({
        displayName: login,
        photoURL: avatarImage,
      });

      const { displayName, uid, photoURL } = await db.auth().currentUser;

      const userUpdateProfile = {
        login: displayName,
        userId: uid,
        email,
        avatarImage: photoURL,
      };

      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log("error_authSignUpUser", error.message);
      throw error;
    }
  };

const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await db.auth().signInWithEmailAndPassword(email, password);

      // console.log("User data after login:", user);

      return user;
    } catch (error) {
      console.log("error_authSignInUser", error.message);

      throw error;
    }
  };

const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await db.auth().signOut();

    dispatch(authSlice.actions.authSignOut());
  } catch (error) {
    console.log("error_authSignOutUser", error.message);
  }
};

const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    await db.auth().onAuthStateChanged((user) => {
      if (user) {
        const userUpdateProfile = {
          login: user.displayName,
          userId: user.uid,
          email: user.email,
          avatarImage: user.photoURL,
        };

        dispatch(authSlice.actions.authStateChange({ stateChange: true }));
        dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
      }
    });
  } catch (error) {
    console.log("error_authStateChangeUser", error.message);
  }
};

export { authSignInUser, authSignUpUser, authSignOutUser, authStateChangeUser };
