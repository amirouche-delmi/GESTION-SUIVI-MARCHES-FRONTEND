import axios from 'axios';

export const GET_OFFRE = "GET_OFFRE";
export const RESET_OFFRE_REDUCER = "RESET_OFFRE_REDUCER";
export const UPDATE_OFFRE = "UPDATE_OFFRE";
export const GET_ALL_OFFRE = "GET_ALL_OFFRE";
export const RESET_ALL_OFFRE_REDUCER = "RESET_ALL_OFFRE_REDUCER";
export const DELETE_OFFRE = "DELETE_OFFRE";

export const getOffre = (id) => {
  return (dispatch) => {
    return axios
    .get(`${process.env.REACT_APP_API_URL}/api/offre/${id}`)
    .then((res) => {
      dispatch({ type: GET_OFFRE, payload: res.data });
    })
    .catch((err) => console.log(err));
  };
};


export const resetOffreReducer = () => {
  return {
    type: RESET_OFFRE_REDUCER
  };
};

export const resetAllOffreReducer = () => {
  return {
    type: RESET_ALL_OFFRE_REDUCER
  };
};

export const updateOffre = (id, info) => {
  return (dispatch) => {
      return axios({
          method: "put",
          url: `${process.env.REACT_APP_API_URL}/api/offre/${id}`,
          data: { 
            detailsProposition: info.detailsProposition,
            noteConformite: info.noteConformite, 
            noteCout: info.noteCout, 
            noteExperience: info.noteExperience, 
            noteInnovation: info.noteInnovation,
            noteObtenue: info.noteObtenue,
            membresCommission: info.membresCommission,
            resultatEvaluation: info.resultatEvaluation,
            motif: info.motif,
          }
      }).then((res) => {
          dispatch({ type: UPDATE_OFFRE, payload: info })
      }).catch((err) => console.log(err))
  }
}

export const getAllOffre = () => {
  return (dispatch) => {
      return axios
          .get(`${process.env.REACT_APP_API_URL}/api/offre/`)
          .then((res) => {
              dispatch({ type: GET_ALL_OFFRE, payload: res.data.slice().sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)) })
          })
          .catch((err) => console.log(err))
  }
}

export const deleteOffre = (id) => {
    return (dispatch) => {
        return axios({
            method: 'delete',
            url: `${process.env.REACT_APP_API_URL}/api/offre/` + id,
        })
            .then((res) => {
                dispatch({ type: DELETE_OFFRE, payload: { id } })
            })
            .catch((err) => console.log(err))
    }
}