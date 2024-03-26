import axios from 'axios';

export const GET_VALIDATION_PREALABLE = "GET_VALIDATION_PREALABLE";
export const RESET_VALIDATION_PREALABLE_REDUCER = "RESET_VALIDATION_PREALABLE_REDUCER";
export const UPDATE_VALIDATION_PREALABLE = "UPDATE_VALIDATION_PREALABLE";


export const getValidationPrealable = (id) => {
  return (dispatch) => {
    return axios
    .get(`${process.env.REACT_APP_API_URL}/api/validation-prealable/${id}`)
    .then((res) => {
      dispatch({ type: GET_VALIDATION_PREALABLE, payload: res.data });
    })
    .catch((err) => console.log(err));
  };
};


export const resetValidationPrealableReducer = () => {
  return {
    type: RESET_VALIDATION_PREALABLE_REDUCER
  };
};

export const updateValidationPrealable = (id, info) => {
  return (dispatch) => {
      return axios({
          method: "put",
          url: `${process.env.REACT_APP_API_URL}/api/validation-prealable/${id}`,
          data: { 
            dateValidation: info.dateValidation,
            reservesRemarques: info.reservesRemarques,
            validePar: info.validePar
          }
      }).then((res) => {
          dispatch({ type: UPDATE_VALIDATION_PREALABLE, payload: info })
      }).catch((err) => console.log(err))
  }
}