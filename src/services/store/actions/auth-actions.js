import AsyncStorage from "@react-native-async-storage/async-storage";

//export const SIGNUP = "SIGNUP";
//export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const SET_TRYAUTH = "SET_TRYAUTH";

let timer;

export const setAuth = () => {
  return { type: SET_TRYAUTH };
};

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const signUp = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDqJC8FRAwVoxWbB_9wRf0X8v-L5Ie7XOA",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResponseData = await response.json();
      const errorId = errorResponseData.error.message;
      console.log(errorId);
      let errorMessage = "Something went wrong";
      if (errorId === "EMAIL_EXISTS") {
        errorMessage = "This email address is alredy exists!";
      } else if (errorId === "TOO_MANY_ATTEMPTS_TRY_LATER") {
        errorMessage = "Too many attampts. Please try later.";
      } else if (errorId === "OPERATION_NOT_ALLOWED") {
        errorMessage = "We could not create password for you account!";
      } else if (errorId === "INVALID_EMAIL") {
        errorMessage = "You have entered an invalid email address!";
      } else if (errorId === "USER_DISABLED") {
        errorMessage = "Your account was disabled!";
      }
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    const respTokenDate = parseInt(responseData.expiresIn, 10) * 1000;

    dispatch(
      authenticate(responseData.localId, responseData.idToken, respTokenDate)
    );

    const currentDate = new Date().getTime();
    const expirationDate = new Date(currentDate + respTokenDate);

    saveUserData(responseData.idToken, responseData.localId, expirationDate);
  };
};

export const logIn = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDqJC8FRAwVoxWbB_9wRf0X8v-L5Ie7XOA",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResponseData = await response.json();
      const errorId = errorResponseData.error.message;
      let errorMessage = "Something went wrong";
      if (errorId === "EMAIL_NOT_FOUND") {
        errorMessage = "You have entered a wrong email address!";
      } else if (errorId === "INVALID_EMAIL") {
        errorMessage = "You have entered an invalid email address!";
      } else if (errorId === "MISSING_PASSWORD") {
        errorMessage = "You likely forgot to enter your password!";
      } else if (errorId === "INVALID_PASSWORD") {
        errorMessage = "You have entered a wrong password!";
      } else if (errorId === "USER_DISABLED") {
        errorMessage = "Your account was disabled!";
      } else if (
        errorId ===
        "TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
      ) {
        errorMessage =
          "Your account was temporarily locked. Please try again later or reset it!";
      }
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    const respTokenDate = parseInt(responseData.expiresIn, 10) * 1000;

    dispatch(
      authenticate(responseData.localId, responseData.idToken, respTokenDate)
    );

    const currentDate = new Date().getTime();
    const expirationDate = new Date(currentDate + respTokenDate);
    saveUserData(responseData.idToken, responseData.localId, expirationDate);
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveUserData = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
