import "./AttributionMarche.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMarche } from "../../../../actions/marcheActions";
import { isEmpty } from "../../../../utils/utils";
import { getAllSoumissionnaire } from "../../../../actions/soumissionnaireActions";
import { getAllOffre, resetOffreReducer } from "../../../../actions/offreActions";
import { getAttributionMarche } from "../../../../actions/attributionMarcheActions";
import LoadingComponent from "../../../../pages/Loading/LoadingComponent";
import OffreList from "./OffreList";

export default function AttribuerMarches() {
  const { marcheID } = useParams();
  const dispatch = useDispatch();
  const marcheData = useSelector((state) => state.marcheReducer);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getMarche(marcheID));
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des données du marché: ", error);
      }
    };    
    fetchData();  
  }, [dispatch, marcheID]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
          await dispatch(resetOffreReducer())
          await dispatch(getAllOffre());    
          await dispatch(getAllSoumissionnaire());
          await dispatch(getAttributionMarche(marcheData.attributionMarcheID)) 
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des données: ", error);
      }
    };  
    fetchData();  
  }, [dispatch, marcheData]); 

  return (
    isEmpty(marcheData) ? (
      <LoadingComponent />
    ) : (
      <div className="attribution-marche-container">
      {/* ------------------------------------------------------------ */}
        <h2>Attribution Marché</h2>
      {/* ------------------------------------------------------------ */}
        <div className="progress-bar">
          <div className="step-item">
            <div className="step-text">Marché</div>
            <div className={"step-color" + (marcheData.etape > 0  ? " completed-step" : " active-step")}></div>
          </div>
          <div className="step-item">
            <div className="step-text">Besoin</div>
            <div className={"step-color" + (marcheData.etape === 1 ? " active-step" : (marcheData.etape > 1 ? " completed-step" : ""))}></div>
          </div>
          <div className="step-item">
            <div className="step-text">Validation Préalable</div>
            <div className={"step-color" + (marcheData.etape === 2 ? " active-step" : (marcheData.etape > 2 ? " completed-step" : ""))}></div>
          </div>
          <div className="step-item">
            <div className="step-text">Cahier des Charges</div>
            <div className={"step-color" + (marcheData.etape === 3 ? " active-step" : (marcheData.etape > 3 ? " completed-step" : ""))}></div>
          </div>
          <div className="step-item">
            <div className="step-text">Appel d'Offre</div>
            <div className={"step-color" + (marcheData.etape === 4 ? " active-step" : (marcheData.etape > 4 ? " completed-step" : ""))}></div>
          </div>
          <div className="step-item">
            <div className="step-text">Offres</div>
            <div className={"step-color" + (marcheData.etape === 5 ? " active-step" : (marcheData.etape > 5 ? " completed-step" : ""))}></div>
          </div>
          <div className="step-item">
          <div className="step-text">Évaluation Offres</div>
          <div className={"step-color" + (marcheData.etape === 6 ? " active-step" : (marcheData.etape > 6 ? " completed-step" : ""))}></div>
        </div>
          <div className="step-item">
            <div className="step-text">Attribution Marché</div>
            <div className={"step-color" + (marcheData.etape === 7 ? " active-step" : (marcheData.etape > 7 ? " completed-step" : ""))}></div>
          </div>
          <div className="step-item">
            <div className="step-text">Contrat</div>
            <div className={"step-color" + (marcheData.etape === 8 ? " active-step" : (marcheData.etape > 8 ? " completed-step" : ""))}></div>
          </div>
          <div className="step-item">
            <div className="step-text">Cloturé</div>
            <div className={"step-color" + (marcheData.etape === 9 ? " active-step" : (marcheData.etape > 9 ? " completed-step" : ""))}></div>
          </div>
        </div>
        {/* ------------------------------------------------------------ */}          
        <OffreList />      
        {/* ------------------------------------------------------------ */}
    </div>
    )
  );
}
