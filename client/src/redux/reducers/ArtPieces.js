import * as ArtPiecesType from "../constants/ArtPiecesConstants";

export const allArtPiecesReducer = (
  state = { loading: true, ArtPieces: {} },
  action
) => {
  switch (action.type) {
    // for get  All ArtPieces
    case ArtPiecesType.GET_ALL_ART_PIECESS_REQUEST:
      return { loading: true };
    case ArtPiecesType.GET_ALL_ART_PIECESS_SUCCESS:
      return { loading: false, ArtPieces: action.payload };
    case ArtPiecesType.GET_ALL_ART_PIECESS_FAIL:
      return { loading: false, error: action.payload };

    // for add  new ArtPieces

    case ArtPiecesType.ADD_NEW_ART_PIECES_REQUEST:
      return { ...state, loading: true };
    case ArtPiecesType.ADD_NEW_ART_PIECES_SUCCESS:
      state.ArtPieces.data.push(action.payload);
      return {
        loading: false,
        ArtPieces: { ...state.ArtPieces },
      };
    case ArtPiecesType.ADD_NEW_ART_PIECES_FAIL:
      return { loading: false, error: action.payload };

    // for Delete  ArtPieces
    case ArtPiecesType.DELETE_ART_PIECES_REQUEST:
      return { ...state, loading: true };
    case ArtPiecesType.DELETE_ART_PIECES_SUCCESS:
      return {
        loading: false,
        ArtPieces: {
          ...state.ArtPieces,
          data: state.ArtPieces.data.filter(
            (g) => g._id !== action.payload.deleted
          ),
        },
      };
    case ArtPiecesType.DELETE_ART_PIECES_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
