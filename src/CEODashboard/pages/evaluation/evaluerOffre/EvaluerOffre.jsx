import "./EvaluerOffre.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { isEmpty } from "../../../../utils/utils";
import { getOffre, updateOffre } from "../../../../actions/offreActions";
import { Link } from 'react-router-dom';
import LoadingComponent from "../../../../pages/Loading/LoadingComponent";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';

export default function EvaluerOffre() {
  const { offreID } = useParams();
  const dispatch = useDispatch();
  const offreData = useSelector((state) => state.offreReducer);
  
  const [detailsProposition, setDetailsProposition] = useState('');

  const [coutMoinsDisante, setCoutMoinsDisante] = useState(0);
  const [coutOffre, setCoutOffre] = useState(0);
  const [noteCalcule, setNoteCalcule] = useState(0);

  const [criteres, setCriteres] = useState(['']);
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
      setDetailsProposition(offreData.detailsProposition || '');
      !isEmpty(offreData.membresCommission) && setMembresCommission(offreData.membresCommission);
      !isEmpty(offreData.criteres) && setCriteres(offreData.criteres);
    }
  }, [offreData]);

  const handleInputCriteresChange = (index, value, propertyName) => {
    const updatedCriteres = [...criteres];
    if (propertyName !== "nom") {
      updatedCriteres[index] = { ...updatedCriteres[index], [propertyName]: Number(value) };
    } else {
      updatedCriteres[index] = { ...updatedCriteres[index], [propertyName]: value };
    }
    setCriteres(updatedCriteres);
  };
  
  const handleAddCriteresInput = () => {
    setCriteres([...criteres, { nom: '', note: '', poids: '' }]);
  };  
  const handleRemoveCriteresInput = () => {
    if (criteres.length > 1) {
      const updatedCriteres = [...criteres];
      updatedCriteres.pop();
      setCriteres(updatedCriteres);
    }
  };

  const handleInputMembresChange = (index, value) => {
    const newInputs = [...membresCommission];
    newInputs[index] = value;
    setMembresCommission(newInputs);
  };
  const handleAddMemebresInput = () => {
    setMembresCommission([...membresCommission, '']);
  };
  const handleRemoveMembresInput = () => {
    const newInputs = [...membresCommission];
    newInputs.pop();
    setMembresCommission(newInputs);
  };

  const calculerNoteObtenue = () => {
    if (isEmpty(criteres)) {
      return 0;
    }
    
    const sommeProduits = criteres.reduce((total, critere) => {
      return total + (critere.note * critere.poids);
    }, 0);
    
    const sommePoids = criteres.reduce((total, critere) => {
      return total + critere.poids;
    }, 0);
    
    const note = Math.floor(sommePoids !== 0 ? sommeProduits / sommePoids : 0)

    return note;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const noteObtenue = calculerNoteObtenue()
      await dispatch(updateOffre(offreID, { detailsProposition, criteres, noteObtenue, membresCommission }));

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

  const calculerNote = () => {
    const note = Math.floor(100 * coutMoinsDisante / coutOffre);
    setNoteCalcule(note);
  }  

  return (
    isEmpty(offreData) ? (
      <LoadingComponent />
    ) : ( 
      <div className="evaluer-offre-container">
        {/* ------------------------------------------------------------ */}
        <h2>Évaluer Offre</h2>
        {/* ------------------------------------------------------------ */}
        <div className="details-note-container">
          <div className="details-propostion">
            <h4>Détails Proposition :</h4>
            <p>{detailsProposition}</p>
          </div>           
          <div className="claculer-note-cout">
            <h4>Calculer Note Coût</h4>
            <div className="clacule-item">
              <label htmlFor="coutMoinsDisante">Coût moins disante : </label>
              <input type="number" id="coutMoinsDisante" name="coutMoinsDisante" placeholder="Entrez coût moins disante"
                onChange={(e) => setCoutMoinsDisante(e.target.value)}
                value={coutMoinsDisante}
              />
            </div>
            <div className="clacule-item">
              <label htmlFor="coutOffre">Coût de cette offre : </label>
              <input type="number" id="coutOffre" name="coutOffre" placeholder="Entrez coût de cette offre"
                onChange={(e) => setCoutOffre(e.target.value)}
                value={coutOffre}
              />
            </div>
            <div className="button-note">
              <button onClick={calculerNote}>Calculer</button>
              <div>{noteCalcule} / 100</div>
            </div>
          </div>           

        </div>
        {/* ------------------------------------------------------------ */}
        <form onSubmit={handleRegister}>
          <div className="criteres-container">
            <div className="criteres-items">
              <div className="titles">
                <div>Non Critère</div>
                <div>Note Critère</div>
                <div>Poids Critère</div>
              </div>
              {criteres.map((critere, index) => (
              <div key={index} className="critere-item">
                <div className="item">
                  <input                  
                    type="text"
                    id={`nomCritere${index + 1}`}
                    name={`nomCritere${index + 1}`}
                    value={critere.nom}
                    onChange={(e) => handleInputCriteresChange(index, e.target.value, "nom")}
                    placeholder={`Entrez nom critère ${index + 1}`}
                    required
                    />
                </div>
                <div>
                  <input                  
                    type="number"
                    id={`noteCritere${index + 1}`}
                    name={`noteCritere${index + 1}`}
                    value={critere.note}
                    onChange={(e) => handleInputCriteresChange(index, e.target.value, "note")}
                    placeholder={`Entrez note critère ${index + 1}`}
                    required
                    />
                </div>
                <div>
                  <input                  
                    type="number"
                    id={`poidsCritere${index + 1}`}
                    name={`poidsCritere${index + 1}`}
                    value={critere.poids}
                    onChange={(e) => handleInputCriteresChange(index, e.target.value, "poids")}
                    placeholder={`Entrez poids critère ${index + 1}`}
                    required
                    />
                </div>
              </div>
              ))}
            </div>
            <div className="add-delete-critere">
              <div className="add-critere-btn" onClick={handleAddCriteresInput}><AddOutlinedIcon /></div>
                {criteres.length > 1 && <div className="delete-critere-btn" onClick={handleRemoveCriteresInput}><RemoveOutlinedIcon /></div>}
              </div>
            </div>

          {/* ------------------------------------------- */}

            <div className="form-item">
              <label htmlFor="membresCommission">Membres Commission :</label>
              <div className="inputs-buttons-container">
                <div className="inputs-container">
                  {membresCommission.map((inputValue, index) => (
                    <input
                      key={index}
                      type="text"
                      value={inputValue}
                      onChange={(e) => handleInputMembresChange(index, e.target.value)}
                      placeholder={`Entrez nom et prénom ${index + 1}`}
                      required
                    />
                  ))}
                </div>              
                <div className="buttons-container">
                  <div className="ajouter-button" onClick={handleAddMemebresInput}><PersonAddIcon/></div>
                  {membresCommission.length > 1 && <div className="supprimer-button" onClick={handleRemoveMembresInput}><PersonRemoveIcon /></div>}
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
