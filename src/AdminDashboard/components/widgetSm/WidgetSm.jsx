import { useEffect } from "react";
import "./widgetSm.scss";
import { useDispatch, useSelector } from "react-redux";
import { LinearProgress } from "@mui/material";
import { DeleteOutline, Visibility } from "@material-ui/icons";
import { toast } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { deleteMarche } from "../../../actions/marcheActions";
import { Link } from "react-router-dom";
import { isEmpty } from "../../../utils/utils";
import { deleteUser, getAllUser } from "../../../actions/userActions";
import axios from "axios";

export default function WidgetSm() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.allUserReducer)
  
  useEffect(() => {
    dispatch(getAllUser())
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer cet utilisateur ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(id));
        toast.success("L'utilisateur a été supprimé avec succès.", {
          duration: 6000,
          position: "bottom-right"
        });
      }
    })
  }

  const valide = async (id) => {
    await axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/api/user/${id}`,
      data: {
        valide: false,
      },
    })
    .then((res) => {
      dispatch(getAllUser())
    })
    .catch((err) => console.log(err));
  }
  const nonValide = async (id) => {
    await axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/api/user/${id}`,
      data: {
        valide: true,
      },
    })
    .then((res) => {
      dispatch(getAllUser())
    })
    .catch((err) => console.log(err));
  }

  return (
    <div className="widgetSm">
      <h3 className="widgetLgTitle">Nouveaux Utilisateurs</h3>
      <div className="widgetLgContent">
        <div className="widgetLgItem">
          <div className="widgetLgItemTitle">Nom</div>
          <div className="widgetLgItemTitle actions">Actions</div>
        </div>
        {!isEmpty(users[0]) && users.slice(0, 4).map((user) => (
          <div key={user._id} className="widgetLgItem">
            <div className="widgetLgItemValue">{user.nom}</div>
            <div className="widgetLgItemValue actions">
              {user.valide ? (
                <button className="compteValide" onClick={() => valide(user._id)}>Valide</button>
              ) : (
                <button className="compteNonValide" onClick={() => nonValide(user._id)}>Invalide</button>
              )}
              <DeleteOutline
                className="widgetLgDeleteIcon"
                onClick={() => handleDelete(user._id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
