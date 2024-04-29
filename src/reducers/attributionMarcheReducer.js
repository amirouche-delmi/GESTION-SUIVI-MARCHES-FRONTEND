import {
    GET_ATTRIBUTION_MARCHE, 
    RESET_ATTRIBUTION_MARCHE_REDUCER,
    UPDATE_ATTRIBUTION_MARCHE,
  } from "../actions/attributionMarcheActions";
  
  const initialState = {};
  
  export default function attributionMarcheReducer(state = initialState, action) {
    switch (action.type) {
      case GET_ATTRIBUTION_MARCHE:
        return action.payload;
      case RESET_ATTRIBUTION_MARCHE_REDUCER:
        return initialState;
      case UPDATE_ATTRIBUTION_MARCHE:
        return {
          ...state,
          commentaire: action.payload.get('commentaire'),
          // PVCommission: action.payload.get('PVCommission'),
        };  
      default:
        return state;
    }
  }
  