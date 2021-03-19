import { SET_DARK_MODE, SET_MAINTENANCE } from "@constants/ActionType";
import {setTheme} from "@utils/Helper"

export type InitState = {
  isDarkMode: boolean;
  isMaintenance: boolean;
  vsHeight: number;
};

let initState: InitState = {
  isDarkMode: false,
  isMaintenance: false,
  vsHeight: 0,
};

export default function appStateReducer(state = initState, action) {
  switch (action.type) {
    case SET_DARK_MODE:
      setTheme(action.payload);
      return { ...state, isDarkMode: action.payload };
    case SET_MAINTENANCE:
      return {
        ...state,
        isMaintenance: action.payload ? action.payload : false,
      };
    default:
      return state;
  }
}
