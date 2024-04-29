import './style.scss'
import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import { formatDate, isEmpty } from "../../../utils/utils";
import axios from "axios";
import { useSelector } from "react-redux";
import LoadingComponent from '../../../pages/Loading/LoadingComponent';

export default function AttributionsMarches() {
  const [data, setData] = useState([])
  const userData = useSelector((state) => state.userReducer);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/attribution-marche`);
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
      field: "commentaire",
      headerName: "Commentaire",
      width: 330,
      renderCell: (params) => {
        return (
          <div className="productListItem">
              {params.row.commentaire}
          </div>
        );
      },
    },
    {
      field: "PVCommission",
      headerName: "PVCommission",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="productListItem">
              <a className="detail-content" href={`${process.env.REACT_APP_API_URL}/api/uploads/attributionMarche/${params.row._id}.pdf`} target="_blank" rel="noopener noreferrer">Ouvrir le fichier</a>
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
