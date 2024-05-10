import "./widgetLg.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { LinearProgress } from "@mui/material";
import { dateParser } from "../../../../../utils/utils";
import { Visibility } from "@material-ui/icons";
import 'react-toastify/dist/ReactToastify.css';
import { resetMarcheReducer } from "../../../../../actions/marcheActions";
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
        setMarches(response.data.filter(m => m.ceoID === userData._id).slice(0, 5));
       
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
  }, [userData]);

  return (
    <div className="widgetLg-ceo">
      <h2>Derniers Marchés</h2>
      <div className="titles-container">
        <div className="widgetLgTh intitule">Intitulé</div>
        <div className="widgetLgTh etat">État d'avancement</div>
        <div className="widgetLgTh">Créé le</div>
        <div className="widgetLgTh">Mis à jour le</div>
        <div className="widgetLgTh action">Action</div>
      </div>
      <div className="data-container">
        {marches.map((marche) => (
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
