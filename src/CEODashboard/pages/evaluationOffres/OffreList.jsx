import "./OffreList.scss";
import { DataGrid } from "@material-ui/data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate, isEmpty } from "../../../utils/utils";
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { getAllOffre } from "../../../actions/offreActions";
import { Link } from "react-router-dom";
import { updateMarche } from "../../../actions/marcheActions";
import { useNavigate } from "react-router-dom";

export default function OffreList() {
  const dispatch = useDispatch();
  const marcheData = useSelector((state) => state.marcheReducer);
  const allOffreData = useSelector((state) => state.allOffreReducer);
  const allSoumissionnaireData = useSelector((state) => state.allSoumissionnaireReducer);
  const navigate = useNavigate();

  useEffect(() => {    
    const fetchData = async () => {
      try {       
        await dispatch(getAllOffre());                           
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des données: ", error);
      }
    };    
    fetchData();
  }, []);

  const handleAttribuerMarche = async () => {
    const allHaveNote = allOffreData
    .filter(item => item.marcheID === marcheData._id) 
    .map(offre => !!offre.noteObtenue) // Convertissez la noteObtenue en booléen pour chaque offre
    .every(hasNote => hasNote); // Vérifiez si toutes les offres ont une noteObtenue
    
    if (allHaveNote) {
      await dispatch(updateMarche(marcheData._id, { etape: 7 }));
      navigate(`/attribution-marche/${marcheData._id}`);
    } else {
      Swal.fire({
        title: "Évaluation des offres requise !",
        text: "Il est nécessaire d'évaluer toutes les offres avant de passer à l'étape d'attribution du marché.",
        icon: "warning",
      });
    }
  }

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row._id}
          </div>
        );
      },
    },
    {
      field: "DetailsProposition",
      headerName: "Details Proposition",
      width: 330,
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
      width: 180,
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
      width: 180,
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
            <Link to={"/evaluer-offre/" + params.row._id}>
              <button className="productListEdit">Évaluer</button>
            </Link>
          </>
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
  ];
  
  return ( 
    !isEmpty(allOffreData[0]) && !isEmpty(allSoumissionnaireData[0]) &&
    <div className="offre-list-evaluation">
      <DataGrid
        rows={allOffreData.filter(item => item.marcheID === marcheData._id)}
        disableSelectionOnClick
        columns={columns}
        pageSize={5}
        checkboxSelection
        getRowId={(row) => row['_id']}
        getRowClassName={(params) => {
          if (params.row['noteObtenue']) {
            return 'evaluated-offre';
          }
          return 'unevaluated-offre';
        }}
        className="data-grid"
      />
      <div className="attribuer-marche-button-container">
        <button className="attribuer-marche-button" onClick={handleAttribuerMarche}>Attribuer le marché ➔</button>
      </div>
    </div>
  )
}
