import {
    GET_APPEL_D_OFFRE, 
    RESET_APPEL_D_OFFRE_REDUCER,
    UPDATE_APPEL_D_OFFRE,
  } from "../actions/appelDOffreActions";
  
  const initialState = {};
  
  export default function appelDOffreReducer(state = initialState, action) {
    switch (action.type) {
      case GET_APPEL_D_OFFRE:
        return action.payload;
      case RESET_APPEL_D_OFFRE_REDUCER:
        return initialState;
      case UPDATE_APPEL_D_OFFRE:
        return {
          ...state,
          dateLancement: action.payload.dateLancement,
          dateCloture: action.payload.dateCloture,
          mediasUtilises: action.payload.mediasUtilises,
          redacteurs: action.payload.redacteurs
        };  
      default:
        return state;
    }
  }
  