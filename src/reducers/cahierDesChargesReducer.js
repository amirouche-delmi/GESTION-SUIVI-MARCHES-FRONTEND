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
          intitule: action.payload.get('intitule'),
          descriptionSuccincte: action.payload.get('descriptionSuccincte'),
          dateFinalisation: action.payload.get('dateFinalisation'),
          validePar: action.payload.get('validePar'),
          participants: JSON.parse(action.payload.get('participants')),
          // exemplaireNumerique: action.payload.get('exemplaireNumerique'),
        };  
      default:
        return state;
    }
  }
  