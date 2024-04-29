import {
    GET_CONTRAT, 
    RESET_CONTRAT_REDUCER,
    UPDATE_CONTRAT,
  } from "../actions/contratActions";
  
  const initialState = {};
  
  export default function contratReducer(state = initialState, action) {
    switch (action.type) {
      case GET_CONTRAT:
        return action.payload;
      case RESET_CONTRAT_REDUCER:
        return initialState;
      case UPDATE_CONTRAT:
        return {
          ...state,
          delaiRealisation: action.payload.delaiRealisation,
          cout: action.payload.cout,
          statut: action.payload.statut,
          observation: action.payload.observation,
          signePar: action.payload.signePar,
        };  
      default:
        return state;
    }
  }
  