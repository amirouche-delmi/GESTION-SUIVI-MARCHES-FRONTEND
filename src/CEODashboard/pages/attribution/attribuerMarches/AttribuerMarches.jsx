import "./AttribuerMarches.scss";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinearProgress } from '@mui/material';
import { Visibility } from "@material-ui/icons";
import { getAllMarche, resetMarcheReducer } from "../../../../actions/marcheActions";
import { formatDate, isEmpty } from "../../../../utils/utils";
import { resetBesoinReducer } from "../../../../actions/besoinActions";
import { resetValidationPrealableReducer } from "../../../../actions/validationPrealableActions";
import { resetCahierDesChargesReducer } from "../../../../actions/cahierDesChargesActions";
import { resetAppelDOffreReducer } from "../../../../actions/appelDOffreActions";
import { resetAttributionMarcheReducer } from "../../../../actions/attributionMarcheActions";
import { resetContratReducer } from "../../../../actions/contratActions";
import LoadingComponent from "../../../../pages/Loading/LoadingComponent";

export default function AttribuerMarches() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
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
        await dispatch(resetAttributionMarcheReducer())
        await dispatch(resetContratReducer())
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des données du marché :", error);
      }
    };    
    fetchData();
  }, [dispatch]);

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
      width: 152,
      renderCell: (params) => {
        return (
          <div className="productListItem" title={params.row.intitule}>
              {params.row.intitule}
          </div>
        );
      },
    },
    {
      field: "etape",
      headerName: "État d'avancement",
      width: 170,
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
      width: 238,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/consulter-marche/" + params.row._id}>
              <button className="consulterButton">
                <Visibility className="consulterIcon" />
                Consulter
              </button>
            </Link>
            <Link to={"/attribution-marche/" + params.row._id}>
              <button className="productListEdit">Attribuer Marché</button>
            </Link>
          </>
        );
      },
    },
  ];
  
  return (
    isEmpty(allMarcheData[0]) ? (
      <LoadingComponent />
    ) : (
    < div className="attribuer-marches-container">
        <DataGrid
          rows={allMarcheData.filter(item => ((item.ceoID === userData._id) && (item.etape === 7)))}
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
