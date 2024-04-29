import { useEffect, useState } from "react";
import "./widgetLg.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { LinearProgress } from "@mui/material";
import { dateParser } from "../../../utils/utils";
import { DeleteOutline, Visibility } from "@material-ui/icons";
import { toast } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { deleteMarche, resetMarcheReducer } from "../../../actions/marcheActions";
import { Link } from "react-router-dom";
import { resetBesoinReducer } from "../../../actions/besoinActions";
import { resetValidationPrealableReducer } from "../../../actions/validationPrealableActions";
import { resetCahierDesChargesReducer } from "../../../actions/cahierDesChargesActions";
import { resetAppelDOffreReducer } from "../../../actions/appelDOffreActions";

export default function WidgetLg() {

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userReducer);
  const [marches, setMarches] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/marche`);
        setMarches(response.data.slice(0, 5));
       
        await dispatch(resetMarcheReducer());
        await dispatch(resetBesoinReducer());
        await dispatch(resetValidationPrealableReducer());
        await dispatch(resetCahierDesChargesReducer());
        await dispatch(resetAppelDOffreReducer());

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer ce marché ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteMarche(id));
        toast.success("Le marché a été supprimé avec succès.", {
          duration: 6000,
          position: "bottom-right"
        });
      }
    })
  }

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Nouveaux Marchés</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Intitulé</th>
          <th className="widgetLgTh">État d'avancement</th>
          <th className="widgetLgTh">Créé le</th>
          <th className="widgetLgTh">Mis à jour le</th>
          <th className="widgetLgTh">Action</th>
        </tr>
        {
          marches.map((marche) => {
            return (
              <tr className="widgetLgTr">
                <td className="widgetLgName">{marche.intitule}</td>
                <td className="linearProgressContainer">
                  <LinearProgress variant="determinate" value={marche.etape * 10} className="linearProgress" />
                  <div>{marche.etape * 10}%</div>
                </td>
                <td className="widgetLgDate">{dateParser(marche.createdAt)}</td>
                <td className="widgetLgDate">{dateParser(marche.updatedAt)}</td>
                <td className="marcheAction">
                  <Link to={"/consulter-marche/" + marche._id}>
                    <button className="consulterButton">
                      <Visibility className="consulterIcon" />
                      Consulter
                    </button>
                  </Link>
                  <Link to={"/editer-marche/" + marche._id}>
                    <button className="productListEdit">Éditer</button>
                  </Link>
                  <DeleteOutline
                    className="productListDelete"
                    onClick={() => handleDelete(marche._id)}
                  />
                </td>
              </tr>
            )
          })
        }   
      </table>
    </div>
  );
}
