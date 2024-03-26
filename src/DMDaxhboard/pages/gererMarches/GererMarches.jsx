import "./GererMarches.scss";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
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

export default function GererMarches() {
  const uid = useContext(UidContext)
  const dispatch = useDispatch();
  const allMarcheData = useSelector((state) => state.allMarcheReducer);
  
  useEffect(() => {    
    const fetchData = async () => {
      try {
        await dispatch(getAllMarche());        
        await dispatch(resetMarcheReducer());
        await dispatch(resetBesoinReducer());
        await dispatch(resetValidationPrealableReducer());
        await dispatch(resetCahierDesChargesReducer());
        await dispatch(resetAppelDOffreReducer());
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des données du marché :", error);
      }
    };    
    fetchData();
  }, [dispatch]);

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
      field: "marche",
      headerName: "Marché",
      width: 155,
      renderCell: (params) => {
        return (
          <div className="productListItem">
              {params.row.intitule}
          </div>
        );
      },
    },
    {
      field: "etape",
      headerName: "État d'avancement",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <div className="linearProgressContainer">
              <LinearProgress variant="determinate" value={params.row.etape * 10} className="linearProgress" />
              <div>{params.row.etape * 10}%</div>
            </div>
          </div>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Créé le",
      width: 150,
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
      width: 150,
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
      width: 205,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/consulter-marche/" + params.row._id}>
              <button className="consulterButton">
                <Visibility className="consulterIcon" />
                Consulter
            </button>
            </Link>
            <Link to={"/editer-marche/" + params.row._id}>
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
    <div className="productList">
      {(isEmpty(allMarcheData[0])) ? 
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
          rows={allMarcheData.filter(item => item.dmID === uid)}
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
