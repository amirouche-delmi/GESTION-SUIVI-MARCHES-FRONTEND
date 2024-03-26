import {
    GET_SOUMISSIONNAIRE, 
    RESET_SOUMISSIONNAIRE_REDUCER,
    UPDATE_SOUMISSIONNAIRE,
  } from "../actions/soumissionnaireActions";
  
  const initialState = {};
  
  export default function offreReducer(state = initialState, action) {
    switch (action.type) {
      case GET_SOUMISSIONNAIRE:
        return action.payload;
      case RESET_SOUMISSIONNAIRE_REDUCER:
        return initialState;
      case UPDATE_SOUMISSIONNAIRE:
        return {
          ...state,
          nom: action.payload.nomSoumissionnaire,
          email: action.payload.emailSoumissionnaire,
          telephone: action.payload.telephoneSoumissionnaire,
          statut: action.payload.statutSoumissionnaire,
        };  
      default:
        return state;
    }
  }
  