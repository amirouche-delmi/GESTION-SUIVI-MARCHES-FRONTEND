import "./widgetLg.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { LinearProgress } from "@mui/material";
import { dateParser, isEmpty } from "../../../../../utils/utils";
import { DeleteOutline, Visibility } from "@material-ui/icons";
import { toast } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { deleteMarche, resetMarcheReducer } from "../../../../../actions/marcheActions";
import { Link } from "react-router-dom";
import { resetBesoinReducer } from "../../../../../actions/besoinActions";
import { resetValidationPrealableReducer } from "../../../../../actions/validationPrealableActions";
import { resetCahierDesChargesReducer } from "../../../../../actions/cahierDesChargesActions";
import { resetAppelDOffreReducer } from "../../../../../actions/appelDOffreActions";
import { resetContratReducer } from "../../../../../actions/contratActions";
import { resetAttributionMarcheReducer } from "../../../../../actions/attributionMarcheActions";

export default function WidgetLg() {

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const [marches, setMarches] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/marche`);
        setMarches(response.data.filter(item => item.dmID === userData._id).slice(0, 5));
       
        await dispatch(resetMarcheReducer());
        await dispatch(resetBesoinReducer());
        await dispatch(resetValidationPrealableReducer());
        await dispatch(resetCahierDesChargesReducer());
        await dispatch(resetAppelDOffreReducer());
        await dispatch(resetAttributionMarcheReducer());
        await dispatch(resetContratReducer());

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer ce marché ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteMarche(id));
        toast.success("Le marché a été supprimé avec succès.", {
          duration: 6000,
          position: "bottom-right"
        });
      }
    })
  }

  return (
    <div className="widgetLg-dm">
      <h2>Derniers Marchés</h2>
      <div className="titles-container">
        <div className="widgetLgTh intitule">Intitulé</div>
        <div className="widgetLgTh etat">État d'avancement</div>
        <div className="widgetLgTh">Créé le</div>
        <div className="widgetLgTh">Mis à jour le</div>
        <div className="widgetLgTh action">Action</div>
      </div>
      <div className="data-container">
        {!isEmpty(marches) && marches.map((marche) => (
          <div className="data-row">
            <div className="widgetLgName">{marche.intitule}</div>
            <div className="linearProgressContainer">
              <LinearProgress variant="determinate" value={marche.etape * 10} className="linearProgress" />
              <div>{marche.etape * 10}%</div>
            </div>
            <div className="widgetLgDate">{dateParser(marche.createdAt)}</div>
            <div className="widgetLgDate">{dateParser(marche.updatedAt)}</div>
            <div className="marcheAction">
              <Link to={"/consulter-marche/" + marche._id}>
                <button className="consulterButton">
                  <Visibility className="consulterIcon" />
                  Consulter
                </button>
              </Link>
              <Link to={"/editer-marche/" + marche._id}>
                <button className="productListEdit">Éditer</button>
              </Link>
              <DeleteOutline
                className="productListDelete"
                onClick={() => handleDelete(marche._id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
  
                  