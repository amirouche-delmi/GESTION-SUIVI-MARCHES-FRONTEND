import {
    GET_VALIDATION_PREALABLE, 
    RESET_VALIDATION_PREALABLE_REDUCER,
    UPDATE_VALIDATION_PREALABLE,
  } from "../actions/validationPrealableActions";
  
  const initialState = {};
  
  export default function validationPrealableReducer(state = initialState, action) {
    switch (action.type) {
      case GET_VALIDATION_PREALABLE:
        return action.payload;
      case RESET_VALIDATION_PREALABLE_REDUCER:
        return initialState;
      case UPDATE_VALIDATION_PREALABLE:
        return {
          ...state,
          dateValidation: action.payload.dateValidation,
          reservesRemarques: action.payload.reservesRemarques,
          validePar: action.payload.validePar
        };  
      default:
        return state;
    }
  }
  