import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import useRouter from "../router";
import { authStateChangeUser } from "../redux/auth/authOperation";

const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRouter(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
export default Main;
