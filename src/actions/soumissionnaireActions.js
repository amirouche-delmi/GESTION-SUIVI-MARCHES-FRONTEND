import axios from 'axios';

export const GET_SOUMISSIONNAIRE = "GET_SOUMISSIONNAIRE";
export const RESET_SOUMISSIONNAIRE_REDUCER = "RESET_SOUMISSIONNAIRE_REDUCER";
export const UPDATE_SOUMISSIONNAIRE = "UPDATE_SOUMISSIONNAIRE";
export const GET_ALL_SOUMISSIONNAIRE = "GET_ALL_SOUMISSIONNAIRE";

export const getSoumissionnaire = (id) => {
  return (dispatch) => {
    return axios
    .get(`${process.env.REACT_APP_API_URL}/api/soumissionnaire/${id}`)
    .then((res) => {
      dispatch({ type: GET_SOUMISSIONNAIRE, payload: res.data });
    })
    .catch((err) => console.log(err));
  };
};


export const resetSoumissionnaireReducer = () => {
  return {
    type: RESET_SOUMISSIONNAIRE_REDUCER
  };
};

export const updateSoumissionnaire = (id, info) => {
  return (dispatch) => {
      return axios({
          method: "put",
          url: `${process.env.REACT_APP_API_URL}/api/soumissionnaire/${id}`,
          data: { 
            nom: info.nomSoumissionnaire,
            email: info.emailSoumissionnaire,
            telephone: info.telephoneSoumissionnaire,
            statut: info.statutSoumissionnaire,
          }
      }).then((res) => {
          dispatch({ type: UPDATE_SOUMISSIONNAIRE, payload: info })
      }).catch((err) => console.log(err))
  }
}

export const getAllSoumissionnaire = () => {
  return (dispatch) => {
      return axios
          .get(`${process.env.REACT_APP_API_URL}/api/soumissionnaire/`)
          .then((res) => {
              dispatch({ type: GET_ALL_SOUMISSIONNAIRE, payload: res.data.slice().sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)) })
          })
          .catch((err) => console.log(err))
  }
}