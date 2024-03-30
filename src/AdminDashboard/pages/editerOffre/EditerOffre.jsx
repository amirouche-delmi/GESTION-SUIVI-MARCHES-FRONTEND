import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import "./EditerOffre.scss";
import { useParams } from "react-router-dom";
import { isEmpty } from "../../../utils/utils";
import { updateSoumissionnaire } from "../../../actions/soumissionnaireActions";
import { updateOffre } from "../../../actions/offreActions";

export default function EditerOffre() {
  const { offreID } = useParams();
  const dispatch = useDispatch();
  const offreData = useSelector((state) => state.allOffreReducer).find(o => o._id === offreID);
  const soumissionnaireData = useSelector((state) => state.allSoumissionnaireReducer).find(s => s._id === offreData.soumissionnaireID);

  const [nomSoumissionnaire, setNomSoumissionnaire] = useState(soumissionnaireData.nom || '');
  const [emailSoumissionnaire, setEmailSoumissionnaire] = useState(soumissionnaireData.email || '');
  const [telephoneSoumissionnaire, setTelephoneSoumissionnaire] = useState(soumissionnaireData.telephone || '');
  const [statutSoumissionnaire, setStatutSoumissionnaire] = useState(soumissionnaireData.statut || '');
  const [detailsProposition, setDetailsProposition] = useState(offreData.detailsProposition || '');

  useEffect(() => {
    const selectElement = document.getElementById("statutSoumissionnaire");
    for (let option of selectElement.options) {
      if (option.value === statutSoumissionnaire) {
        option.selected = true;
        break;
      }
    }
  }, []);
 

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateOffre(offreID, { detailsProposition }));
      await dispatch(updateSoumissionnaire(soumissionnaireData._id, { nomSoumissionnaire, emailSoumissionnaire, telephoneSoumissionnaire, statutSoumissionnaire }));

      toast.success("offre mis à jour avec succès !", {
        duration: 6000,
        position: "bottom-right",
      });
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite lors de la mise à jour de l'offre !", {
        duration: 6000,
        position: "bottom-right",
      });
    }
  };

  return (
    (!isEmpty(offreData) && !isEmpty(soumissionnaireData)) && (
      <div className="editer-offre-container">
    {/* ------------------------------------------------------------ */}
        <h2>Éditer Offre</h2>
    {/* ------------------------------------------------------------ */}
           
        <form action="" onSubmit={handleRegister} className="ajouter-validation-prealable-form">
          <div className="form-item">
            <label htmlFor="nomSoumissionnaire">Nom Soumissionnaire :</label>
            <input type="text" id="nomSoumissionnaire" name="nomSoumissionnaire" required placeholder="Entrez nom soumissionnaire"
              onChange={(e) => setNomSoumissionnaire(e.target.value)}
              value={nomSoumissionnaire}
            />
          </div>
          <div className="form-item">
            <label htmlFor="emailSoumissionnaire">Email Soumissionnaire :</label>
            <input type="email" id="emailSoumissionnaire" name="emailSoumissionnaire" required placeholder="Entrez email soumissionnaire"
              onChange={(e) => setEmailSoumissionnaire(e.target.value)}
              value={emailSoumissionnaire}
            />
          </div>        
          <div className="form-item">
            <label htmlFor="telephoneSoumissionnaire">Téléphone Soumissionnaire :</label>
            <input type="text" id="telephoneSoumissionnaire" name="telephoneSoumissionnaire" required placeholder="+213 50 23 75 98"
              onChange={(e) => setTelephoneSoumissionnaire(e.target.value)}
              value={telephoneSoumissionnaire}
            />
          </div>        
          <div className="form-item">
            <label htmlFor="statutSoumissionnaire">Statut Soumissionnaire :</label>
            <select id="statutSoumissionnaire" name="statutSoumissionnaire" onChange={(e) => setStatutSoumissionnaire(e.target.value)} required>
                <option value="">Choisissez</option>
                <option value="Entreprise individuelle">Entreprise individuelle</option>
                <option value="Société à responsabilité limitée (SARL)">Société à responsabilité limitée (SARL)</option>
                <option value="Société anonyme (SA)">Société anonyme (SA)</option>
                <option value="Entreprise individuelle agricole">Entreprise individuelle agricole</option>
                <option value="Entreprise individuelle artisanale">Entreprise individuelle artisanale</option>
                <option value="Entreprise individuelle commerciale">Entreprise individuelle commerciale</option>
                <option value="Entreprise individuelle libérale">Entreprise individuelle libérale</option>
                <option value="Micro-entreprise">Micro-entreprise</option>
                <option value="Association">Association</option>
                <option value="Coopérative">Coopérative</option>
                <option value="Groupement d'intérêt économique (GIE)">Groupement d'intérêt économique (GIE)</option>
                <option value="Organisme public">Organisme public</option>
                <option value="Auto-entrepreneur">Auto-entrepreneur</option>
                <option value="Entreprise unipersonnelle à responsabilité limitée (EURL)">Entreprise unipersonnelle à responsabilité limitée (EURL)</option>
                <option value="Société par actions simplifiée (SAS)">Société par actions simplifiée (SAS)</option>
                <option value="Société en commandite simple (SCS)">Société en commandite simple (SCS)</option>
                <option value="Société en commandite par actions (SCA)">Société en commandite par actions (SCA)</option>
                <option value="Société civile immobilière (SCI)">Société civile immobilière (SCI)</option>
                <option value="Société coopérative de production (SCOP)">Société coopérative de production (SCOP)</option>
                <option value="Société coopérative ouvrière de production (SCOOP)">Société coopérative ouvrière de production (SCOOP)</option>
              </select>
          </div>        
          <div className="form-item">
            <label htmlFor="detailsProposition">Details Proposition :</label>
            <textarea id="detailsProposition" name="detailsProposition" required rows="4" cols="50" placeholder="Entrez details proposition ..."
              onChange={(e) => setDetailsProposition(e.target.value)}
              value={detailsProposition}>
            </textarea>
          </div>  
          <input type="submit" className="submit-button" value="Enregistrer" />    
        </form>

      </div>
    )
  );
}
