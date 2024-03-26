import {
    GET_CAHIER_DES_CHARGES, 
    RESET_CAHIER_DES_CHARGES_REDUCER,
    UPDATE_CAHIER_DES_CHARGES,
  } from "../actions/cahierDesChargesActions";
  
  const initialState = {};
  
  export default function besoinReducer(state = initialState, action) {
    switch (action.type) {
      case GET_CAHIER_DES_CHARGES:
        return action.payload;
      case RESET_CAHIER_DES_CHARGES_REDUCER:
        return initialState;
      case UPDATE_CAHIER_DES_CHARGES:
        return {
          ...state,
          intitule: action.payload.intitule,
          descriptionSuccincte: action.payload.descriptionSuccincte,
          dateFinalisation: action.payload.dateFinalisation,
          validePar: action.payload.validePar,
          participants: action.payload.participants,
          // exemplaireNumerique: action.payload.exemplaireNumerique,
        };  
      default:
        return state;
    }
  }
  