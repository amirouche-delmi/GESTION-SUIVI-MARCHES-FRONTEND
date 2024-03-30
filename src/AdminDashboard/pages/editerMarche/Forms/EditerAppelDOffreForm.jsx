import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getMarche } from "../../../../actions/marcheActions";
import { toast } from "react-hot-toast";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { updateAppelDOffre } from "../../../../actions/appelDOffreActions";

export default function AjouterAppelDOffreForm() {
  
  const dispatch = useDispatch();
  const marcheData = useSelector((state) => state.marcheReducer);
  const appelDOffreData = useSelector((state) => state.appelDOffreReducer);
  const userData = useSelector((state) => state.userReducer);

  const [dateLancement, setDateLancement] = useState(appelDOffreData.dateLancement ? appelDOffreData.dateLancement.split('T')[0] : new Date().toISOString().split('T')[0]);
  const [dateCloture, setDateCloture] = useState(appelDOffreData.dateCloture ? appelDOffreData.dateCloture.split('T')[0] : new Date().toISOString().split('T')[0]);
  const [mediasUtilises, setMediasUtilises] = useState(appelDOffreData.mediasUtilises || ['']);
  const [redacteurs, setRedacteurs] = useState(appelDOffreData.redacteurs || ['']);

  const handleInputChangeMedias = (index, value) => {
    const newInputs = [...mediasUtilises];
    newInputs[index] = value;
    setMediasUtilises(newInputs);
  };
  const handleInputChangeRedacteurs = (index, value) => {
    const newInputs = [...redacteurs];
    newInputs[index] = value;
    setRedacteurs(newInputs);
  };

  const handleAddInputMedias = () => {
    setMediasUtilises([...mediasUtilises, '']);
  };
  const handleAddInputRedacteurs = () => {
    setRedacteurs([...redacteurs, '']);
  };

  const handleRemoveInputMedias = () => {
    const newInputs = [...mediasUtilises];
    newInputs.pop();
    setMediasUtilises(newInputs);
  };
  const handleRemoveInputRedacteurs = () => {
    const newInputs = [...redacteurs];
    newInputs.pop();
    setRedacteurs(newInputs);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (marcheData.appelDOffreID) {
      try {
        await dispatch(updateAppelDOffre(marcheData.appelDOffreID, { dateLancement, dateCloture, mediasUtilises, redacteurs }));
        toast.success("Besoin mis à jour avec succès !", {
          duration: 6000,
          position: "bottom-right",
        });
      } catch (error) {
        console.error(error);
        toast.error("Une erreur s'est produite lors de la mise à jour du Besoin !", {
          duration: 6000,
          position: "bottom-right",
        });
      }
    } else {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/appel-d-offre`, {
          marcheID: marcheData._id,
          dmID: userData._id,
          dateLancement,
          dateCloture,
          mediasUtilises,
          redacteurs
        });
    
        dispatch(getMarche(marcheData._id));
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
    }  
  }

  return (
        <form onSubmit={handleRegister} >
          <div className="form-item">
            <label htmlFor="dateLancement">Date Lancement :</label>
            <input type="date" id="dateLancement" name="dateLancement" required
              onChange={(e) => setDateLancement(e.target.value)}
              value={dateLancement}
            />
          </div>
          <div className="form-item">
            <label htmlFor="dateCloture">Date Cloture :</label>
            <input type="date" id="dateCloture" name="dateCloture" required
              onChange={(e) => setDateCloture(e.target.value)}
              value={dateCloture}
            />
          </div>
          <div className="form-item">
            <label htmlFor="mediasUtilises">Medias Utilisés :</label>
            <div className="inputs-buttons-container">
              <div className="inputs-container">
                {mediasUtilises.map((inputValue, index) => (
                  <input
                    key={index}
                    type="text"
                    value={inputValue}
                    onChange={(e) => handleInputChangeMedias(index, e.target.value)}
                    placeholder={`Entrez nom média ${index + 1}`}
                    required
                  />
                ))}
              </div>              
              <div className="buttons-container">
                <div className="ajouter-button" onClick={handleAddInputMedias}><AddIcon /></div>
                {mediasUtilises.length > 1 && <div className="supprimer-button" onClick={handleRemoveInputMedias}><RemoveIcon /></div>}
              </div>
            </div>
          </div>
          <div className="form-item">
            <label htmlFor="redacteurs">Rédacteurs :</label>
            <div className="inputs-buttons-container">
              <div className="inputs-container">
                {redacteurs.map((inputValue, index) => (
                  <input
                    key={index}
                    type="text"
                    value={inputValue}
                    onChange={(e) => handleInputChangeRedacteurs(index, e.target.value)}
                    placeholder={`Entrez nom et prénom rédacture ${index + 1}`}
                    required
                  />
                ))}
              </div>              
              <div className="buttons-container">
                <div className="ajouter-button" onClick={handleAddInputRedacteurs}><PersonAddIcon/></div>
                {redacteurs.length > 1 && <div className="supprimer-button" onClick={handleRemoveInputRedacteurs}><PersonRemoveIcon /></div>}
              </div>
            </div>
          </div>         
          <input type="submit" className="submit-button" value="Enregistrer" />
        </form>
  );
}
