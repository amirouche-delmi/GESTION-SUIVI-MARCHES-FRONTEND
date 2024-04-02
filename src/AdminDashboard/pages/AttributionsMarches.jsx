import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import { formatDate, isEmpty } from "../../utils/utils";
import axios from "axios";
import { useSelector } from "react-redux";

export default function AttributionsMarches() {
  const [data, setData] = useState([])
  
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
      field: "commentaires",
      headerName: "Commentaires",
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
    <div className="productList">
      {(isEmpty(data[0])) ? 
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
          rows={data}
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
