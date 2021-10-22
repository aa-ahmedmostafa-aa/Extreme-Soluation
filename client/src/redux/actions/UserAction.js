import axios from "axios";
import { API } from "../API/api";
import * as UserType from "../constants/UserConstants";

// Get all Users
export const getAllUsers =
  (page = 1, size = 10) =>
  async (dispatch, getState) => {
    dispatch({
      //for Request
      type: UserType.GET_ALL_USERS_REQUEST,
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(
        `${API}/users?page=${page}&size=${size}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({
        //for Success
        type: UserType.GET_ALL_USERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        //for Fail
        type: UserType.GET_ALL_USERS_FAIL,
        payload: message,
      });
    }
  };

// Sign up User
export const signUpUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: UserType.SIGN_UP_USER_REQUEST });
    const { data } = await axios.post(`${API}/addUser`, user);
    dispatch({
      type: UserType.SIGN_UP_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: UserType.SIGN_UP_USER_FAIL,
      payload: message,
    });
  }
};



