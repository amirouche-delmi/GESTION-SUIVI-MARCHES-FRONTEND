import "./GererUsers.scss";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate, isEmpty } from "../../../utils/utils";
import { toast } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import axios from "axios";
import { deleteUser, getAllUser } from "../../../actions/userActions";
import LoadingComponent from "../../../pages/Loading/LoadingComponent";

export default function GererUsers() {
  const dispatch = useDispatch()
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
      width: 160,
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
      width: 140,
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
      width: 140,
      renderCell: (params) => {
        return (
          <>
            {params.row.valide ? (
              <button className="compteValide" onClick={() => valide(params.row._id)}>Valide</button>
            ) : (
              <button className="compteNonValide" onClick={() => nonValide(params.row._id)}>Invalide</button>
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
    isEmpty(allUserData[0]) ? (
      <LoadingComponent />
    ) : (
      <div className="gerer-users-container">
        <DataGrid
          rows={allUserData}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
          getRowId={(row) => row['_id']}
          className="data-grid"
          getRowClassName={(params) => 'row-class'}
        />
      </div>
    ) 
  )
}
