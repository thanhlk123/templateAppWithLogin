import React, { useEffect } from "react";
import { StatusBar, View } from "react-native";
import SplashScreens from "react-native-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "@screens/SplashScreen/index";
import Walkthrough from "@screens/Walkthrough/index";
import Login from "@screens/LoginScreen/index";
import { navigationRef } from "../RootNavigation";

const RootStack = createStackNavigator();

const AuthNavigator = () => {
  useEffect(() => {
    SplashScreens.hide();
  }, []);

  return (
        <RootStack.Navigator
          screenOptions={{ headerShown: false }}
          // headerMode="screen"
          initialRouteName="SplashScreen"
        >
          <RootStack.Screen
            component={SplashScreen}
            name="SplashScreen"
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            component={Walkthrough}
            name="Walkthrough"
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            component={Login}
            name="Login"
            options={{ headerShown: false }}
          />
        </RootStack.Navigator>
  );
};

export default AuthNavigator;
