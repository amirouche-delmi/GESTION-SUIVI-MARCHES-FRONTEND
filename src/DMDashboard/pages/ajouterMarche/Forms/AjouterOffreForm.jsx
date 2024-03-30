import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { getMarche } from "../../../../actions/marcheActions";

export default function AjouterOffreForm() {

  const dispatch = useDispatch();
  const marcheData = useSelector((state) => state.marcheReducer);
  const userData = useSelector((state) => state.userReducer);

  const [nomSoumissionnaire, setNomSoumissionnaire] = useState('');
  const [emailSoumissionnaire, setEmailSoumissionnaire] = useState('');
  const [telephoneSoumissionnaire, setTelephoneSoumissionnaire] = useState('');
  const [statutSoumissionnaire, setStatutSoumissionnaire] = useState('');
  const [detailsProposition, setDetailsProposition] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/offre`, {
        marcheID: marcheData._id,
        dmID: userData._id,
        nomSoumissionnaire,
        emailSoumissionnaire,
        telephoneSoumissionnaire,
        statutSoumissionnaire,
        detailsProposition
      });
      
      await dispatch(getMarche(marcheData._id))

      setNomSoumissionnaire("");
      setEmailSoumissionnaire("");
      setTelephoneSoumissionnaire("");
      setStatutSoumissionnaire("");
      setDetailsProposition(""); 
      document.getElementById("statutSoumissionnaire").selectedIndex = 0;
  
      toast.success("Enregistrement réussi.", {
        duration: 6000,
        position: "bottom-right"
      });
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite lors de l'enregistrement ! un soumissionnaire ne peut que déposer un seul offre pour un marché !", {
          duration: 6000,
          position: "bottom-right"
      });
    }
  }

  return (
    <form onSubmit={handleRegister}>
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
  );
}
