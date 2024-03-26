import {
    GET_BESOIN, 
    RESET_BESOIN_REDUCER,
    UPDATE_BESOIN,
  } from "../actions/besoinActions";
  
  const initialState = {};
  
  export default function besoinReducer(state = initialState, action) {
    switch (action.type) {
      case GET_BESOIN:
        return action.payload;
      case RESET_BESOIN_REDUCER:
        return initialState;
      case UPDATE_BESOIN:
        return {
          ...state,
          intitule: action.payload.intitule,
          description: action.payload.description,
          dateExpression: action.payload.dateExpression,
          objectifs: action.payload.objectifs,
          estimationCout: action.payload.estimationCout,
          exprimePar: action.payload.exprimePar,
        };  
      default:
        return state;
    }
  }
  