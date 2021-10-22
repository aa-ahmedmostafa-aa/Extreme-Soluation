import * as UserType from "../constants/UserConstants";

export const allUsersReducer = (
  state = { loading: true, Users: {} },
  action
) => {
  switch (action.type) {
    // for Add New Users

    // for get  All Users
    case UserType.GET_ALL_USERS_REQUEST:
      return { loading: true };
    case UserType.GET_ALL_USERS_SUCCESS:
      return { loading: false, Users: action.payload };
    case UserType.GET_ALL_USERS_FAIL:
      return { loading: false, error: action.payload };

    case UserType.SIGN_UP_USER_REQUEST:
      return { loading: true };
    case UserType.SIGN_UP_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload.user,
        status: true,
      };

    case UserType.SIGN_UP_USER_FAIL:
      return { loading: false, error: action.payload };

    case UserType.CLEAR_USER_STATUS:
      return { status: false };

    default:
      return state;
  }
};
