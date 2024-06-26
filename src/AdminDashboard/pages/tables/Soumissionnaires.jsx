import './style.scss'
import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import { formatDate, isEmpty } from "../../../utils/utils";
import axios from "axios";
import LoadingComponent from '../../../pages/Loading/LoadingComponent';

export default function Soumissionnaires() {
  const [data, setData] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/soumissionnaire`);
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
      field: "nom",
      headerName: "Nom",
      width: 150,
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
      width: 180,
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
      headerName: "Telephone",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.telephone}
          </div>
        );
      },
    },
    {
      field: "statut",
      headerName: "Statut",
      width: 210,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.statut}
          </div>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Créé le",
      width: 160,
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
      width: 160,
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
          rows={data}
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
