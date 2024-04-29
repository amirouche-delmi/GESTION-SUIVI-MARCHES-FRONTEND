import "./AjouterMarche.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {getMarche, resetMarcheReducer } from "../../../actions/marcheActions";
import AjouterBesoinForm from "./Forms/AjouterBesoinForm";
import AjouterValidationPrealableForm from "./Forms/AjouterValidationPrealableForm";
import AjouterCahierDesChargesForm from "./Forms/AjouterCahierDesChargesForm";
import AjouterAppelDOffreForm from "./Forms/AjouterAppelDOffreForm";
import AjouterOffreForm from "./Forms/AjouterOffreForm";
import { toast } from "react-hot-toast";

export default function AjouterMarche() {

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const marcheData = useSelector((state) => state.marcheReducer);

  const [intitule, setIntitule] = useState("");
  const [description, setDescription] = useState("");

  
  useEffect(() => {
    dispatch(resetMarcheReducer());
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/marche`, {
        dmID: userData._id,
        intitule,
        description
      });
        
      await dispatch(getMarche(response.data.marcheID));
  
      toast.success("Enregistrement réussi.", {
          duration: 6000,
          position: "bottom-right"
      });
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite lors de l'enregistrement !", {
          duration: 6000,
          position: "bottom-right"
      });
    }
  };
  

  return (
    <div className="ajouter-marche-container">
      {/* ------------------------------------------------------------ */}
      <h2>Ajouter Un Marché</h2>
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
          <div className="step-color"></div>
        </div>
        <div className="step-item">
          <div className="step-text">Contrat</div>
          <div className={"step-color" + (marcheData.etape === 8 ? " active-step" : (marcheData.etape > 8 ? " completed-step" : ""))}></div>
          <div className="step-color"></div>
        </div>
        <div className="step-item">
          <div className="step-text">Clôturé</div>
          <div className={"step-color" + (marcheData.etape === 9 ? " active-step" : (marcheData.etape > 9 ? " completed-step" : ""))}></div>
          <div className="step-color"></div>
        </div>
      </div>
      {/* ------------------------------------------------------------ */}
      {marcheData.etape === 1 ? (
        <AjouterBesoinForm />
      ) : marcheData.etape === 2 ? (
        <AjouterValidationPrealableForm />
      ) : marcheData.etape === 3 ? (
        <AjouterCahierDesChargesForm />
      ) : marcheData.etape === 4 ? (
        <AjouterAppelDOffreForm />
      ) : (marcheData.etape === 5) ? (
        <AjouterOffreForm />
      ) : (marcheData.etape === 6) ? (
          <div className="evaluation-offres-container">
          <p>
            La Commission d'Evaluation des Offres (CEO) sera chargée d'examiner attentivement 
            toutes les offres soumises pour ce marché, de les évaluer selon des critères 
            prédéfinis tels que le prix, la qualité et la conformité aux spécifications, 
            puis de sélectionner le fournisseur le plus qualifié et compétitif pour 
            attribuer le marché.
          </p>
        </div>
      ) : (
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
      )}
    </div>
  );
}
