import "./OffreList.scss";
import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../../../utils/utils";
import { toast } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import { getAllOffre } from "../../../../actions/offreActions";
import { Link } from "react-router-dom";
import { getMarche, updateMarche } from "../../../../actions/marcheActions";
import axios from "axios";
import { getAttributionMarche, updateAttributionMarche } from "../../../../actions/attributionMarcheActions";

export default function OffreList() {
  const dispatch = useDispatch();
  const marcheData = useSelector((state) => state.marcheReducer);
  const allOffreData = useSelector((state) => state.allOffreReducer);
  const allSoumissionnaireData = useSelector((state) => state.allSoumissionnaireReducer);

  const attributionMarcheData = useSelector((state) => state.attributionMarcheReducer);
  const [commentaire, setCommentaire] = useState(attributionMarcheData.commentaire);
  const [PVCommission, setPVCommission] = useState();

  useEffect(() => {    
    const fetchData = async () => {
      try {                                
        await dispatch(getAllOffre()); 
        setCommentaire(attributionMarcheData.commentaire ?? '');
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des données: ", error);
      }
    };    
    fetchData();
  }, [dispatch, attributionMarcheData.commentaire]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("marcheID", marcheData._id);
      formData.append("dmID", marcheData.dmID);
      formData.append("commentaire", commentaire);
      formData.append("file", PVCommission);

      if (marcheData.attributionMarcheID) {
        await dispatch(updateAttributionMarche(marcheData.attributionMarcheID, formData));
        toast.success("Enregistrement réussi.", {
          duration: 6000,
          position: "top-center",
        });
      } else {
          await axios.post(`${process.env.REACT_APP_API_URL}/api/attribution-marche`, formData);
          await dispatch(getMarche(marcheData._id));
          await dispatch(getAttributionMarche(marcheData.attributionMarcheID))
          toast.success("Enregistrement réussi.", {
            duration: 6000,
            position: "top-center"
          });
      }      
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite lors de l'enregistrement !", {
        duration: 6000,
        position: "top-center",
      });
    }
  };

  const handelClick = async (e) => {
    e.preventDefault();
    const allHaveResult = allOffreData
    .filter(item => item.marcheID === marcheData._id) 
    .map(offre => !!offre.resultatEvaluation) // Convertissez la noteObtenue en booléen pour chaque offre
    .every(hasResult => hasResult); // Vérifiez si toutes les offres ont une noteObtenue
    
    if (allHaveResult) {
      if(marcheData.attributionMarcheID) {
        await dispatch(updateMarche(marcheData._id, { etape: 8 }));
        await dispatch(getMarche(marcheData._id))
      } else {
        Swal.fire({
          title: "Attribution de marché requise !",
          text: "Il est nécessaire de compléter les informations relatives à l'attribution du marché avant de passer à l'étape de signature de contrat.",
          icon: "warning",
        });        
      }
    } else {
      Swal.fire({
        title: "Choix de la meilleure offre requis !",
        text: "Il est nécessaire d'attribuer une réponse à toutes les offres et de choisir la meilleure avant de passer à l'étape de signature de contrat.",
        icon: "warning",
      });      
    }
  }

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 120,
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
      width: 275,
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
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/attribuer-marche/" + params.row._id}>
              <button className="productListEdit">Éditer</button>
            </Link>
          </>
        );
      },
    },
    {
      field: "nomSoumissionnaire",
      headerName: "Nom Soumissionnaire",
      width: 160,
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
      width: 190,
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
      width: 160,
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
  ];

  return (
    !isEmpty(allOffreData[0]) && !isEmpty(allSoumissionnaireData[0]) && (
    marcheData.etape === 7 ? (
      <div className="offre-list-attribution">
        <DataGrid
          rows={allOffreData.filter(item => item.marcheID === marcheData._id).sort((a, b) => (b.noteObtenue || 0) - (a.noteObtenue || 0))}
          disableSelectionOnClick
          columns={columns}
          pageSize={5}
          checkboxSelection
          getRowId={(row) => row['_id']}
          getRowClassName={(params) => {
            if (params.row['resultatEvaluation']) {
              return 'updated-offre';
            }
            return 'not-updated-offre';
          }}
          className="data-grid"
          autoHeight
          />
        {/* --------------------------------------------- */}
        <form action="" onSubmit={handleRegister}>    
          <div className="form-item">
            <label htmlFor="commentaire">Commentaire :</label>
            <input type="text" id="commentaire" name="commentaire" placeholder="Entrez un commentraire"
              onChange={(e) => setCommentaire(e.target.value)}
              value={commentaire}
            />
          </div>        
          <div className="form-item">
            {marcheData.attributionMarcheID ? (
              <>
              <label htmlFor="PVCommission">PVCommission : <a href={`${process.env.REACT_APP_API_URL}/api/uploads/attributionMarche/${marcheData.attributionMarcheID}.pdf`} target="_blank" rel="noopener noreferrer">consulter-pdf</a></label>
              <input type="file" id="PVCommission" name="PVCommission" accept=".pdf"
                onChange={(e) => { setPVCommission(e.target.files[0]) }} 
              />
            </>
            ) : (
              <>
              <label htmlFor="PVCommission">PVCommission :</label>
              <input type="file" id="PVCommission" name="PVCommission" accept=".pdf" required
                onChange={(e) => { setPVCommission(e.target.files[0]) }} 
                />
            </>
            )}  
          </div> 
          <div className="submit-contrat-container">
            <input type="submit" className="submit-button" value="Enregistrer" />    
            <button className="contrat-button" onClick={handelClick}>Signer Contrat ➔</button>
          </div>    
        </form>
      </div>
    ) : (
      <div className="contrat-container">
        <p>
          La direction métier (DM) qui a ajouté le marché sera chargée de compléter les 
          informations relatives à la signature du contrat pour ce marché.
        </p>
    </div> 
    )
  ))
}
  