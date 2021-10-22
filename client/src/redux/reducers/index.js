import { combineReducers } from "redux";
import { allArtPiecesReducer } from "./ArtPieces";
import { userSigninReducer } from "./Login";
import { allUsersReducer } from "./User";

export const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};
export default combineReducers({
  userSignin: userSigninReducer,
  allArtPieces: allArtPiecesReducer,
  allUsers: allUsersReducer,
});
