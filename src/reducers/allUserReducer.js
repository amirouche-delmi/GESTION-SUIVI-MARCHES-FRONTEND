import { DELETE_USER, GET_ALL_USER } from "../actions/userActions";

const initialState = {};

export default function allUserReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USER:
      return action.payload
    case DELETE_USER:
      return state.filter((user) => user._id !== action.payload.id);
    default: 
      return state;
  }
}