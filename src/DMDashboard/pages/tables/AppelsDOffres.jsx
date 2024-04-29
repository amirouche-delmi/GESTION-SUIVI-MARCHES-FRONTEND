import './style.scss'
import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import { formatDate, isEmpty } from "../../../utils/utils";
import axios from "axios";
import { useSelector } from "react-redux";
import LoadingComponent from '../../../pages/Loading/LoadingComponent';

export default function AppelsDOffres() {
  const [data, setData] = useState([])
  const userData = useSelector((state) => state.userReducer);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/appel-d-offre`);
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
      field: "dateLancement",
      headerName: "Date Lancement",
      width: 155,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {formatDate(params.row.dateLancement)}
          </div>
          );
      },
    },
    {
      field: "dateCloture",
      headerName: "Date Cloture",
      width: 155,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {formatDate(params.row.dateCloture)}
          </div>
        );
      },
    },
    {
      field: "mediasUtilises",
      headerName: "Medias Utilisés",
      width: 185,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.mediasUtilises.length > 1 ? (
              <span>{params.row.mediasUtilises.map((v, index) => (index === 0 ? v : ', ' + v))}</span>
            ) : (
              <span>{params.row.mediasUtilises[0]}</span>
            )}
          </div>
        );
      },
    },
    {
      field: "redacteurs",
      headerName: "Redacteurs",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.redacteurs.length > 1 ? (
              <span>{params.row.redacteurs.map((v, index) => (index === 0 ? v : ', ' + v))}</span>
            ) : (
              <span>{params.row.redacteurs[0]}</span>
            )}
          </div>
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
