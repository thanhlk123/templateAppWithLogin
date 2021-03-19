import { API_BASE } from "@constants/Setting";
import { getRefreshToken, getToken } from "@utils/Helper";

export const getHeaders = (token?: string) => {
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

export const signInService = async (body: any) => {
  // let response = await fetch(`${API_BASE}Login/user-info`, {
  //   method: "POST",
  //   headers: getHeaders(),
  //   body: JSON.stringify({
  //       userName: "Test",
  //       password: "Hello"
  //   })
  // });
  // let responseJson = await response.json();
  let responseJson = {};
  
    responseJson = {
      message: "POST Request successful.",
      result: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI1IiwiVXNlclVwbiI6ImV4dF92aW5vdmFAbmF2aWc4Z3JvdXAuY29tIiwiVXNlclJlYWxFbWFpbCI6IiIsIlVzZXJTc29OYW1lIjoiRXh0X1Zpbm92YSIsIlBlcm1pc3Npb25JZHMiOiJbNTAsMjY0LDI2NSwyNjYsMjY3LDI2OCwyNjksMjcwLDI3MSwyNzIsMjczLDI3NCwyNzUsMjYzLDI3NiwyNzgsMjc5LDI4MCwyODEsMzAwLDMwMSwzMDIsMzUwLDM1MSwzNTIsMzUzLDI3NywyNjIsMjYxLDI2MCw1MSw1MiwyMDAsMjAxLDIwMiwyMDMsMjA0LDIwNSwxNTAsMTUxLDEwMCwxMDEsMSwyNTAsMjUxLDI1MiwyNTMsMjU0LDI1NSwyNTYsMjU3LDI1OCwyNTksMzU0LDM1NSwyODIsMjA2LDIwNywyMDgsMjA5LDUwMCw1MDEsMzAzLDQwMCw0NTAsNTUwLDU1MSw1NTIsNTAyLDUwMyw1MDQsNjAwLDYwMSw2MDIsNjAzLDYwNCw2MDUsNDUxLDQ1Miw0NTQsNDU1LDQ1Niw0NTddIiwiTW9kdWxlQXBwbGljYXRpb25JZHMiOiJbMSw2LDcsMTAsMiwzLDQsNSwxNCwxMSwxMiwxNSwxM10iLCJuYmYiOjE2MTU5NDg3MjMsImV4cCI6MTYxNTk0OTMyMywiaWF0IjoxNjE1OTQ4NzIzfQ.7cbssQjtDU4r7C07hLRPQax3AK4lFGoruGh3P50b_s0",
        refreshToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI1IiwiVXNlclVwbiI6ImV4dF92aW5vdmFAbmF2aWc4Z3JvdXAuY29tIiwiVXNlclJlYWxFbWFpbCI6IiIsIlVzZXJTc29OYW1lIjoiRXh0X1Zpbm92YSIsIlBlcm1pc3Npb25JZHMiOiJbNTAsMjY0LDI2NSwyNjYsMjY3LDI2OCwyNjksMjcwLDI3MSwyNzIsMjczLDI3NCwyNzUsMjYzLDI3NiwyNzgsMjc5LDI4MCwyODEsMzAwLDMwMSwzMDIsMzUwLDM1MSwzNTIsMzUzLDI3NywyNjIsMjYxLDI2MCw1MSw1MiwyMDAsMjAxLDIwMiwyMDMsMjA0LDIwNSwxNTAsMTUxLDEwMCwxMDEsMSwyNTAsMjUxLDI1MiwyNTMsMjU0LDI1NSwyNTYsMjU3LDI1OCwyNTksMzU0LDM1NSwyODIsMjA2LDIwNywyMDgsMjA5LDUwMCw1MDEsMzAzLDQwMCw0NTAsNTUwLDU1MSw1NTIsNTAyLDUwMyw1MDQsNjAwLDYwMSw2MDIsNjAzLDYwNCw2MDUsNDUxLDQ1Miw0NTQsNDU1LDQ1Niw0NTddIiwiTW9kdWxlQXBwbGljYXRpb25JZHMiOiJbMSw2LDcsMTAsMiwzLDQsNSwxNCwxMSwxMiwxNSwxM10iLCJuYmYiOjE2MTU5NDg3MjMsImV4cCI6MTYxNTk0OTMyMywiaWF0IjoxNjE1OTQ4NzIzfQ.7cbssQjtDU4r7C07hLRPQax3AK4lFGoruGh3P50b_s0",
        timeStamp: "2020 03 18",
        deviceId: "sdafadfasdfqraf",
      },
      statusCode: 200,
      version: "1.0.0.0",
    };

  return responseJson;
};

export const refreshTokenService = async () => {
  const token: string = await getToken();
  const refreshToken: string = await getRefreshToken();
  //  let response = await fetch(
  //    `${API_BASE}Authentication/refresh-authentication-result`,
  //    {
  //      method: "POST",
  //      headers: getHeaders(token),
  //      body: JSON.stringify({
  //       refreshToken
  // }),
  //    }
  //  );

  //  let responseJson = await response.json();
  let responseJson = {};
  if (refreshToken) {
      responseJson = {
        message: "POST Request successful.",
        result: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI1IiwiVXNlclVwbiI6ImV4dF92aW5vdmFAbmF2aWc4Z3JvdXAuY29tIiwiVXNlclJlYWxFbWFpbCI6IiIsIlVzZXJTc29OYW1lIjoiRXh0X1Zpbm92YSIsIlBlcm1pc3Npb25JZHMiOiJbNTAsMjY0LDI2NSwyNjYsMjY3LDI2OCwyNjksMjcwLDI3MSwyNzIsMjczLDI3NCwyNzUsMjYzLDI3NiwyNzgsMjc5LDI4MCwyODEsMzAwLDMwMSwzMDIsMzUwLDM1MSwzNTIsMzUzLDI3NywyNjIsMjYxLDI2MCw1MSw1MiwyMDAsMjAxLDIwMiwyMDMsMjA0LDIwNSwxNTAsMTUxLDEwMCwxMDEsMSwyNTAsMjUxLDI1MiwyNTMsMjU0LDI1NSwyNTYsMjU3LDI1OCwyNTksMzU0LDM1NSwyODIsMjA2LDIwNywyMDgsMjA5LDUwMCw1MDEsMzAzLDQwMCw0NTAsNTUwLDU1MSw1NTIsNTAyLDUwMyw1MDQsNjAwLDYwMSw2MDIsNjAzLDYwNCw2MDUsNDUxLDQ1Miw0NTQsNDU1LDQ1Niw0NTddIiwiTW9kdWxlQXBwbGljYXRpb25JZHMiOiJbMSw2LDcsMTAsMiwzLDQsNSwxNCwxMSwxMiwxNSwxM10iLCJuYmYiOjE2MTU5NDg3MjMsImV4cCI6MTYxNTk0OTMyMywiaWF0IjoxNjE1OTQ4NzIzfQ.7cbssQjtDU4r7C07hLRPQax3AK4lFGoruGh3P50b_s0",
          refreshToken:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI1IiwiVXNlclVwbiI6ImV4dF92aW5vdmFAbmF2aWc4Z3JvdXAuY29tIiwiVXNlclJlYWxFbWFpbCI6IiIsIlVzZXJTc29OYW1lIjoiRXh0X1Zpbm92YSIsIlBlcm1pc3Npb25JZHMiOiJbNTAsMjY0LDI2NSwyNjYsMjY3LDI2OCwyNjksMjcwLDI3MSwyNzIsMjczLDI3NCwyNzUsMjYzLDI3NiwyNzgsMjc5LDI4MCwyODEsMzAwLDMwMSwzMDIsMzUwLDM1MSwzNTIsMzUzLDI3NywyNjIsMjYxLDI2MCw1MSw1MiwyMDAsMjAxLDIwMiwyMDMsMjA0LDIwNSwxNTAsMTUxLDEwMCwxMDEsMSwyNTAsMjUxLDI1MiwyNTMsMjU0LDI1NSwyNTYsMjU3LDI1OCwyNTksMzU0LDM1NSwyODIsMjA2LDIwNywyMDgsMjA5LDUwMCw1MDEsMzAzLDQwMCw0NTAsNTUwLDU1MSw1NTIsNTAyLDUwMyw1MDQsNjAwLDYwMSw2MDIsNjAzLDYwNCw2MDUsNDUxLDQ1Miw0NTQsNDU1LDQ1Niw0NTddIiwiTW9kdWxlQXBwbGljYXRpb25JZHMiOiJbMSw2LDcsMTAsMiwzLDQsNSwxNCwxMSwxMiwxNSwxM10iLCJuYmYiOjE2MTU5NDg3MjMsImV4cCI6MTYxNTk0OTMyMywiaWF0IjoxNjE1OTQ4NzIzfQ.7cbssQjtDU4r7C07hLRPQax3AK4lFGoruGh3P50b_s0",
          timeStamp: "2020 03 18",
          deviceId: "sdafadfasdfqraf",
        },
        statusCode: 200,
        version: "1.0.0.0",
      };
  } else {
      responseJson = {
        message: "POST Request successful.",
        result: {},
        statusCode: 400,
        version: "1.0.0.0",
      };
  }

  return responseJson;
};

export const signOutService = async () => {
  const token: string = await getToken();
  const refreshToken: string = await getRefreshToken();
  //  let response = await fetch(
  //    `${API_BASE}Authentication/refresh-authentication-result`,
  //    {
  //      method: "POST",
  //      headers: getHeaders(token),
  //      body: JSON.stringify({
  //       refreshToken
  // }),
  //    }
  //  );

  //  let responseJson = await response.json();
  let responseJson = {};
      responseJson = {
        message: "POST Request successful.",
        result: {},
        statusCode: 200,
        version: "1.0.0.0",
      };

  return responseJson;
};


