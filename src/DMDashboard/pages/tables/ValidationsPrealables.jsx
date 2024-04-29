import './style.scss'
import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import { formatDate, isEmpty } from "../../../utils/utils";
import axios from "axios";
import { useSelector } from "react-redux";
import LoadingComponent from "../../../pages/Loading/LoadingComponent";

export default function ValidationsPrealables() {
  const [data, setData] = useState([])
  const userData = useSelector((state) => state.userReducer);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/validation-prealable`);
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
      field: "reservesRemarques",
      headerName: "Reserves Remarques",
      width: 185,
      renderCell: (params) => {
        return (
          <div className="productListItem">
              {params.row.reservesRemarques}
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
            {params.row.validePar.length > 1 ? (
              <span>{params.row.validePar.map((v, index) => (index === 0 ? v : ', ' + v))}</span>
            ) : (
              <span>{params.row.validePar[0]}</span>
            )}
          </div>
        );
      },
    },
    {
      field: "dateValidation",
      headerName: "Date Validation",
      width: 155,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {formatDate(params.row.dateValidation)}
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
