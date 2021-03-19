import { SET_DARK_MODE } from "@constants/ActionType";

export const setDarkModeAction = (isDarkMode: boolean) => {
    return {
      type: SET_DARK_MODE,
      payload: isDarkMode,
    };
}