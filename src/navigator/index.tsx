import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { getToken, getTheme, getLoggedOut } from "@utils/Helper";
import {
  refreshUserTokenAction,
  signOutAction,
} from "@appRedux/actionTypes/authAction";
import { setDarkModeAction } from "appRedux/actionTypes/appStateAction";
import MainStack from "./RootNavigator";

interface NavigationProps {
  isSignedIn: boolean;
  onSignOut: () => void;
  refreshToken: () => void;
  onSetDarkMode: (isDarkMode: boolean) => void;
  isAuth401: boolean;
}

const index = (Props: NavigationProps) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
      console.log("helloo");
    const bootstrapAsync = async () => {
      let token;
      let isDarkMode = false;

      const isLoggedOut = await getLoggedOut();
      token = await getToken();

      isDarkMode = (await getTheme()) === "dark";

      Props.onSetDarkMode(isDarkMode);

      if (!isLoggedOut && token) {
        console.log("bootstrapAsync -> token", token);
        // refresh token every the app opened
        Props.refreshToken();
      }

      setLoading(false);
    };

    bootstrapAsync();
  },[]);

  const _renderApplication = () => {
    return (
      <>
        <MainStack />
        {Props.isAuth401 ? _renderAlertAuth401(Props) : null}
      </>
    );
  };

  const _renderAlertAuth401 = (Props) => {
    return Alert.alert(
      "Session expired.",
      "Please login again!",
      [{ text: "OK", onPress: () => Props.onSignOut() }],
      { cancelable: false }
    );
  };

  return <NavigationContainer>{_renderApplication()}</NavigationContainer>;
};

const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    auth,
    isSignedIn: auth.isSignedIn,
    isAuth401: auth.is401,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    refreshToken: () => dispatch(refreshUserTokenAction()),
    onSetDarkMode: (isDarkMode: boolean) =>
      dispatch(setDarkModeAction(isDarkMode)),
    onSignOut: () => dispatch(signOutAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
