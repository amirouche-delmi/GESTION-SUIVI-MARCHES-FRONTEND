import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getMarche, updateMarche } from "../../../../actions/marcheActions";
import { toast } from "react-hot-toast";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { updateValidationPrealable } from "../../../../actions/validationPrealableActions";
import { updateContrat } from "../../../../actions/contratActions";

export default function Cloturer() {
  
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

  const handleRegister = async (e) => {
    e.preventDefault();
    if (marcheData.contratID) {
      try {
        await dispatch(updateContrat(marcheData.contratID, { delaiRealisation, cout, statut, observation, signePar }));
        toast.success("Mise à jour réussie !", {
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
        toast.success("Enregistrement réussi !", {
            duration: 6000,
            position: "bottom-right"
          }
        )
      } catch (error) {
        console.log(error);
        toast.error("Une erreur s'est produite lors de l'enregistrement.", {
            duration: 6000,
            position: "bottom-right"
          }
        )
      }
    }
  };

  const cloturer = async (id) => {
    try {
      await dispatch(updateMarche(id, { intitule: marcheData.intitule, description: marcheData.description, etape: 10 }));
      toast.success("Mise à jour réussie !", {
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
  }
  const nePasCloturer = async (id) => {
    try {
      await dispatch(updateMarche(id, {intitule: marcheData.intitule, description: marcheData.description, etape: 9 }));
      toast.success("Mise à jour réussie !", {
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
  }

  return (
    <div className="cloturer-container">
      <p>
        La clôture d'un marché signifie que toutes les transactions commerciales liées à ce marché ont été finalisées et que le processus d'achat ou de vente associé est terminé.
      </p>
      <div className="cloturer-buttons-cntainer">
        {marcheData.etape === 9 ? (
          <button className="cloturer-button" onClick={() => cloturer(marcheData._id)}>Clôturer</button>
        ) : (
          <button className="ne-pas-cloturer-button" onClick={() => nePasCloturer(marcheData._id)}>Ne pas clôturer</button>
        )}
      </div>
    </div>        
  );
}
