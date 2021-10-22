import * as LoginType from "../constants/UserConstants";

export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case LoginType.USER_SIGNIN_REQUEST:
      return { loading: true };
    case LoginType.USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case LoginType.USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    

    default:
      return state;
  }
};
