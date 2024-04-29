import { 
  DELETE_OFFRE, 
  GET_ALL_OFFRE,
  RESET_ALL_OFFRE_REDUCER 
} from "../actions/offreActions";

const initialState = {};

export default function allMarcheReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_OFFRE:
      return action.payload
    case RESET_ALL_OFFRE_REDUCER:
      return initialState;
    case DELETE_OFFRE:
      return state.filter((offre) => offre._id !== action.payload.id);
    default: 
      return state;
  }
}
  