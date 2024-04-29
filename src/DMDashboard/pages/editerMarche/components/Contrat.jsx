import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getMarche } from "../../../../actions/marcheActions";
import { toast } from "react-hot-toast";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { updateValidationPrealable } from "../../../../actions/validationPrealableActions";
import { updateContrat } from "../../../../actions/contratActions";

export default function EditerContratForm() {
  
  const dispatch = useDispatch();
  const marcheData = useSelector((state) => state.marcheReducer);
  const userData = useSelector((state) => state.userReducer);
  const contratData = useSelector((state) => state.contratReducer);
  
  const [delaiRealisation, setDelaiRealisation] = useState(contratData.delaiRealisation || '');
  const [cout, setCout] = useState(contratData.cout || 0);
  const [statut, setStatut] = useState(contratData.statut || '');
  const [observation, setObservation] = useState(contratData.observation || '');
  const [signePar, setSignePar] = useState(contratData.signePar || ['']);
  
  const validationPrealableData = useSelector((state) => state.validationPrealableReducer);
  const [dateValidation, setDateValidation] = useState(validationPrealableData.dateValidation ? validationPrealableData.dateValidation.split('T')[0] : new Date().toISOString().split('T')[0]);
  const [reservesRemarques, setReservesRemarques] = useState(validationPrealableData.reservesRemarques || "");
  const [validePar, setValidePar] = useState(validationPrealableData.validePar || ['']);

  const handleInputChange = (index, value) => {
    const newInputs = [...signePar];
    newInputs[index] = value;
    setSignePar(newInputs);
  };

  const handleAddInput = () => {
    setSignePar([...signePar, '']);
  };

  const handleRemoveInput = () => {
    const newInputs = [...signePar];
    newInputs.pop();
    setSignePar(newInputs);
  };

  useEffect(() => {
    const selectElement = document.getElementById("statut");
    for (let option of selectElement.options) {
      if (option.value === statut) {
        option.selected = true;
        break;
      }
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (marcheData.contratID) {
      try {
        await dispatch(updateContrat(marcheData.contratID, { delaiRealisation, cout, statut, observation, signePar }));
        toast.success("Mise à jour réussie.", {
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
    } else {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/contrat`, {
          marcheID: marcheData._id,
          dmID: userData._id,
          delaiRealisation,
          cout,
          statut,
          observation,
          signePar,
        })
        dispatch(getMarche(marcheData._id));
        toast.success("Enregistrement réussi.", {
            duration: 6000,
            position: "bottom-right"
          }
        )
      } catch (error) {
        console.log(error);
        toast.error("Une erreur s'est produite lors de l'enregistrement !", {
            duration: 6000,
            position: "bottom-right"
          }
        )
      }
    }
  };

  return (
        <form onSubmit={handleRegister} >
          <div className="form-item">
            <label htmlFor="dateValidation">Delai Realisation :</label>
            <input type="text" id="delaiRealisation" name="delaiRealisation" required placeholder="Entrez délai de réalisation"
              onChange={(e) => setDelaiRealisation(e.target.value)}
              value={delaiRealisation}
            />
          </div>
          <div className="form-item">
            <label htmlFor="cout">Coût :</label>
            <input type="number" id="cout" name="cout" required
              onChange={(e) => setCout(e.target.value)}
              value={cout}
            />
          </div>
          <div className="form-item">
            <label htmlFor="statut">Statut :</label>
            <select id="statut" name="statut" onChange={(e) => setStatut(e.target.value)} required>
              <option value="">Choisissez</option>
              <option value="En cours">En cours</option>
              <option value="Terminé">Terminé</option>
              <option value="Annulé">Annulé</option>
            </select>
          </div>
          <div className="form-item">
            <label htmlFor="cout">Observation :</label>
            <input type="text" id="observation" name="observation" placeholder="Entrez observation" required
              onChange={(e) => setObservation(e.target.value)}
              value={observation}
            />
          </div>
          <div className="form-item">
            <label htmlFor="signePar">Signé Par :</label>
            <div className="inputs-buttons-container">
              <div className="inputs-container">
                {signePar.map((inputValue, index) => (
                  <input
                    key={index}
                    type="text"
                    value={inputValue}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    placeholder={`Entrez nom${index + 1} et prénom ${index + 1}`}
                    required
                  />
                ))}
              </div>              
              <div className="buttons-container">
                <div className="ajouter-button" onClick={handleAddInput}><PersonAddIcon /></div>
                {signePar.length > 1 && <div className="supprimer-button" onClick={handleRemoveInput}><PersonRemoveIcon /></div>}
              </div>
            </div>
          </div>         
          <input type="submit" className="submit-button" value="Enregistrer" />
        </form>
  );
}
