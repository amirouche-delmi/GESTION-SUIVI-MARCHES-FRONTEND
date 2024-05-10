import "./featuredInfo.scss";
import { useEffect, useState } from "react";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import axios from "axios";
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';

export default function FeaturedInfo() { 
  const [marches, setMarches] = useState([]);
  const [allUserData, setAllUserData] = useState([]);
  const [contrats, setContrats] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/marche`);
        setMarches(response.data);

        response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user`);
        setAllUserData(response.data);

        response = await axios.get(`${process.env.REACT_APP_API_URL}/api/contrat`);
        setContrats(response.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const differenceNombreMarchesAnnee = (marches) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const previousYear = currentYear - 1;

    const marchesAnneeCourante = marches.filter(marche => new Date(marche.createdAt).getFullYear() === currentYear);
    const nombreMarchesAnneeCourante = marchesAnneeCourante.length;

    const marchesAnneePrecedente = marches.filter(marche => new Date(marche.createdAt).getFullYear() === previousYear);
    const nombreMarchesAnneePrecedente = marchesAnneePrecedente.length;

    const difference = nombreMarchesAnneeCourante - nombreMarchesAnneePrecedente;

    return difference;
  }

  const marchesParDmID = marches.reduce((acc, marche) => {
    const { dmID } = marche;
    acc[dmID] = (acc[dmID] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(marchesParDmID).map(([dmID, count]) => ({
    id: dmID,
    value: count,
    label: `${allUserData.find(user => user._id === dmID)?.nom || 'Inconnu'}`,
  }));

  return (
    <div className="featured">
      <div className="featuredItemMarche">
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', bottom: 0, right: 0, textAlign: 'right', color: '#ff595e' }}>
            Total : {marches.length}
          </div>
        </div>
        <span className="featuredTitle">Marchés</span> 
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            {new Date().getFullYear()} : {marches.filter(marche => new Date(marche.createdAt).getFullYear() === new Date().getFullYear()).length}
          </span>         
          <span className="featuredMoneyRate">
            {(differenceNombreMarchesAnnee(marches) >= 0 ? '+' : '-') + Math.abs(differenceNombreMarchesAnnee(marches))}
            {
              differenceNombreMarchesAnnee(marches) >= 0 ? 
              <ArrowUpward className="featuredIcon"/> :
              <ArrowDownward className="featuredIcon negative"/>
            } 
          </span>
        </div>
        <span className="featuredSub">Par rapport à l'année dernière</span>
      </div>

      <div className="pie-chart">
        <PieChart 
          series={[
            {
              data,
              innerRadius: 30,
              outerRadius: 65,
              paddingAngle: 5,
              cornerRadius: 5,
              cx: 60,
            },
          ]}
          slotProps={{
            legend: {
              direction: 'column',
              position: { vertical: 'middle', horizontal: 'right' },
              padding: 0,
              hidden: false,
              labelStyle: {
                fontSize: 8,
                fill: '#007bff',
              },
              itemMarkHeight: 8,
            },
          }}
        />
      </div>

      <div className="featuredItemContrat">
      <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', bottom: 0, right: 0, textAlign: 'right', color: '#ff595e' }}>
            Total : {contrats.length}
          </div>
        </div>
        <span className="featuredTitle">Contrats</span>
        <div className="featuredMoneyContainer">
          <span className="featured-contrat-money">
            {isNaN(((contrats.reduce((acc, contract) => acc + contract.cout, 0)) / (contrats.length)).toFixed(2)) ?
              0
            :
              ((contrats.reduce((acc, contract) => acc + contract.cout, 0)) / (contrats.length)).toFixed(2)
            } DA
          </span>
        </div>
        <span className="featuredSub">Cout moyen des contrats</span>
      </div>
    </div>
  );
}
