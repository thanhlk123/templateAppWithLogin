import {
  SIGNED_IN,
  SIGNED_IN_SUCCESS,
  SIGNED_IN_FAIL,
  AUTH_401,
  PUSH_NETWORK_RECALL,
  SET_MAINTENANCE,
  SIGN_OUT,
  SIGN_OUT_FAIL,
  SIGN_OUT_SUCCESS
} from "@constants/ActionType";

export const signInAction = (userName, password) => ({
  type: SIGNED_IN,
  payload: { userName, password },
});

export const signInSuccessAction = (payload) => ({
  type: SIGNED_IN_SUCCESS,
  payload,
});

export const signInFailAction = (payload) => ({
  type: SIGNED_IN_FAIL,
  SIGNED_IN_FAIL,
});

export const refreshUserTokenAction = () => ({
  type: AUTH_401,
});

export const pushNetworkRecallAction = (
  createCall: any,
  actionSuccess: any,
  actionFailed: any,
  handleResponse?: ((result) => any) | null
) => ({
  type: PUSH_NETWORK_RECALL,
  payload: {
    createCall,
    actionSuccess,
    actionFailed,
    handleResponse,
  },
});

export const setMaintenanceAction = (payload: boolean) => {
  return {
    type: SET_MAINTENANCE,
    payload,
  };
};

export const signOutAction = () => {
  return {
    type: SIGN_OUT,
  };
}

export const signOutSuccessAction = () => {
  return {
    type: SIGN_OUT_SUCCESS,
  };
}
export const signOutFailAction = () => {
  return {
    type: SIGN_OUT_FAIL,
  };
}
