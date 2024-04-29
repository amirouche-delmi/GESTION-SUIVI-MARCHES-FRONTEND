import { DataGrid } from "@material-ui/data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate, isEmpty } from "../../../../utils/utils";
import { toast } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { deleteOffre, getAllOffre } from "../../../../actions/offreActions";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@material-ui/icons";

export default function OffreList() {
  const dispatch = useDispatch();
  const marcheData = useSelector((state) => state.marcheReducer);
  const allOffreData = useSelector((state) => state.allOffreReducer);
  const allSoumissionnaireData = useSelector((state) => state.allSoumissionnaireReducer);

  useEffect(() => {    
    const fetchData = async () => {
      try {       
        await dispatch(getAllOffre());                           
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des données du marché :", error);
      }
    };    
    fetchData();
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer cet offre ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteOffre(id));
        toast.success("L'offre a été supprimé avec succès.", {
          duration: 6000,
          position: "bottom-right"
      });
      }
    });
  };

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
      field: "nomSoumissionnaire",
      headerName: "Nom Soumissionnaire",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="productListItem">
              {
              allSoumissionnaireData.find(s => s._id === params.row.soumissionnaireID).nom || "---"
            }
          </div>
        );
      },
    },    
    {
      field: "emailSoumissionnaire",
      headerName: "Email Soumissionnaire",
      width: 190,
      renderCell: (params) => {
        return (
          <div className="productListItem">
              {
              allSoumissionnaireData.find(s => s._id === params.row.soumissionnaireID).email || "---"
            }
          </div>
        );
      },
    },
    {
      field: "telephoneSoumissionnaire",
      headerName: "Téléphone Soumissionnaire",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="productListItem">
              {
              allSoumissionnaireData.find(s => s._id === params.row.soumissionnaireID).telephone || "---"
            }
          </div>
        );
      },
    },
    {
      field: "statutSoumissionnaire",
      headerName: "Statut Soumissionnaire",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
              {
              allSoumissionnaireData.find(s => s._id === params.row.soumissionnaireID).statut || "---"
            }
          </div>
        );
      },
    },
    {
      field: "DetailsProposition",
      headerName: "Details Proposition",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem" title={params.row.detailsProposition}>
              {params.row.detailsProposition}
          </div>
        );
      },
    },    
    {
      field: "createdAt",
      headerName: "Créé le",
      width: 165,
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
      width: 165,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {formatDate(params.row.updatedAt)}
          </div>
          );
        },
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/editer-offre/" + params.row._id}>
              <button className="productListEdit">Éditer</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  
  return (
    <div className="OffreList">
      {(!isEmpty(allOffreData[0]) && !isEmpty(allSoumissionnaireData[0])) &&
        <DataGrid
          rows={allOffreData.filter(item => item.marcheID === marcheData._id)}
          disableSelectionOnClick
          columns={columns}
          pageSize={5}
          checkboxSelection
          getRowId={(row) => row['_id']}
          className="data-grid"
        />
      }
    </div>
  )
}
