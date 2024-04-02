import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import { formatDate, isEmpty } from "../../utils/utils";
import axios from "axios";
import { useSelector } from "react-redux";

export default function CahiersDesCharges() {
  const [data, setData] = useState([])
  const userData = useSelector((state) => state.userReducer);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/cahier-des-charges`);
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
      field: "intitule",
      headerName: "Intitule",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="productListItem">
              {params.row.intitule}
          </div>
        );
      },
    },
    {
      field: "descriptionSuccincte",
      headerName: "Description Succincte",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="productListItem">
              {params.row.descriptionSuccincte}
          </div>
        );
      },
    },
    {
      field: "validePar",
      headerName: "Validé Par",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="productListItem">
              {params.row.validePar}
          </div>
        );
      },
    },
    {
      field: "participants",
      headerName: "Participants",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.participants.length > 1 ? (
              <span>{params.row.participants.map((v, index) => (index === 0 ? v : ', ' + v))}</span>
              ) : (
                <span>{params.row.participants[0]}</span>
                )}
          </div>
        );
      },
    },
    {
      field: "exemplaireNumerique",
      headerName: "Exemplaire Numerique",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="productListItem">
              <a className="detail-content" href={`${process.env.REACT_APP_API_URL}/api/uploads/cahierDesCharges/${params.row._id}.pdf`} target="_blank" rel="noopener noreferrer">Ouvrir le fichier</a>
          </div>
        );
      },
    },
    {
      field: "dateFinalisation",
      headerName: "Date Finalisation",
      width: 155,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {formatDate(params.row.dateFinalisation)}
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
