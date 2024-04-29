import './style.scss'
import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import { formatDate, isEmpty } from "../../../utils/utils";
import axios from "axios";
import { useSelector } from "react-redux";
import LoadingComponent from '../../../pages/Loading/LoadingComponent';

export default function Offres() {
  const [data, setData] = useState([])
  const userData = useSelector((state) => state.userReducer);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/offre`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


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
    isEmpty(data[0]) ? (
      <LoadingComponent />
    ) : (
      <div className="data-grid-container">
        <DataGrid
          rows={data.filter(item => item.dmID === userData._id)}
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
