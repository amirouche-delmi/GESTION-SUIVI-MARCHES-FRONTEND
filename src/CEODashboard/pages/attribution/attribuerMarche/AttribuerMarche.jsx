import "./AttribuerMarche.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { isEmpty } from "../../../../utils/utils";
import { getOffre, updateOffre } from "../../../../actions/offreActions";
import LoadingComponent from "../../../../pages/Loading/LoadingComponent";

export default function AttribuerMarche() {
  const { offreID } = useParams();
  const dispatch = useDispatch();
  const offreData = useSelector((state) => state.offreReducer);

  const [detailsProposition, setDetailsProposition] = useState('');  
  const [noteObtenue, setNoteObtenue] = useState(0);  
  const [resultatEvaluation, setResultatEvaluation] = useState('');
  const [motif, setMotif] = useState('');  

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
      setNoteObtenue(offreData.noteObtenue || 0)
      setResultatEvaluation(offreData.resultatEvaluation || '')
      setMotif(offreData.motif || '');

      const selectElement1 = document.getElementById("resultatEvaluation");
      const selectElement2 = document.getElementById("motif");
  
      if (selectElement1 && selectElement2) {
        for (let option of selectElement1.options) {
          if (option.value === offreData.resultatEvaluation) {
            option.selected = true;
            break;
          }
        }
        for (let option of selectElement2.options) {
          if (option.value === offreData.motif) {
            option.selected = true;
            break;
          }
        }
      }
    } 
     
    
  }, [offreData]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateOffre(offreID, {detailsProposition, noteObtenue, resultatEvaluation, motif }));
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
      <div className="attribuer-marche-container">
      {/* ------------------------------------------------------------ */}
        <h2>Attribuer Marché</h2>
      {/* ------------------------------------------------------------ */}
        <div className="details-propostion">
          <h4>Détails Proposition :</h4>
          <p>{detailsProposition}</p>
        </div>           
      {/* ------------------------------------------------------------ */}
        <div className="note-obtenue">
          <h4>{`Note Obtenue : ${noteObtenue} / 100`}</h4>
        </div>           
      {/* ------------------------------------------------------------ */}
        <form action="" onSubmit={handleRegister}>
          <div className="form-item">
            <label htmlFor="resultatEvaluation">Resultat d'Évaluation :</label>
            <select id="resultatEvaluation" name="resultatEvaluation" onChange={(e) => setResultatEvaluation(e.target.value)} required>
              <option value="">Choisissez</option>
              <option value="Accepte">Accepte</option>
              <option value="Rejete">Rejete</option>
            </select>
          </div>
          <div className="form-item">
            <label htmlFor="motif">Motif (Sélection / Rejet) :</label>
            <select id="motif" name="motif" onChange={(e) => setMotif(e.target.value)} required>
              <option value="">Choisissez</option>
              <option value="">----------------Sélection------------------</option>
              <option value="Conformité aux exigences techniques">Conformité aux exigences</option>
              <option value="Prix compétitif">Prix compétitif</option>
              <option value="Expérience et compétences">Expérience et compétences</option>
              <option value="Qualité des produits ou services">Qualité des produits ou services</option>
              <option value="Délais de livraison">Délais de livraison</option>
              <option value="">-----------------Rejet---------------------</option>
              <option value="Non-conformité aux exigences techniques">Non-conformité aux exigences</option>
              <option value="Prix excessif">Prix excessif</option>
              <option value="Manque d'expérience ou de compétences">Manque d'expérience</option>
              <option value="Qualité insuffisante">Qualité insuffisante</option>
              <option value="Délais de livraison non respectés">Délais de livraison non respectés</option>
            </select>
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
