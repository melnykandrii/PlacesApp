import {
  LOGIN,
  SIGNUP,
  AUTHENTICATE,
  LOGOUT,
  SET_TRYAUTH,
} from "../actions/auth-actions";
const initialState = {
  token: null,
  userId: null,
  tryauth: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        tryauth: true,
      };
    case SET_TRYAUTH:
      return { ...state, tryauth: true };
    case LOGOUT:
      return initialState;
    /*case LOGIN:
      return {
        token: action.token,
        userId: action.userId,
      };
    case SIGNUP:
      return {
        token: action.token,
        userId: action.userId,
      };*/
    default:
      return state;
  }
};
