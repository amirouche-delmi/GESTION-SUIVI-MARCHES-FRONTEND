import { 
  GET_ALL_SOUMISSIONNAIRE 
} from "../actions/soumissionnaireActions";

const initialState = {};

export default function allMarcheReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SOUMISSIONNAIRE:
      return action.payload
    default: 
      return state;
  }
}
  