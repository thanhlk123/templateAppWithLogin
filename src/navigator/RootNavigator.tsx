import React from "react";
import { connect, useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";

const Stack = createStackNavigator();

type RootNavigatorProps = {
  isSignedIn: boolean;
};

const RootNavigator = ({ isSignedIn }: RootNavigatorProps) => {
  const authState = useSelector((state: any) => state.auth.isSignedIn);
  return (
    <Stack.Navigator>
      {authState ? (
        <Stack.Screen
          name="AppStack"
          component={AppNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="AuthStack"
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    isSignedIn: auth.isSignedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RootNavigator);
