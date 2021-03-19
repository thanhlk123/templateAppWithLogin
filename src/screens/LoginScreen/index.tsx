import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";

import { signInAction } from "@appRedux/actionTypes/authAction";
import { AuthReducerProps } from "@constants/AuthConstant";

type screenProps = {
  auth: AuthReducerProps;
  signIn: (userName: string, password: string) => void;
  navigation: any;
};

const index = ({ navigation, auth, signIn }: screenProps) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
        <Text h2>Login</Text>
        <View style={styles.spaceView} />
        <Input
          placeholder="User name"
          containerStyle={{ width: "85%" }}
          inputStyle={{ color: "black", paddingLeft: 10 }}
          leftIcon={{ type: "font-awesome", name: "user", color: "grey" }}
          onChangeText={(text) => setUserName(text)}
        />

        <Input
          placeholder="Password"
          textContentType={"password"}
          containerStyle={{ width: "85%" }}
          inputStyle={{ color: "black", paddingLeft: 10 }}
          leftIcon={<Icon name="lock" size={24} color="grey" />}
          onChangeText={(text) => setPassword(text)}
        />
        <Button
          title="Sign In"
          buttonStyle={{ paddingHorizontal: 60, paddingVertical: 10 }}
          onPress={() => signIn(userName, password)}
        />
        <TouchableOpacity style={{ marginTop: 30 }}>
          <Text
            style={{
              textDecorationLine: "underline",
              textDecorationStyle: "solid",
              textDecorationColor: "#000",
            }}
          >
            Forgot Password
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spaceView: {
    padding: 15,
  },
});

const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (userName: string, password: string) =>
      dispatch(signInAction(userName, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);

