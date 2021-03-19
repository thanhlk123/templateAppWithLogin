import { takeLatest } from "redux-saga/effects";
import {
  SIGNED_IN,
  AUTH_401,
  SIGN_OUT
} from "@constants/ActionType"

import {
    signInSuccessAction,
    signInFailAction,
    signOutSuccessAction,
    signOutFailAction
} from "@appRedux/actionTypes/authAction";

import {
  signInService,
  refreshTokenService,
  signOutService,
} from "@services/authServices/authServices";

import { fetchNetworkBoundSaga } from "./networkBoundSaga";

function* signInSaga(action: any) {
  yield fetchNetworkBoundSaga(
    () => signInService(action.payload),
    signInSuccessAction,
    signInFailAction
  );
}

function* refreshTokenSaga(action: any) {
  yield fetchNetworkBoundSaga(
    () => refreshTokenService(),
    signInSuccessAction,
    signInFailAction
  );
}

function* signOutSaga(action: any) {
  yield fetchNetworkBoundSaga(
    () => signOutService(),
    signOutSuccessAction,
    signOutFailAction
  );
}

export function* watchAuthSaga() {
  yield takeLatest(SIGNED_IN, signInSaga);
  yield takeLatest(AUTH_401, refreshTokenSaga);
  yield takeLatest(SIGN_OUT, signOutSaga);
}
