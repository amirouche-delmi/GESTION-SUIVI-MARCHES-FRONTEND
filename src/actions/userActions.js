import axios from "axios";

export const GET_USER = "GET_USER";
export const UPDATE_USER = "UPDATE_USER";

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
          data: { nom: info.nom, telephone: info.telephone, email: info.email, adresse: info.adresse}
      }).then((res) => {
          dispatch({ type: UPDATE_USER, payload: info })
      }).catch((err) => console.log(err))
  }
}

