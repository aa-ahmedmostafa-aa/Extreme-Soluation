import axios from "axios";
import { API } from "../API/api";
import * as LoginType from "../constants/UserConstants";

// User sign in
export const signin = (user) => async (dispatch) => {
  dispatch({ type: LoginType.USER_SIGNIN_REQUEST, payload: user });
  try {
    const { data } = await axios.post(`${API}/signIn`, user);
    dispatch({ type: LoginType.USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: LoginType.USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// User sign out
export const signout = () => async (dispatch, getState) => {
  // const {
  //   userSignin: { userInfo },
  // } = getState();
  try {
    dispatch({ type: LoginType.USER_SIGNOUT_SUCCESS, payload: {} });
  } catch (error) {
    dispatch({
      type: LoginType.USER_SIGNOUT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
  localStorage.removeItem("userInfo");
  document.location.href = "/home/login";
};
