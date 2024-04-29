import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { formatDate, isEmpty } from "../../../utils/utils";
import 'react-toastify/dist/ReactToastify.css';
import "./ConsulterOffresList.scss";

export default function OffreList() {
  const dispatch = useDispatch();
  const marcheData = useSelector((state) => state.marcheReducer);
  const allOffreData = useSelector((state) => state.allOffreReducer);
  const allSoumissionnaireData = useSelector((state) => state.allSoumissionnaireReducer);

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
      field: "resultatEvaluation",
      headerName: "Resultat Evaluation",
      width: 150,
      renderCell: (params) => {
        return (
          <div className={"productListItem " + params.row.resultatEvaluation}>
            {params.row.resultatEvaluation || "---"}
          </div>
        );
      },
    },
    {
      field: "noteObtenue",
      headerName: "Note Obtenue",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="productListItem">
              {(params.row.noteObtenue || "---") + " / 100"}
          </div>
        );
      },
    },
    {
      field: "motif",
      headerName: "Motif",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="productListItem">
              {params.row.motif || "---"}
          </div>
        );
      },
    },
    {
      field: "membresCommission",
      headerName: "Membres Commission",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
              {params.row.membresCommission[0] || "---"}
          </div>
        );
      },
    },
    {
      field: "nomSoumissionnaire",
      headerName: "Nom Soumissionnaire",
      width: 200,
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
      width: 200,
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
      width: 200,
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
  ];
  
  return (
    <div className="consulterOffreList">
      {(isEmpty(allOffreData[0]) || isEmpty(allSoumissionnaireData[0])) ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
          <p style={{ 
            textAlign: "center", 
            fontSize: "1.1rem",
            lineHeight: "1.5", 
          }}>
            Chargement...
          </p>
        </div>
      ) : (
        <DataGrid
          rows={allOffreData.filter(item => item.marcheID === marcheData._id)}
          disableSelectionOnClick
          columns={columns}
          pageSize={5}
          checkboxSelection
          getRowId={(row) => row['_id']}
          className="data-grid"
        />
      )}
    </div>
  )
}
