import axios from 'axios';

export const GET_CONTRAT = "GET_CONTRAT";
export const RESET_CONTRAT_REDUCER = "RESET_CONTRAT_REDUCER";
export const UPDATE_CONTRAT = "UPDATE_CONTRAT";


export const getContrat = (id) => {
  return (dispatch) => {
    return axios
    .get(`${process.env.REACT_APP_API_URL}/api/contrat/${id}`)
    .then((res) => {
      dispatch({ type: GET_CONTRAT, payload: res.data });
    })
    .catch((err) => console.log(err));
  };
};


export const resetContratReducer = () => {
  return {
    type: RESET_CONTRAT_REDUCER
  };
};

export const updateContrat = (id, info) => {
  return (dispatch) => {
      return axios({
          method: "put",
          url: `${process.env.REACT_APP_API_URL}/api/contrat/${id}`,
          data: { 
            delaiRealisation: info.delaiRealisation,
            cout: info.cout,
            statut: info.statut,
            observation: info.observation,
            signePar: info.signePar,
          }
      }).then((res) => {
          dispatch({ type: UPDATE_CONTRAT, payload: info })
      }).catch((err) => console.log(err))
  }
}