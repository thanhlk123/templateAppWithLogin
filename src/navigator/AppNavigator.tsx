import React, { useEffect, useLayoutEffect } from "react";
import { StatusBar, View } from "react-native";
import SplashScreens from "react-native-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { SafeAreaProvider } from "react-native-safe-area-context";
import DashBoard from "@screens/DashBoard/index";
import { navigationRef } from "../RootNavigation";
const RootStack = createStackNavigator();

const AppNavigator = () => {
  useLayoutEffect(() => {
    setTimeout(() => {
      SplashScreens.hide();
    }, 2000);
  }, []);

  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
      // headerMode="screen"
      initialRouteName="DashBoard"
    >
      <RootStack.Screen
        component={DashBoard}
        name="DashBoard"
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};

export default AppNavigator;
