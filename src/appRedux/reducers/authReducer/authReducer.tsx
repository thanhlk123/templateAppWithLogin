import {
  SIGNED_IN,
  SIGNED_IN_SUCCESS,
  SIGNED_IN_FAIL,
  SIGN_OUT,
  SIGN_OUT_FAIL,
  SIGN_OUT_SUCCESS,
} from "@constants/ActionType";
import { AuthReducerProps } from "@constants/AuthConstant";
import { TabRouter } from "@react-navigation/native";
import {
  saveToken,
  setRefreshToken,
  removeRefreshToken,
  removeToken,
} from "@utils/Helper";

const initState: AuthReducerProps = {
  isLoading: false,
  isSignedIn: false,
  isError: false,
  error: "",
  is401: false,
};

const authReducer = (state: AuthReducerProps = initState, action) => {
  switch (action.type) {
    case SIGNED_IN:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSignedIn: false,
      };
    case SIGNED_IN_SUCCESS:
      setRefreshToken(action?.payload?.refreshToken);
      saveToken(action?.payload?.token);
      return {
        ...state,
        isLoading: false,
        isSignedIn: true,
        error: "",
        userInfo: action.payload,
      };
    case SIGNED_IN_FAIL:
      removeToken();
      removeRefreshToken();
      return {
        ...state,
        isLoading: false,
        isSignedIn: false,
        error: action.payload,
        isError: true,
      };
    case SIGN_OUT:
      return {
        ...state,
        isLoading: true,
      };
    case SIGN_OUT_SUCCESS:
      removeToken();
      removeRefreshToken();
      return {
        ...state,
        isLoading: false,
        isSignedIn: false,
      };
    case SIGN_OUT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: `${action.payload} \n Đã có lỗi trong lúc đăng xuất, vui lòng thử lại sau`,
        isError: true,
      };
    default:
      return state;
  }
};

export default authReducer;
