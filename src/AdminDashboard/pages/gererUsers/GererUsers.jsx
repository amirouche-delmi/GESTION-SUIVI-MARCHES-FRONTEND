import "./GererUsers.scss";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMarche, getAllMarche, resetMarcheReducer } from "../../../actions/marcheActions";
import { formatDate, isEmpty } from "../../../utils/utils";
import { LinearProgress } from '@mui/material';
import { UidContext } from "../../../contexts/AppContext";
import { toast } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { Visibility } from "@material-ui/icons";
import { resetBesoinReducer } from "../../../actions/besoinActions";
import { resetValidationPrealableReducer } from "../../../actions/validationPrealableActions";
import { resetCahierDesChargesReducer } from "../../../actions/cahierDesChargesActions";
import { resetAppelDOffreReducer } from "../../../actions/appelDOffreActions";
import { resetSoumissionnaireReducer } from "../../../actions/soumissionnaireActions";
import axios from "axios";
import { getAllUser, updateUser } from "../../../actions/userActions";

export default function GererUsers() {
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.userReducer);
  const allUserData = useSelector((state) => state.allUserReducer);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllUser());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer ce marché ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteMarche(id));
        toast.success("Le marché a été supprimé avec succès.", {
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

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row._id}
          </div>
        );
      },
    },
    {
      field: "nom",
      headerName: "Nom",
      width: 155,
      renderCell: (params) => {
        return (
          <div className="productListItem">
              {params.row.nom}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 155,
      renderCell: (params) => {
        return (
          <div className="productListItem">
              {params.row.email}
          </div>
        );
      },
    },
    {
      field: "telephone",
      headerName: "Téléphone",
      width: 125,
      renderCell: (params) => {
        return (
          <div className="productListItem">
              {params.row.telephone}
          </div>
        );
      },
    },
    {
      field: "role",
      headerName: "Rôle",
      width: 110,
      renderCell: (params) => {
        return (
          <div className="productListItem">
              {params.row.role}
          </div>
        );
      },
    },
    {
      field: "adresse",
      headerName: "Adresse",
      width: 155,
      renderCell: (params) => {
        return (
          <div className="productListItem">
              {params.row.adresse}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <>
            {params.row.valide ? (
              <button className="compteValide" onClick={() => valide(params.row._id)}>Valide</button>
            ) : (
              <button className="compteNonValide" onClick={() => nonValide(params.row._id)}>Non-Valide</button>
            )}
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Créé le",
      width: 155,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {formatDate(params.row.createdAt)}
          </div>
        );
      },
    },
    {
      field: "updatedAt",
      headerName: "Mis à jour le",
      width: 155,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {formatDate(params.row.updatedAt)}
          </div>
        );
      },
    },
  ];
  
  return (
    <div className="productList">
      {(isEmpty(allUserData[0])) ? 
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
          <p style={{ 
            textAlign: "center", 
            fontSize: "1.1rem",
            lineHeight: "1.5", 
          }}>
            Chargement...
          </p>
        </div> :
        <DataGrid
          rows={allUserData.filter(item => item._id !== userData._id)}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
          getRowId={(row) => row['_id']}
          className="data-grid"
        />
      }
    </div>
  )
}
