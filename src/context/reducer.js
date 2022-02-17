import {
  LOADING,
  LOGIN,
} from "./action.type";

export const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload,
        ...(action.payload === false && {triggerGet: Math.random()}),
      }
    case LOGIN:
      return {
        ...state,
        loggedin: true,
        user: action.payload,
      }
    default:
      return state
  }
}