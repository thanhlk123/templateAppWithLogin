import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";

import { signOutAction } from "@appRedux/actionTypes/authAction";
import { dispatch } from "rxjs/internal/observable/pairs";

type DashBoardScreenProps = {
  signOut: () => void;
};
const index = ({ signOut }: DashBoardScreenProps) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>DASHBOARD</Text>
      <TouchableOpacity style={styles.btnStyle} onPress={() => signOut()}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOutAction()),
  };
};
const styles = StyleSheet.create({
  btnStyle: {
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderWidth: 0.5,
    borderColor: "blue",
    backgroundColor: "#18A0FB",
    borderRadius: 10,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(index);
