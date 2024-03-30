import { useEffect, useState } from "react";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import TimelineIcon from '@mui/icons-material/Timeline';
import axios from "axios";
import { useSelector } from "react-redux";
import PercentIcon from '@mui/icons-material/Percent';

export default function FeaturedInfo() {

  const userData = useSelector((state) => state.userReducer);
  const [marches, setMarches] = useState([])
  const [appelDOffres, setAppelDOffres] = useState([])
  const [offres, setOffres] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/marche`);
        setMarches(response.data);

        response = await axios.get(`${process.env.REACT_APP_API_URL}/api/appel-d-offre`);
        setAppelDOffres(response.data);
        
        response = await axios.get(`${process.env.REACT_APP_API_URL}/api/offre`);
        setOffres(response.data);
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
          {(marches.filter(item => item.dmID === userData._id).length / marches.length * 100).toFixed(2)} <PercentIcon  className="featuredIcon negative"/>
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
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <TimelineIcon className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Cout moyen des contrats</span>
      </div>
    </div>
  );
}
