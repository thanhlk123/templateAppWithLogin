import AsyncStorage from "@react-native-community/async-storage";

export const localStorageSetWith = async <P extends {}>(
  key: string,
  value: P
): Promise<boolean> => {
  try {
    const receivedString = JSON.stringify(value, null, 2);
    await AsyncStorage.setItem(`@${key}`, receivedString, (error) => {});
    return true;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const localStorageGetWith = async <P extends {}>(
  key: string
): Promise<P | undefined> => {
  try {
    const stringtify = await AsyncStorage.getItem(`@${key}`);
    if (stringtify) {
      const receivedObject = JSON.parse(stringtify) as P;
      if (receivedObject) {
        return receivedObject;
      } else {
        return undefined;
      }
    }

    return undefined;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const saveToken = async (token: string): Promise<string> => {
  try {
    await AsyncStorage.setItem("@token", token);
    await saveLoggedOut(false);
    return "success";
  } catch (e) {
    return "error";
  }
};

export const getToken = async (): Promise<string> => {
  try {
    const token = await AsyncStorage.getItem("@token");
    return token || "";
  } catch (error) {
    return "";
  }
};

export const getRefreshToken = async (): Promise<string> => {
  try {
    const refreshToken = await AsyncStorage.getItem("@refreshToken");
    return refreshToken || "";
  } catch (error) {
    return "";
  }
};

export const setTheme = async (isDarkMode: boolean) => {
  try {
    await AsyncStorage.setItem("@theme", isDarkMode ? "dark" : "light");
    return "success";
  } catch (e) {
    return "error";
  }
};

export const setRefreshToken = async (refreshToken: string) => {
  try {
    await AsyncStorage.setItem("@refreshToken", refreshToken);
    return "success";
  } catch (e) {
    return "error";
  }
};

export const getTheme = async (): Promise<string> => {
  try {
    const theme = await AsyncStorage.getItem("@theme");
    return theme || "light";
  } catch (error) {
    return "light";
  }
};

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

export const getHeadersMultipart = (token?: string) => {
  let headers = {
    "Content-Type": "multipart/form-data",
    Accept: "multipart/form-data",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

export const randomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const colors = [
  "#45B8AB",
  "#FFD600",
  "#BD4F8C",
  "#EC6221",
  "#E40138",
  "#213A78",
  "#D5D5D5",
  "#66ff66",
  "#ff00ff",
  "#3333ff",
  "#996600",
  "#00ccff",
  "#993333",
  "#cc99ff",
  "#999966",
  "#000066",
];

export const getColorsChart = (index: number) => {
  return index < colors.length ? colors[index] : randomColor();
};

export const objectToParam = (obj: Object) => {
  var str = "";
  for (var key in obj) {
    if (str != "") {
      str += "&";
    }
    str += key + "=" + encodeURIComponent(obj[key]);
  }
  return str;
};




export const saveBiometricAccess = async (isOn: boolean) => {
  try {
    await AsyncStorage.setItem("@biometric_access", String(isOn));
    return "success";
  } catch (error) {
    return "error";
  }
};

export const getBiometricAccess = async () => {
  try {
    const biometricAccess = await AsyncStorage.getItem("@biometric_access");
    if (biometricAccess && biometricAccess === "true") {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const saveLoggedOut = async (isLoggedOut: boolean) => {
  try {
    const isEnableBiometricLogin = await getBiometricAccess();
    if (isLoggedOut && !isEnableBiometricLogin) {
      saveToken("");
      localStorageSetWith("REFRESH_TOKEN", "");
      saveUsername("");
    }
    await AsyncStorage.setItem("@is_logged_out", String(isLoggedOut));
    return "success";
  } catch (error) {
    return "error";
  }
};

export const getLoggedOut = async () => {
  try {
    const isLoggedOut = await AsyncStorage.getItem("@is_logged_out");
    if (isLoggedOut && isLoggedOut === "false") {
      return false;
    }
    return true;
  } catch (error) {
    return true;
  }
};

export const saveUsername = async (username: string): Promise<string> => {
  try {
    await AsyncStorage.setItem("@username", username);
    return "success";
  } catch (e) {
    return "error";
  }
};

export const getUsername = async (): Promise<string> => {
  try {
    const username = await AsyncStorage.getItem("@username");
    return username || "";
  } catch (error) {
    return "";
  }
};

export const removeToken = async ()=> {
    try {
      await AsyncStorage.removeItem("@token");
      return true;
    } catch (exception) {
      return false;
    }
};

export const removeRefreshToken = async () => {
  try {
     await AsyncStorage.removeItem("@refreshToken");
    return true;
  } catch (exception) {
    return false;
  }
};

export const validateEmail = (text: string) => {
  if (!text.trim()) return true;
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(text) === false) {
    return false;
  } else {
    return true;
  }
};

export const validateNumber = (text) => {
  if (!text.trim()) return true;
  if (isNaN(text)) {
    //if input is not a number then here
    return false;
  } else {
    //if input is number then here
    return true;
  }
};

export function validateURL(str: string) {
  if (!str.trim()) return true;
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return pattern.test(str);
}

export const makeParam = (params) => {
  const paramObject = {
    ...params,
  };

  let paramList: string[] = [];
  for (let key in paramObject) {
    const value = paramObject[key]
    if (value) {
      if (Array.isArray(value)) {
        paramList.push(key + "=" + encodeURIComponent(JSON.stringify(value)))
      } else {
        paramList.push(key + "=" + encodeURIComponent(paramObject[key]))
      }
    }
  }
  let paramStr = paramList.reduce((currentValue, item, index) => {
    let nextValue =
      index === 0 ? currentValue + item : currentValue + "&" + item;
    return nextValue;
  }, "?");

  return paramStr.length !== 1 ? paramStr : "";
};


