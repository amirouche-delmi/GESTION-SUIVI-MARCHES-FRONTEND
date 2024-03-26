import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMarche, updateMarche } from "../../../actions/marcheActions";
import EditerBesoinForm from "./Forms/EditerBesoinForm";
import EditerValidationPrealableForm from "./Forms/EditerValidationPrealableForm";
import EditerCahierDesChargesForm from "./Forms/EditerCahierDesChargesForm";
import EditerAppelDOffreForm from "./Forms/EditerAppelDOffreForm";
import AjouterOffreForm from "./Forms/AjouterOffreForm";
import { toast } from "react-hot-toast";
import "./EditerMarche.scss";
import { useParams } from "react-router-dom";
import { isEmpty } from "../../../utils/utils";
import { getBesoin, resetBesoinReducer } from "../../../actions/besoinActions";
import { getValidationPrealable, resetValidationPrealableReducer } from "../../../actions/validationPrealableActions";
import { getCahierDesCharges, resetCahierDesChargesReducer } from "../../../actions/cahierDesChargesActions";
import { getAppelDOffre, resetAppelDOffreReducer } from "../../../actions/appelDOffreActions";
import OffreList from "./EditerOffreList";
import { getAllSoumissionnaire } from "../../../actions/soumissionnaireActions";
import { getAllOffre } from "../../../actions/offreActions";

export default function EditerMarche() {

  const { marcheID } = useParams();
  const dispatch = useDispatch();
  const marcheData = useSelector((state) => state.marcheReducer);

  const [etape, setEtape] = useState(marcheData.etape+1);
  const [intitule, setIntitule] = useState(marcheData.intitule);
  const [description, setDescription] = useState(marcheData.description);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getMarche(marcheID));
        await dispatch(resetBesoinReducer());
        await dispatch(resetValidationPrealableReducer());
        await dispatch(resetCahierDesChargesReducer());
        await dispatch(resetAppelDOffreReducer());
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
        setEtape(marcheData.etape+1);
        setIntitule(marcheData.intitule)
        setDescription(marcheData.description)
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des données du besoin :", error);
      }
    };  
    fetchData();  
  }, [dispatch, marcheData]); 
 

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateMarche(marcheID, { intitule, description }));
      toast.success("Marché mis à jour avec succès !", {
        duration: 6000,
        position: "bottom-right",
      });
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite lors de la mise à jour du marché !", {
        duration: 6000,
        position: "bottom-right",
      });
    }
  };

  const renderEtapeForm = () => {
    switch (etape) {
      case 1:
        return (
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
              >
              </textarea>
            </div>
            <input type="submit" className="submit-button" value="Enregistrer" />
          </form>
        );
      case 2:
        return <EditerBesoinForm />;
      case 3:
        return <EditerValidationPrealableForm />;
      case 4:
        return <EditerCahierDesChargesForm />;
      case 5:
        return <EditerAppelDOffreForm />;
      case 6:  
        return <AjouterOffreForm />;
      case 7:  
        return  <form style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                  <p style={{ 
                    textAlign: "center",
                    maxWidth: "600px", 
                    fontSize: "1.1rem",
                    lineHeight: "1.5", 
                    padding: "20px", 
                    border: "1px solid #ccc", 
                    borderRadius: "8px", 
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#f9f9f9", 
                    color: "#333" 
                  }}>
                    La Commission d'Evaluation des Offres (CEO) sera chargée d'examiner attentivement 
                    toutes les offres soumises pour ce marché, de les évaluer selon des critères 
                    prédéfinis tels que le prix, la qualité et la conformité aux spécifications, 
                    puis de sélectionner le fournisseur le plus qualifié et compétitif pour 
                    attribuer le marché.
                  </p>
                </form>
      default:
        return  <form style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.1rem", lineHeight: "1.5",}}>
                  Chargement...
                </form>
    }
  };

  return (
    !isEmpty(marcheData) && (
      <div className="editer-marche-container">
    {/* ------------------------------------------------------------ */}
        <h2>Éditer Marché</h2>
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
          <div className={"step-color" + (marcheData.etape === 6 ? " active-step" : (marcheData.etape > 5 ? " completed-step" : ""))}></div>
        </div>
          <div className="step-item">
            <div className="step-text">Attribution Marché</div>
            <div className={"step-color" + (marcheData.etape === 7 ? " active-step" : (marcheData.etape > 6 ? " completed-step" : ""))}></div>
          </div>
          <div className="step-item">
            <div className="step-text">Contrat</div>
            <div className={"step-color" + (marcheData.etape === 8 ? " active-step" : (marcheData.etape > 7 ? " completed-step" : ""))}></div>
          </div>
        </div>
      {/* ------------------------------------------------------------ */}
      
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
          </div>
        </div>     
      
{/* ------------------------------------------------------------ */}
        {renderEtapeForm()}
      </div>
      {etape === 6 && <OffreList /> }
      </div>
    )
  );
}
