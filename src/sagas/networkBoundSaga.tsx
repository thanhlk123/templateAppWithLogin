import { put } from "redux-saga/effects";
import {store} from "@appRedux/configureStore";
import {
  refreshUserTokenAction,
  pushNetworkRecallAction,
  setMaintenanceAction,
} from "@appRedux/actionTypes/authAction";
import _ from "lodash";

export const AN_ERROR_OCCURRED = "Something went wrong, please try again.";

type APIResponseType = {
  version: string;
  statusCode: number;
  isError: boolean;
  message?: string;
  responseException?: {
    exceptionMessage: any;
  };
  result?: any;
  data?: any;
};

// assuming
let currentMaintenanceState = false;

const WaitTimeout = [0, 2, 10, 30];
let timeoutIndex = 0;
let canRelogin = true;

export async function fetchNetwork(
  createCall: any,
  actionSuccess: any,
  actionFailed: any,
  handleResponse?: ((result) => any) | null
) {
  const dispatch = store.dispatch;
  try {
    let response: APIResponseType = await createCall();
    if (response.isError) {
      console.log(`
      ===============================================
      response failed: ${JSON.stringify(response, null, 2)}
      `);
      if (response.statusCode === 401) {
        // save api request for retry it after refreshed
        dispatch(
          pushNetworkRecallAction(
            createCall,
            actionSuccess,
            actionFailed,
            handleResponse
          )
        );

        // set timeout for 401 status
        if (canRelogin) {
          canRelogin = false;
          setTimeout(() => {
            canRelogin = true;
            //
            const nextTimeoutIndex = timeoutIndex + 1;
            timeoutIndex = nextTimeoutIndex;
            if (nextTimeoutIndex >= WaitTimeout.length) {
              timeoutIndex = 1;
            }
          }, WaitTimeout[timeoutIndex] * 1000);
          // refresh token one at the specific time
          dispatch(refreshUserTokenAction());
        }
      } else if (response.statusCode === 503 || response.statusCode === 502) {
        // for maintenance case
        currentMaintenanceState = true;
        dispatch(setMaintenanceAction(currentMaintenanceState));
      } else {
        await dispatch(
          actionFailed(
            response?.responseException?.exceptionMessage?.ResponseException ||
              AN_ERROR_OCCURRED
          )
        );
      }
    } else {
      // TODO: bad practice
      if (currentMaintenanceState === true) {
        currentMaintenanceState = false;
        dispatch(setMaintenanceAction(currentMaintenanceState));
      }

      const data = response.result || response.data;
      let result =
        handleResponse && handleResponse !== null ? handleResponse(data) : data;

      // if (isFirstResponse) {
      //   yield put(refreshUserTokenAction());
      // }
      dispatch(actionSuccess(result));
    }
  } catch (error) {
    console.log(
      `
    ===============================================
    request failed reason: ${JSON.stringify(error, null, 2)}
    `,
      error
    );
    dispatch(actionFailed(error.message || AN_ERROR_OCCURRED));
  }
}

/**
 * to automatically attempt to reconnect if the connection is lost. By default, the client will wait 0, 2, 10 and 30 seconds respectively before trying up to 4 reconnect attempts.
 * @param createCall call API from Saga and Service
 * @param actionSuccess received success response
 * @param actionFailed received failed response
 * @param handleResponse handle response for specific received success response
 * @param isObjectError when want to get all object error such as: code, message ... instead of only message
 */

export function* fetchNetworkBoundSaga(
  createCall: any,
  actionSuccess: any,
  actionFailed: any,
  handleResponse?: ((result) => any) | null,
  isObjectError: boolean = false
) {
  try {
    let response: APIResponseType = yield createCall();
    if (response.isError) {
      console.log(`
      ===============================================
      response failed: ${JSON.stringify(response, null, 2)}
      `);
      if (response.statusCode === 401) {
        // save api request for retry it after refreshed
        yield put(
          pushNetworkRecallAction(
            createCall,
            actionSuccess,
            actionFailed,
            handleResponse
          )
        );
        // set timeout for 401 status
        if (canRelogin) {
          canRelogin = false;
          setTimeout(() => {
            canRelogin = true;
            //
            const nextTimeoutIndex = timeoutIndex + 1;
            timeoutIndex = nextTimeoutIndex;
            if (nextTimeoutIndex >= WaitTimeout.length) {
              timeoutIndex = 1;
            }
          }, WaitTimeout[timeoutIndex] * 1000);
          // refresh token one at the specific time
          yield put(refreshUserTokenAction());
        }
      } else if (response.statusCode === 503 || response.statusCode === 502) {
        // for maintenance case
        currentMaintenanceState = true;
        yield put(setMaintenanceAction(currentMaintenanceState));
      } else {
        if (isObjectError) {
          yield put(actionFailed(response));
        } else {
          yield put(
            actionFailed(
              response?.responseException?.exceptionMessage
                ?.ResponseException ||
                response?.responseException?.exceptionMessage?.title ||
                AN_ERROR_OCCURRED
            )
          );
        }
      }
    } else {
      // TODO: bad practice
      if (currentMaintenanceState === true) {
        currentMaintenanceState = false;
        yield put(setMaintenanceAction(currentMaintenanceState));
      }

      const data = response.result || response.data;
      let result =
        handleResponse && handleResponse !== null ? handleResponse(data) : data;

      // if (isFirstResponse) {
      //   yield put(refreshUserTokenAction());
      // }
      console.log("result", result);
      yield put(actionSuccess(result));
    }
  } catch (error) {
    console.log(
      `
    ===============================================
    request failed reason: ${JSON.stringify(error, null, 2)}
    `,
      error
    );
    yield put(actionFailed(error.message || AN_ERROR_OCCURRED));
  }
}
