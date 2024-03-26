import axios from 'axios';

export const GET_BESOIN = "GET_BESOIN";
export const RESET_BESOIN_REDUCER = "RESET_BESOIN_REDUCER";
export const UPDATE_BESOIN = "UPDATE_BESOIN";


export const getBesoin = (id) => {
  return (dispatch) => {
    return axios
    .get(`${process.env.REACT_APP_API_URL}/api/besoin/${id}`)
    .then((res) => {
      dispatch({ type: GET_BESOIN, payload: res.data });
    })
    .catch((err) => console.log(err));
  };
};


export const resetBesoinReducer = () => {
  return {
    type: RESET_BESOIN_REDUCER
  };
};

export const updateBesoin = (id, info) => {
  return (dispatch) => {
      return axios({
          method: "put",
          url: `${process.env.REACT_APP_API_URL}/api/besoin/${id}`,
          data: { 
            intitule: info.intitule,
            description: info.description,
            dateExpression: info.dateExpression,
            objectifs: info.objectifs,
            estimationCout: info.estimationCout,
            exprimePar: info.exprimePar,
          }
      }).then((res) => {
          dispatch({ type: UPDATE_BESOIN, payload: info })
      }).catch((err) => console.log(err))
  }
}