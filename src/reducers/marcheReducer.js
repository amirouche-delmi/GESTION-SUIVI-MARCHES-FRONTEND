import {
  GET_MARCHE, 
  RESET_MARCHE_REDUCER,
  UPDATE_MARCHE,
  // LIKE_ANNONCE_P,
  // UNLIKE_ANNONCE_P,
} from "../actions/marcheActions";

const initialState = {};

export default function marcheReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MARCHE:
      return action.payload;
    case RESET_MARCHE_REDUCER:
      return initialState;
    case UPDATE_MARCHE:
      return {
        ...state,
        intitule: action.payload.intitule,
        description: action.payload.description,
        ceoID: action.payload.ceoID,
        etape: action.payload.etape,
      };
    default:
      return state;
  }
}
