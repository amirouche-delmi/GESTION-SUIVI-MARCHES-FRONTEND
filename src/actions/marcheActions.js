import axios from 'axios';

export const GET_MARCHE = "GET_MARCHE";
export const RESET_MARCHE_REDUCER = "RESET_MARCHE_REDUCER";
export const UPDATE_MARCHE = "UPDATE_MARCHE";
export const GET_ALL_MARCHE = "GET_ALL_MARCHE";
export const DELETE_MARCHE = "DELETE_MARCHE";


export const getMarche = (id) => {
  return (dispatch) => {
    return axios
    .get(`${process.env.REACT_APP_API_URL}/api/marche/${id}`)
    .then((res) => {
      dispatch({ type: GET_MARCHE, payload: res.data });
    })
    .catch((err) => console.log(err));
  };
};


export const resetMarcheReducer = () => {
  return {
    type: RESET_MARCHE_REDUCER
  };
};

export const updateMarche = (id, info) => {
  return (dispatch) => {
      return axios({
          method: "put",
          url: `${process.env.REACT_APP_API_URL}/api/marche/${id}`,
          data: { 
            intitule: info.intitule,
            description: info.description,
            ceoID: info.ceoID,
            etape: info.etape,
          }
      }).then((res) => {
          dispatch({ type: UPDATE_MARCHE, payload: info })
      }).catch((err) => console.log(err))
  }
}

export const getAllMarche = () => {
  return (dispatch) => {
      return axios
          .get(`${process.env.REACT_APP_API_URL}/api/marche/`)
          .then((res) => {
              dispatch({ type: GET_ALL_MARCHE, payload: res.data.slice().sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)) })
          })
          .catch((err) => console.log(err))
  }
}

export const deleteMarche = (id) => {
    return (dispatch) => {
        return axios({
            method: 'delete',
            url: `${process.env.REACT_APP_API_URL}/api/marche/` + id,
        })
            .then((res) => {
                dispatch({ type: DELETE_MARCHE, payload: { id } })
            })
            .catch((err) => console.log(err))
    }
}
