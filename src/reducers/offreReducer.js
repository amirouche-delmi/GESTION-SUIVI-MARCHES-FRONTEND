import {
    GET_OFFRE, 
    RESET_OFFRE_REDUCER,
    UPDATE_OFFRE,
  } from "../actions/offreActions";
  
  const initialState = {};
  
  export default function offreReducer(state = initialState, action) {
    switch (action.type) {
      case GET_OFFRE:
        return action.payload;
      case RESET_OFFRE_REDUCER:
        return initialState;
      case UPDATE_OFFRE:
        return {
          ...state,
          detailsProposition: action.payload.detailsProposition,
          noteObtenue: action.payload.noteObtenue,
          resultatEvaluation: action.payload.resultatEvaluation,
          motif: action.payload.motif,
          membresCommission: action.payload.membresCommission,
        };  
      default:
        return state;
    }
  }
  