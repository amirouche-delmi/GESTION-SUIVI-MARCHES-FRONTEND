import axios from 'axios';

export const GET_ATTRIBUTION_MARCHE = "GET_ATTRIBUTION_MARCHE";
export const RESET_ATTRIBUTION_MARCHE_REDUCER = "RESET_ATTRIBUTION_MARCHE_REDUCER";
export const UPDATE_ATTRIBUTION_MARCHE = "UPDATE_ATTRIBUTION_MARCHE";


export const getAttributionMarche = (id) => {
  return (dispatch) => {
    return axios
    .get(`${process.env.REACT_APP_API_URL}/api/attribution-marche/${id}`)
    .then((res) => {
      dispatch({ type: GET_ATTRIBUTION_MARCHE, payload: res.data });
    })
    .catch((err) => console.log(err));
  };
};


export const resetAttributionMarcheReducer = () => {
  return {
    type: RESET_ATTRIBUTION_MARCHE_REDUCER
  };
};

export const updateAttributionMarche = (id, data) => {
  return (dispatch) => {
      return axios({
          method: "put",
          url: `${process.env.REACT_APP_API_URL}/api/attribution-marche/${id}`, 
          data
        }).then((res) => {
          dispatch({ type: UPDATE_ATTRIBUTION_MARCHE, payload: data })
        }).catch((err) => console.log(err))
  }
}