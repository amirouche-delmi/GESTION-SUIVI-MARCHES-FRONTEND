import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getMarche } from "../../../../actions/marcheActions";
import { updateBesoin } from "../../../../actions/besoinActions";
import { toast } from "react-hot-toast";

export default function EditerBesoinForm() {

  const dispatch = useDispatch();
  const marcheData = useSelector((state) => state.marcheReducer);
  const besoinData = useSelector((state) => state.besoinReducer);
  const userData = useSelector((state) => state.userReducer);

  const [intitule, setIntitule] = useState(besoinData.intitule || "");
  const [description, setDescription] = useState(besoinData.description || "");
  const [dateExpression, setDateExpression] = useState(besoinData.dateExpression ? besoinData.dateExpression.split('T')[0] : new Date().toISOString().split('T')[0]);
  const [objectifs, setObjectifs] = useState(besoinData.objectifs || "");
  const [estimationCout, setEstimationCout] = useState(besoinData.estimationCout || 0);
  const [exprimePar, setExprimePar] = useState(besoinData.exprimePar || "");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (marcheData.besoinID) {
      try {
        await dispatch(updateBesoin(marcheData.besoinID, { intitule, description, dateExpression, objectifs, estimationCout, exprimePar }));
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
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/besoin`,
        data: {
          marcheID: marcheData._id,
          dmID: userData._id,
          intitule,
          description,
          dateExpression,
          objectifs,
          estimationCout,
          exprimePar
        }   
      })
      .then((res) => {
        dispatch(getMarche(marcheData._id))
        toast.success("Enregistrement réussi.", {
          duration: 6000,
          position: "bottom-right"
      });
      })
      .catch((err) => {
        console.log(err)
        toast.error("Une erreur s'est produite lors de l'enregistrement !", {
          duration: 6000,
          position: "bottom-right"
      });
      });
    }
  }

  return (
        <form onSubmit={handleRegister}>
          <div className="form-item">
            <label htmlFor="intitule">Intitulé Besoin :</label>
            <input type="text" id="intitule" name="intitule" placeholder="Entrez l'intitulé du besoin" required
              onChange={(e) => setIntitule(e.target.value)}
              value={intitule}
            /> 
          </div>
          <div className="form-item">
            <label htmlFor="description">Description Besoin :</label>
            <input type="text" id="description" name="description" placeholder="Entrez la description du besoin" required
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>
          <div className="form-item">
            <label htmlFor="dateExpression">Date Expression :</label>
            <input type="date" id="dateExpression" name="dateExpression" required
              onChange={(e) => setDateExpression(e.target.value)}
              value={dateExpression}
            />
          </div>
          <div className="form-item">
            <label htmlFor="objectifs">Objectifs :</label>
            <input type="text" id="Objectifs" name="Objectifs" placeholder="Entrez les bjectifs du besoin" required
              onChange={(e) => setObjectifs(e.target.value)}
              value={objectifs}
            />
          </div>
          <div className="form-item">
            <label htmlFor="estimationCout">Estimation Cout :</label>
            <input type="number" id="estimationCout" name="estimationCout" required
              onChange={(e) => setEstimationCout(e.target.value)}
              value={estimationCout}
            />
          </div>
          <div className="form-item">
            <label htmlFor="exprimePar">Exprimé Par :</label>
            <input type="text" id="exprimePar" name="exprimePar" placeholder="Entrez le nom et le prénom" required
              onChange={(e) => setExprimePar(e.target.value)}
              value={exprimePar}
            />
          </div>
          <input type="submit" className="submit-button" value="Enregistrer" />
        </form>
  );
}
