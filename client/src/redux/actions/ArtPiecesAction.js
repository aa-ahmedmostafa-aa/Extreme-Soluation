import axios from "axios";
import { API } from "../API/api";
import * as ArtPiecesType from "../constants/ArtPiecesConstants";

// Get all Art Pieces
export const getAllArtPieces = (page, size) => async (dispatch, getState) => {
  dispatch({
    //for Request
    type: ArtPiecesType.GET_ALL_ART_PIECESS_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.get(
      `${API}/artPieces?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({
      //for Success
      type: ArtPiecesType.GET_ALL_ART_PIECESS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      //for Fail
      type: ArtPiecesType.GET_ALL_ART_PIECESS_FAIL,
      payload: message,
    });
  }
};
// Add new Art Piece
export const addNewArtPiece = (ArtPiece) => async (dispatch, getState) => {
  console.log(ArtPiece)
  dispatch({ type: ArtPiecesType.ADD_NEW_ART_PIECES_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.post(`${API}/addArtPiece`, ArtPiece, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: ArtPiecesType.ADD_NEW_ART_PIECES_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ArtPiecesType.ADD_NEW_ART_PIECES_FAIL,
      payload: message,
    });
  }
};

// Delete  Art Pieces
export const deleteArtPieces = (ArtPiecesId) => async (dispatch, getState) => {
  dispatch({ type: ArtPiecesType.DELETE_ART_PIECES_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.delete(`${API}/deleteArtPiece/${ArtPiecesId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: ArtPiecesType.DELETE_ART_PIECES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ArtPiecesType.DELETE_ART_PIECES_FAIL,
      payload: message,
    });
  }
};
