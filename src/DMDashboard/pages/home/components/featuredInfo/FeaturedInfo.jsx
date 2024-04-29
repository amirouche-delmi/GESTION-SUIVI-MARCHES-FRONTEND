import "./featuredInfo.scss";
import { useEffect, useState } from "react";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import axios from "axios";
import { useSelector } from "react-redux";
import PercentIcon from '@mui/icons-material/Percent';

export default function FeaturedInfo() {

  const userData = useSelector((state) => state.userReducer);
  const [marches, setMarches] = useState([])
  const [appelDOffres, setAppelDOffres] = useState([])
  const [offres, setOffres] = useState([])
  const [contrats, setContrats] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/marche`);
        setMarches(response.data);

        response = await axios.get(`${process.env.REACT_APP_API_URL}/api/appel-d-offre`);
        setAppelDOffres(response.data);
        
        response = await axios.get(`${process.env.REACT_APP_API_URL}/api/offre`);
        setOffres(response.data);
        
        response = await axios.get(`${process.env.REACT_APP_API_URL}/api/contrat`);
        setContrats(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Marchés</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            {marches.filter(item => item.dmID === userData._id).length} / {marches.length}</span>
          <span className="featuredMoneyRate">
          {
            marches.length === 0 ? 
            '0.00' :
            (marches.filter(item => item.dmID === userData._id).length / marches.length * 100).toFixed(2)
          } <PercentIcon  className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Pourcentage des marchés créés</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Offres</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{offres.filter(item => item.dmID === userData._id).length} / {appelDOffres.filter(item => item.dmID === userData._id).length}</span>
          <span className="featuredMoneyRate">
            {(offres.filter(item => item.dmID === userData._id).length / (appelDOffres.filter(item => item.dmID === userData._id).length  || 1)).toFixed(2)}
            {
              (offres.filter(item => item.dmID === userData._id).length / (appelDOffres.filter(item => item.dmID === userData._id).length || 1)).toFixed(2) >= 3 ?
                <ArrowUpward className="featuredIcon"/>
              :
                <ArrowDownward className="featuredIcon negative"/>
            } 
          </span>
        </div>
        <span className="featuredSub">Moyenne offres par appel d'offre</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Contrats</span>
        <div className="featuredMoneyContainer">
          <span className="featured-contrat-money">
            {isNaN(((contrats.filter(item => item.dmID === userData._id).reduce((acc, contract) => acc + contract.cout, 0)) / (contrats.filter(item => item.dmID === userData._id).length)).toFixed(2)) ?
              0
            :
              ((contrats.filter(item => item.dmID === userData._id).reduce((acc, contract) => acc + contract.cout, 0)) / (contrats.filter(item => item.dmID === userData._id).length)).toFixed(2)
            } DA
          </span>
        </div>
        <span className="featuredSub">Cout moyen des contrats</span>
      </div>
    </div>
  );
}
