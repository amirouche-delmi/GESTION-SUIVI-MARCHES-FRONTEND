import { DELETE_MARCHE, GET_ALL_MARCHE } from "../actions/marcheActions";

const initialState = {};

export default function allMarcheReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_MARCHE:
      return action.payload
    case DELETE_MARCHE:
      return state.filter((marche) => marche._id !== action.payload.id);
    default: 
      return state;
  }
}