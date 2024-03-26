import axios from 'axios';

export const GET_CAHIER_DES_CHARGES = "GET_CAHIER_DES_CHARGES";
export const RESET_CAHIER_DES_CHARGES_REDUCER = "RESET_CAHIER_DES_CHARGES_REDUCER";
export const UPDATE_CAHIER_DES_CHARGES = "UPDATE_CAHIER_DES_CHARGES";


export const getCahierDesCharges = (id) => {
  return (dispatch) => {
    return axios
    .get(`${process.env.REACT_APP_API_URL}/api/cahier-des-charges/${id}`)
    .then((res) => {
      dispatch({ type: GET_CAHIER_DES_CHARGES, payload: res.data });
    })
    .catch((err) => console.log(err));
  };
};


export const resetCahierDesChargesReducer = () => {
  return {
    type: RESET_CAHIER_DES_CHARGES_REDUCER
  };
};

export const updateCahierDesCharges = (id, data) => {
  return (dispatch) => {
      return axios({
          method: "put",
          url: `${process.env.REACT_APP_API_URL}/api/cahier-des-charges/${id}`, 
          data
        }).then((res) => {
            dispatch({ type: UPDATE_CAHIER_DES_CHARGES, payload: data })
        }).catch((err) => console.log(err))
  }
}