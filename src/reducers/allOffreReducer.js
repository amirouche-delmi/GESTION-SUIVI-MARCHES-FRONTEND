import { 
  DELETE_OFFRE, 
  GET_ALL_OFFRE 
} from "../actions/offreActions";

const initialState = {};

export default function allMarcheReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_OFFRE:
      return action.payload
    case DELETE_OFFRE:
      return state.filter((offre) => offre._id !== action.payload.id);
    default: 
      return state;
  }
}
  