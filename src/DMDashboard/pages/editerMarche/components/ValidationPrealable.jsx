import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getMarche } from "../../../../actions/marcheActions";
import { toast } from "react-hot-toast";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { updateValidationPrealable } from "../../../../actions/validationPrealableActions";

export default function EditerValidationPrealableForm() {
  
  const dispatch = useDispatch();
  const marcheData = useSelector((state) => state.marcheReducer);
  const validationPrealableData = useSelector((state) => state.validationPrealableReducer);
  const userData = useSelector((state) => state.userReducer);

  const [dateValidation, setDateValidation] = useState(validationPrealableData.dateValidation ? validationPrealableData.dateValidation.split('T')[0] : new Date().toISOString().split('T')[0]);
  const [reservesRemarques, setReservesRemarques] = useState(validationPrealableData.reservesRemarques || "");
  const [validePar, setValidePar] = useState(validationPrealableData.validePar || ['']);

  const handleInputChange = (index, value) => {
    const newInputs = [...validePar];
    newInputs[index] = value;
    setValidePar(newInputs);
  };

  const handleAddInput = () => {
    setValidePar([...validePar, '']);
  };

  const handleRemoveInput = () => {
    const newInputs = [...validePar];
    newInputs.pop();
    setValidePar(newInputs);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (marcheData.validationPrealableID) {
      try {
        await dispatch(updateValidationPrealable(marcheData.validationPrealableID, { dateValidation, reservesRemarques, validePar }));
        toast.success("Mise à jour réussie.", {
          duration: 6000,
          position: "bottom-right",
        });
      } catch (error) {
        console.error(error);
        toast.error("Une erreur s'est produite lors de la mise !", {
          duration: 6000,
          position: "bottom-right",
        });
      }
    } else {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/validation-prealable`, {
          marcheID: marcheData._id,
          dmID: userData._id,
          dateValidation,
          reservesRemarques,
          validePar
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
            <label htmlFor="dateValidation">Date Validation :</label>
            <input type="date" id="dateValidation" name="dateValidation" required
              onChange={(e) => setDateValidation(e.target.value)}
              value={dateValidation}
            />
          </div>
          <div className="form-item">
            <label htmlFor="reservesRemarques">Reserves Remarques :</label>
            <input type="text" id="reservesRemarques" name="reservesRemarques" placeholder="Entrez reserves remarques" required
              onChange={(e) => setReservesRemarques(e.target.value)}
              value={reservesRemarques}
            />
          </div>
          <div className="form-item">
            <label htmlFor="exprimePar">Validé Par :</label>
            <div className="inputs-buttons-container">
              <div className="inputs-container">
                {validePar.map((inputValue, index) => (
                  <input
                    key={index}
                    type="text"
                    value={inputValue}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    placeholder={`Entrez le nom${index + 1} et le prénom ${index + 1}`}
                    required
                  />
                ))}
              </div>              
              <div className="buttons-container">
                <div className="ajouter-button" onClick={handleAddInput}>{/*Ajouter&nbsp;*/}<PersonAddIcon /></div>
                {validePar.length > 1 && <div className="supprimer-button" onClick={handleRemoveInput}>{/*Supprimer&nbsp;*/}<PersonRemoveIcon /></div>}
              </div>
            </div>
          </div>         
          <input type="submit" className="submit-button" value="Enregistrer" />
        </form>
  );
}
