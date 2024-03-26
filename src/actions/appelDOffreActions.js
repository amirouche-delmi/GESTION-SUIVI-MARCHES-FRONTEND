import axios from 'axios';

export const GET_APPEL_D_OFFRE = "GET_APPEL_D_OFFRE";
export const RESET_APPEL_D_OFFRE_REDUCER = "RESET_APPEL_D_OFFRE_REDUCER";
export const UPDATE_APPEL_D_OFFRE = "UPDATE_APPEL_D_OFFRE";


export const getAppelDOffre = (id) => {
  return (dispatch) => {
    return axios
    .get(`${process.env.REACT_APP_API_URL}/api/appel-d-offre/${id}`)
    .then((res) => {
      dispatch({ type: GET_APPEL_D_OFFRE, payload: res.data });
    })
    .catch((err) => console.log(err));
  };
};


export const resetAppelDOffreReducer = () => {
  return {
    type: RESET_APPEL_D_OFFRE_REDUCER
  };
};

export const updateAppelDOffre = (id, info) => {
  return (dispatch) => {
      return axios({
          method: "put",
          url: `${process.env.REACT_APP_API_URL}/api/appel-d-offre/${id}`,
          data: { 
            dateLancement: info.dateLancement,
            dateCloture: info.dateCloture,
            mediasUtilises: info.mediasUtilises,
            redacteurs: info.redacteurs
          }
      }).then((res) => {
          dispatch({ type: UPDATE_APPEL_D_OFFRE, payload: info })
      }).catch((err) => console.log(err))
  }
}