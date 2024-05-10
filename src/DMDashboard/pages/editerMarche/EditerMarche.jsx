import "./EditerMarche.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMarche, updateMarche } from "../../../actions/marcheActions";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { isEmpty } from "../../../utils/utils";
import { getBesoin, resetBesoinReducer } from "../../../actions/besoinActions";
import { getValidationPrealable, resetValidationPrealableReducer } from "../../../actions/validationPrealableActions";
import { getCahierDesCharges, resetCahierDesChargesReducer } from "../../../actions/cahierDesChargesActions";
import { getAppelDOffre, resetAppelDOffreReducer } from "../../../actions/appelDOffreActions";
import { getAllSoumissionnaire } from "../../../actions/soumissionnaireActions";
import { getAllOffre } from "../../../actions/offreActions";
import { getContrat, resetContratReducer } from "../../../actions/contratActions";
import Besoin from "./components/Besoin";
import ValidationPrealable from "./components/ValidationPrealable";
import CahierDesCharges from "./components/CahierDesCharges";
import AppelDOffre from "./components/AppelDOffre";
import Offre from "./components/Offre";
import OffreList from "./components/OffreList";
import Contrat from "./components/Contrat";
import Cloturer from "./components/Cloturer";
import EvaluationOffres from "./components/EvaluationOffres";
import AttributionMarche from "./components/AttributionMarche";
import LoadingComponent from "../../../pages/Loading/LoadingComponent";
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import { Link } from "react-router-dom";
import { getAllUser } from "../../../actions/userActions";

export default function EditerMarche() {

  const { marcheID } = useParams();
  const dispatch = useDispatch();
  const marcheData = useSelector((state) => state.marcheReducer);
  const allUserData = useSelector((state) => state.allUserReducer);

  const [etape, setEtape] = useState(marcheData.etape+1);
  const [intitule, setIntitule] = useState(marcheData.intitule);
  const [description, setDescription] = useState(marcheData.description);
  const [ceoID, setCeoID] = useState(marcheData.ceoID);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllUser());
        await dispatch(getMarche(marcheID));
        await dispatch(resetBesoinReducer());
        await dispatch(resetValidationPrealableReducer());
        await dispatch(resetCahierDesChargesReducer());
        await dispatch(resetAppelDOffreReducer());
        await dispatch(resetContratReducer());

      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des données du marché :", error);
      }
    };    
    fetchData();  
  }, [dispatch, marcheID]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (marcheData.besoinID) {
          await dispatch(getBesoin(marcheData.besoinID));
        }
        if (marcheData.validationPrealableID) {
          await dispatch(getValidationPrealable(marcheData.validationPrealableID));
        }
        if (marcheData.cahierDesChargesID) {
          await dispatch(getCahierDesCharges(marcheData.cahierDesChargesID));
        }
        if (marcheData.appelDOffreID) {
          await dispatch(getAppelDOffre(marcheData.appelDOffreID));
          await dispatch(getAllOffre());    
          await dispatch(getAllSoumissionnaire()); 
        }
        if (marcheData.contratID) {
          await dispatch(getContrat(marcheData.contratID));
        }
        setEtape(marcheData.etape+1);
        setIntitule(marcheData.intitule)
        setDescription(marcheData.description)
        setCeoID(marcheData.ceoID)

      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };  
    fetchData();  
  }, [dispatch, marcheData]); 
 

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateMarche(marcheID, { intitule, description, ceoID, etape: marcheData.etape}));
      toast.success("Mis à jour avec réussie.", {
        duration: 6000,
        position: "bottom-right",
      });
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite lors de la mise à jour !", {
        duration: 6000,
        position: "bottom-right",
      });
    }
  };

  return (
    !isEmpty(marcheData) &&(
      <div className="editer-marche-container">
{/* --------------------------------------------------------------------------------------------- */}
        <h2>Éditer Marché</h2>
{/* --------------------------------------------------------------------------------------------- */}
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
            <div className="step-text">Clôturé</div>
            <div className={"step-color" + (marcheData.etape === 9 ? " active-step" : (marcheData.etape > 9 ? " completed-step" : ""))}></div>
          </div>
        </div>
{/* --------------------------------------------------------------------------------------------- */}      
        <div className="edit-container">
          <div className="edit-sidebar">
            <h3>Étapes du marché</h3> 
            <div className="edit-sidebar-itmes">
              <div className={"edit-sidebar-item" + (etape === 1 ? " active" : "")} onClick={() => {if (1 <= marcheData.etape+1) {setEtape(1)} else {toast.error("Veuillez respecter le séquencement des étapes du marché !", {duration: 6000, position: "bottom-right"})}}}>Marché</div>
              <div className={"edit-sidebar-item" + (etape === 2 ? " active" : "")} onClick={() => {if (2 <= marcheData.etape+1) {setEtape(2)} else {toast.error("Veuillez respecter le séquencement des étapes du marché !", {duration: 6000, position: "bottom-right"})}}}>Besoin</div>
              <div className={"edit-sidebar-item" + (etape === 3 ? " active" : "")} onClick={() => {if (3 <= marcheData.etape+1) {setEtape(3)} else {toast.error("Veuillez respecter le séquencement des étapes du marché !", {duration: 6000, position: "bottom-right"})}}}>Validation Préalable</div>
              <div className={"edit-sidebar-item" + (etape === 4 ? " active" : "")} onClick={() => {if (4 <= marcheData.etape+1) {setEtape(4)} else {toast.error("Veuillez respecter le séquencement des étapes du marché !", {duration: 6000, position: "bottom-right"})}}}>Cahier des Charges</div>
              <div className={"edit-sidebar-item" + (etape === 5 ? " active" : "")} onClick={() => {if (5 <= marcheData.etape+1) {setEtape(5)} else {toast.error("Veuillez respecter le séquencement des étapes du marché !", {duration: 6000, position: "bottom-right"})}}}>Appel d'Offre</div>
              <div className={"edit-sidebar-item" + (etape === 6 ? " active" : "")} onClick={() => {if (6 <= marcheData.etape+1) {setEtape(6)} else {toast.error("Veuillez respecter le séquencement des étapes du marché !", {duration: 6000, position: "bottom-right"})}}}>Offres</div>
              <div className={"edit-sidebar-item" + (etape === 7 ? " active" : "")} onClick={() => {if (7 <= marcheData.etape+1) {setEtape(7)} else {toast.error("Veuillez respecter le séquencement des étapes du marché !", {duration: 6000, position: "bottom-right"})}}}>Évaluation Offres</div>
              <div className={"edit-sidebar-item" + (etape === 8 ? " active" : "")} onClick={() => {if (8 <= marcheData.etape+1) {setEtape(8)} else {toast.error("Veuillez respecter le séquencement des étapes du marché !", {duration: 6000, position: "bottom-right"})}}}>Attribution Marché</div>
              <div className={"edit-sidebar-item" + (etape === 9 ? " active" : "")} onClick={() => {if (9 <= marcheData.etape+1) {setEtape(9)} else {toast.error("Veuillez respecter le séquencement des étapes du marché !", {duration: 6000, position: "bottom-right"})}}}>Contrat</div>
              <div className={"edit-sidebar-item" + ((etape === 10) || (etape === 11) ? " active" : "")} onClick={() => {if (10 <= marcheData.etape+1) {setEtape(marcheData.etape+1)} else {toast.error("Veuillez respecter le séquencement des étapes du marché !", {duration: 6000, position: "bottom-right"})}}}>Clôturé</div>
            </div>
          </div>         
{/* --------------------------------------------------------------------------------------------- */}      
          {etape === 1 ? (
            <form onSubmit={handleRegister} className="ajouter-marche-form">
              <div className="form-item">
                <label htmlFor="intitule">Intitulé Marché :</label>
                <input
                  type="text"
                  id="intitule"
                  name="intitule"
                  placeholder="Entrer l'intitulé du marché"
                  required
                  onChange={(e) => setIntitule(e.target.value)}
                  value={intitule}
                />
              </div>
              <div className="form-item">
                <label htmlFor="description">Description Marché :</label>
                <textarea id="description" name="description" required rows="4" cols="50" placeholder="Entrer la description du marché ..."
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>
              <div className="form-item">
                <label htmlFor="ceo">Nom CEO :</label>
                <select id="ceo" name="ceo" onChange={(e) => setCeoID(e.target.value)} required>
                  <option value="">Choisissez</option>
                  {!isEmpty(allUserData) && allUserData.map(user => {
                    if (user.role === 'CEO') {
                      if (user._id === ceoID) {
                        return <option key={user._id} value={user._id} selected>{user.nom}</option>;
                      } else {
                        return <option key={user._id} value={user._id}>{user.nom}</option>;
                      }
                    }
                    return null;
                  })}
                </select>
              </div> 
              <div className="submit-ceo-container">
                <input type="submit" className="submit-button" value="Enregistrer" />
                <Link to={"/ajouter-ceo/"}>
                  <button className="ceo-button" >Ajouter CEO &nbsp;<GroupAddOutlinedIcon /></button>
                </Link>
              </div>
            </form>
          ) : etape === 2 ? (
            <Besoin />
          ) : etape === 3 ? (
            <ValidationPrealable />
          ) : etape === 4 ? (
            <CahierDesCharges />
          ) : etape === 5 ? (
            <AppelDOffre />
          ) : etape === 6 ? (
            <Offre />
          ) : etape === 7 ? (
            <EvaluationOffres />
          ) : etape === 8 ? (
            <AttributionMarche />
          ) : etape === 9 ? (
            <Contrat />
          ) : (etape === 10 || etape === 11) ? (
            <Cloturer />
          ) : (
            <LoadingComponent />
          )}
        </div>
        {(etape === 6 && marcheData.etape <= 5) && <OffreList /> }
      </div>
    )
  );
}
