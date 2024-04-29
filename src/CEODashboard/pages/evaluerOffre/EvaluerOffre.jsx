import "./EvaluerOffre.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { isEmpty } from "../../../utils/utils";
import { getOffre, updateOffre } from "../../../actions/offreActions";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Link } from 'react-router-dom';
import LoadingComponent from "../../../pages/Loading/LoadingComponent";

export default function EvaluerOffre() {
  const { offreID } = useParams();
  const dispatch = useDispatch();
  const offreData = useSelector((state) => state.offreReducer);
  
  const [detailsProposition, setDetailsProposition] = useState('');
  const [noteConformite, setNoteConformite] = useState(0);
  const [noteCout, setNoteCout] = useState(0);
  const [noteExperience, setNoteExperience] = useState(0);
  const [noteInnovation, setNoteInnovation] = useState(0);
  const [membresCommission, setMembresCommission] = useState(['']);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getOffre(offreID));
      } catch (error) {
        console.error(error);
        toast.error("Une erreur s'est produite lors de la récupération de le offre !", {
          duration: 6000,
          position: "top-center",
        });
      }
    };    
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (offreData) {
      setDetailsProposition(offreData.detailsProposition || '')
      setNoteConformite(offreData.noteConformite || 0);
      setNoteCout(offreData.noteCout || 0);
      setNoteExperience(offreData.noteExperience || 0);
      setNoteInnovation(offreData.noteInnovation || 0);
      setMembresCommission(offreData.membresCommission || ['']);
    }
  }, [offreData]);

  const handleInputChange = (index, value) => {
    const newInputs = [...membresCommission];
    newInputs[index] = value;
    setMembresCommission(newInputs);
  };

  const handleAddInput = () => {
    setMembresCommission([...membresCommission, '']);
  };

  const handleRemoveInput = () => {
    const newInputs = [...membresCommission];
    newInputs.pop();
    setMembresCommission(newInputs);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateOffre(offreID, { detailsProposition, noteConformite, noteCout, noteExperience, noteInnovation, membresCommission }));

      toast.success("Enregistrement réussi.", {
        duration: 6000,
        position: "top-center",
      });
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite lors de l'enregistrement !", {
        duration: 6000,
        position: "top-center",
      });
    }
  };

  return (
    isEmpty(offreData) ? (
      <LoadingComponent />
    ) : ( 
      <div className="evaluer-offre-container">
        {/* ------------------------------------------------------------ */}
        <h2>Évaluer Offre</h2>
        {/* ------------------------------------------------------------ */}
        <div className="details-propostion">
          <h4>Détails Proposition :</h4>
          <p>{detailsProposition}</p>
        </div>           
        {/* ------------------------------------------------------------ */}
        <form action="" onSubmit={handleRegister}>
          <div className="grid-container">
            <div className="form-item">
              <label htmlFor="noteConformite">Conformité Aux Exigences :</label>
              <input type="number" id="noteConformite" name="noteConformite" required placeholder="Entrez note conformité aux exigences"
                onChange={(e) => setNoteConformite(e.target.value)}
                value={noteConformite}
              />
            </div>
            <div className="form-item">
              <label htmlFor="noteCout">Coût Et Valeur :</label>
              <input type="number" id="noteCout" name="noteCout" required placeholder="Entrez note coût et valeur"
                onChange={(e) => setNoteCout(e.target.value)}
                value={noteCout}
              />
            </div>        
            <div className="form-item">
              <label htmlFor="noteExperience">Expérience Et Compétence :</label>
              <input type="number" id="noteExperience" name="noteExperience" required placeholder="Entrez note expérience et compétence"
                onChange={(e) => setNoteExperience(e.target.value)}
                value={noteExperience}
              />
            </div>        
            <div className="form-item">
              <label htmlFor="noteInnovation">Innovation Et Valeur Ajoutée :</label>
              <input type="number" id="noteInnovation" name="noteInnovation" required placeholder="Entrez note innovation et valeur ajoutée"
                onChange={(e) => setNoteInnovation(e.target.value)}
                value={noteInnovation}
              />
            </div>
            <div className="form-item">
              <label htmlFor="membresCommission">Membres Commission :</label>
              <div className="inputs-buttons-container">
                <div className="inputs-container">
                  {membresCommission.map((inputValue, index) => (
                    <input
                      key={index}
                      type="text"
                      value={inputValue}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      placeholder={`Entrez nom et prénom ${index + 1}`}
                      required
                    />
                  ))}
                </div>              
                <div className="buttons-container">
                  <div className="ajouter-button" onClick={handleAddInput}><PersonAddIcon/></div>
                  {membresCommission.length > 1 && <div className="supprimer-button" onClick={handleRemoveInput}><PersonRemoveIcon /></div>}
                </div>
              </div>
            </div>     
          </div> 
          <div className="submit-back-container">
            <Link to="#" className="back-button" onClick={() => window.history.back()}>🡨 Tous les offres</Link>
            <input type="submit" className="submit-button" value="Enregistrer" />    
          </div>  
        </form>
      </div>
    )
  );
}
