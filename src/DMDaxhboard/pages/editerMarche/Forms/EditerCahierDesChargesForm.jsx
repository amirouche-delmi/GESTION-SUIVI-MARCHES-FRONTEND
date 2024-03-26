import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getMarche } from "../../../../actions/marcheActions";
import { toast } from "react-hot-toast";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { updateCahierDesCharges } from "../../../../actions/cahierDesChargesActions";

export default function EditerCahierDesChargesForm() {
  
  const dispatch = useDispatch();
  const marcheData = useSelector((state) => state.marcheReducer);
  const cahierDesChargesData = useSelector((state) => state.cahierDesChargesReducer);
  const userData = useSelector((state) => state.userReducer);

  const [intitule, setIntitule] = useState(cahierDesChargesData.intitule || "");
  const [descriptionSuccincte, setDescriptionSuccincte] = useState(cahierDesChargesData.descriptionSuccincte || "");
  const [dateFinalisation, setDateFinalisation] = useState(cahierDesChargesData.dateFinalisation ? cahierDesChargesData.dateFinalisation.split('T')[0] : new Date().toISOString().split('T')[0]);
  const [exemplaireNumerique, setExemplaireNumerique] = useState();
  const [validePar, setValidePar] = useState(cahierDesChargesData.validePar || "");
  const [participants, setParticipants] = useState(cahierDesChargesData.participants || ['']);

  const handleInputChange = (index, value) => {
    const newInputs = [...participants];
    newInputs[index] = value;
    setParticipants(newInputs);
  };

  const handleAddInput = () => {
    setParticipants([...participants, '']);
  };

  const handleRemoveInput = () => {
    const newInputs = [...participants];
    newInputs.pop();
    setParticipants(newInputs);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("marcheID", marcheData._id);
    formData.append("dmID", userData._id);
    formData.append("intitule", intitule);
    formData.append("descriptionSuccincte", descriptionSuccincte);
    formData.append("dateFinalisation", dateFinalisation);
    formData.append("validePar", validePar);
    formData.append("participants", JSON.stringify(participants));
    formData.append("file", exemplaireNumerique);

    if (marcheData.cahierDesChargesID) {
      try {
        await dispatch(updateCahierDesCharges(marcheData.cahierDesChargesID, formData));
        toast.success("Cahier des charges mis à jour avec succès !", {
          duration: 6000,
          position: "bottom-right",
        });
      } catch (error) {
        console.error(error);
        toast.error("Une erreur s'est produite lors de la mise à jour du Cahier des charges !", {
          duration: 6000,
          position: "bottom-right",
        });
      }
    } else {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/cahier-des-charges`, formData);
        dispatch(getMarche(marcheData._id));
        toast.success("Enregistrement réussi.", {
          duration: 6000,
          position: "bottom-right"
        });
      } catch (error) {
        console.log(error);
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
            <label htmlFor="intitule">Intitulé Cahier Des Charges :</label>
            <input type="text" id="intitule" name="intitule" placeholder="Entreez intitulé cahier des charges" required
              onChange={(e) => setIntitule(e.target.value)}
              value={intitule}
            /> 
          </div>
          <div className="form-item">
            <label htmlFor="descriptionSuccincte">Description Succincte :</label>
            <input type="text" id="descriptionSuccincte" name="descriptionSuccincte" placeholder="Entrez description succincte" required
              onChange={(e) => setDescriptionSuccincte(e.target.value)}
              value={descriptionSuccincte}
            /> 
          </div>
          <div className="form-item">
            <label htmlFor="dateFinalisation">Date Finalisation :</label>
            <input type="date" id="dateFinalisation" name="dateFinalisation" required
              onChange={(e) => setDateFinalisation(e.target.value)}
              value={dateFinalisation}
            />
          </div>
          <div className="form-item">
            <label htmlFor="exemplaireNumerique">Exemplaire Numerique :</label>
            {cahierDesChargesData._id ? (
              <div className="files-container">
                <a href={`${process.env.REACT_APP_API_URL}/api/uploads/cahierDesCharges/${cahierDesChargesData._id}.pdf`} target="_blank" rel="noopener noreferrer">Consulter le fichier PDF</a>
                <input type="file" id="exemplaireNumerique" name="exemplaireNumerique" accept=".pdf"
                onChange={(e) => { setExemplaireNumerique(e.target.files[0]) }} 
                />
              </div>) : (
              <input type="file" id="exemplaireNumerique" name="exemplaireNumerique" accept=".pdf" required
              onChange={(e) => { setExemplaireNumerique(e.target.files[0]) }} 
              />
            )}             
          </div>
          <div className="form-item">
            <label htmlFor="validePar">Validé Par :</label>
            <input type="text" id="validePar" name="validePar" placeholder="Entrez nom et prénom" required
              onChange={(e) => setValidePar(e.target.value)}
              value={validePar}
            />
          </div>
          <div className="form-item">
            <label htmlFor="participants">Participants :</label>
            <div className="inputs-buttons-container">
              <div className="inputs-container">
                {participants.map((inputValue, index) => (
                  <input
                    key={index}
                    type="text"
                    value={inputValue}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    placeholder={`Entrez nom et prénom de participant ${index + 1}`}
                    required
                  />
                ))}
              </div>              
              <div className="buttons-container">
                <div className="ajouter-button" onClick={handleAddInput}>{/*Ajouter&nbsp;*/}<PersonAddIcon /></div>
                {participants.length > 1 && <div className="supprimer-button" onClick={handleRemoveInput}>{/*Supprimer&nbsp;*/}<PersonRemoveIcon /></div>}
              </div>
            </div>
          </div>         
          <input type="submit" className="submit-button" value="Enregistrer" />
        </form>
  );
}
