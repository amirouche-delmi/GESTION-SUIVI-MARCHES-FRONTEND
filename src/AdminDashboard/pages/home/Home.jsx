import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.scss";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import TimelineIcon from '@mui/icons-material/Timeline';
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';


export default function Home() {
  const userData = useSelector((state) => state.userReducer);
  const [marches, setMarches] = useState([]);
  const [marchesParMois, setMarchesParMois] = useState([]);
  const [appelDOffres, setAppelDOffres] = useState([])
  const [offres, setOffres] = useState([])
  const [value, setValue] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/marche`);
        setMarches(response.data);

        response = await axios.get(`${process.env.REACT_APP_API_URL}/api/appel-d-offre`);
        setAppelDOffres(response.data);
        
        response = await axios.get(`${process.env.REACT_APP_API_URL}/api/offre`);
        setOffres(response.data);

        setValue((offres.length / 3 * 100 / appelDOffres.length).toFixed(2))
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [value]);

  const countMarchesParMois = () => {
    const marcheParMois = {};
    marches.forEach((marche) => {
      const date = new Date(marche.createdAt);
      const mois = `${date.getFullYear()}-${date.getMonth() + 1}`;
      marcheParMois[mois] = (marcheParMois[mois] || 0) + 1;
    });
    return marcheParMois;
  };

  useEffect(() => {
    const marchesParMoisData = countMarchesParMois();
    const formattedData = Object.keys(marchesParMoisData).map((mois) => ({
      mois: `${new Date(mois).toLocaleString('default', { month: 'short' })}-${new Date(mois).getFullYear()}`,
      "Nombre total de Marchés": marchesParMoisData[mois],
    }));
    setMarchesParMois(formattedData.reverse());
  }, [marches]);

  return (
    <div className="home-admin">
      <FeaturedInfo />
      <div className="chart-infos-container">
        <div className="chartContainer">
          <ResponsiveContainer width="100%" height={345}>
            <BarChart
              data={marchesParMois}
              margin={{ top: 20, left: -15, right: 20}}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mois" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Nombre total de Marchés" fill="#007bff" />
              {/* <Bar dataKey="Nombre de Marchés créés" fill="#28a745" /> */}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="left-info-container">
          <span className="featuredTitle">Offres</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{offres.length} / {appelDOffres.length}</span>
            <span className="featuredMoneyRate">
              {(offres.length / (appelDOffres.length  || 1)).toFixed(2)}
              {
                (offres.length / (appelDOffres.length || 1)).toFixed(2) >= 3 ?
                  <ArrowUpward className="featuredIcon"/>
                :
                  <ArrowDownward className="featuredIcon negative"/>
              } 
            </span>
          </div>
          <span className="featuredSub">Moyenne offres par appel d'offre</span>
          <Gauge
            width={180} height={150}
            value={value}
            startAngle={0}
            endAngle={260}
            innerRadius="75%"
            sx={{
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 15,
                transform: 'translate(0px, 0px)',
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: '#28a745',
              },
            }}
            text={
              ({ value, valueMax }) => `${value} / ${valueMax}`
            }
          />
          <span className="featuredSub">Pourcentage d'offres bien soumissionnées</span>
          </div>
      </div>
      
      <div className="homeWidgets">
        <WidgetLg />
      </div>
    </div>
  );
}
