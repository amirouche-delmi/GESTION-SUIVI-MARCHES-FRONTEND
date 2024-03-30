import axios from "axios";

export const GET_USER = "GET_USER";
export const UPDATE_USER = "UPDATE_USER";
export const GET_ALL_USER = "GET_ALL_USER";
export const DELETE_USER = "DELETE_USER";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const updateUser = (uId, info) => {
  return (dispatch) => {
      return axios({
          method: "put",
          url: `${process.env.REACT_APP_API_URL}/api/user/${uId}`,
          data: { nom: info.nom, telephone: info.telephone, email: info.email, adresse: info.adresse, valide: info.valide}
      }).then((res) => {
          dispatch({ type: UPDATE_USER, payload: info })
      }).catch((err) => console.log(err))
  }
}

export const getAllUser = () => {
  return (dispatch) => {
      return axios
          .get(`${process.env.REACT_APP_API_URL}/api/user/`)
          .then((res) => {
              dispatch({ type: GET_ALL_USER, payload: res.data.slice().sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)) })
          })
          .catch((err) => console.log(err))
  }
}

export const deleteUser = (id) => {
    return (dispatch) => {
        return axios({
            method: 'delete',
            url: `${process.env.REACT_APP_API_URL}/api/user/` + id,
        })
            .then((res) => {
                dispatch({ type: DELETE_USER, payload: { id } })
            })
            .catch((err) => console.log(err))
    }
}

