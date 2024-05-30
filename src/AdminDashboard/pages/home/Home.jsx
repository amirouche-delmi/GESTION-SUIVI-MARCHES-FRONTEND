import "./home.scss";
import FeaturedInfo from "./components/featuredInfo/FeaturedInfo";
import WidgetLg from "./components/widgetLg/WidgetLg";
import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export default function Home() {
  const [marches, setMarches] = useState([]);
  const [marchesParMois, setMarchesParMois] = useState([]);
  const [appelDOffres, setAppelDOffres] = useState([]);
  const [offres, setOffres] = useState([]);
  const [dimOffre, setDimOffre] = useState([]);
  const [value, setValue] = useState(0);
  const [soumissionnaireClassement, setSoumissionnaireClassement] = useState([]);
  const [dimAppelDOffre, setDimAppelDOffre] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [marchesResponse, appelDOffresResponse, offresResponse, dimOffreResponse, dimAppelDOffreResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/api/marche`),
          axios.get(`${process.env.REACT_APP_API_URL}/api/appel-d-offre`),
          axios.get(`${process.env.REACT_APP_API_URL}/api/offre`),
          axios.get(`${process.env.REACT_APP_API_URL}/api/dim-offre`),
          axios.get(`${process.env.REACT_APP_API_URL}/api/dim-appel-d-offre`)
        ]);

        setMarches(marchesResponse.data);
        setAppelDOffres(appelDOffresResponse.data);
        setOffres(offresResponse.data);
        setDimOffre(dimOffreResponse.data);
        setDimAppelDOffre(dimAppelDOffreResponse.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const countByMarcheID = offres.reduce((acc, offre) => {
      acc[offre.marcheID] = (acc[offre.marcheID] || 0) + 1;
      return acc;
    }, {});

    const countMarcheIDWithThreeOrMoreOffers = Object.values(countByMarcheID).filter(count => count >= 3).length;
    const totalMarches = Object.keys(countByMarcheID).length;

    if (totalMarches !== 0) {
      setValue(((countMarcheIDWithThreeOrMoreOffers / totalMarches) * 100).toFixed(2));
    }
  }, [offres]);

  useEffect(() => {
    const marchesParMoisData = marches.reduce((acc, marche) => {
      const date = new Date(marche.createdAt);
      const mois = `${date.getFullYear()}-${date.getMonth() + 1}`;
      acc[mois] = (acc[mois] || 0) + 1;
      return acc;
    }, {});

    const formattedData = Object.keys(marchesParMoisData).map(mois => ({
      mois: `${new Date(mois).toLocaleString('default', { month: 'short' })}-${new Date(mois).getFullYear()}`,
      "Nombre total de Marchés": marchesParMoisData[mois],
    }));

    setMarchesParMois(formattedData.reverse());
  }, [marches]);

  useEffect(() => {
    const allSoumissionnaires = dimOffre.reduce((acc, offre) => {
      acc[offre.nomSoumissionnaire] = 0;
      return acc;
    }, {});

    const soumissionnaireCounts = dimOffre.reduce((acc, offre) => {
      if (offre.resultatEvaluation === 'Accepte') {
        acc[offre.nomSoumissionnaire] = (acc[offre.nomSoumissionnaire] || 0) + 1;
      }
      return acc;
    }, allSoumissionnaires);

    const formattedSoumissionnaireData = Object.keys(soumissionnaireCounts).map(nom => ({
      nom: nom,
      "Nombre de Marchés Attribués": soumissionnaireCounts[nom],
    }));

    setSoumissionnaireClassement(formattedSoumissionnaireData);
  }, [dimOffre]);


// Compteur pour les motifs de sélection et de rejet
let motifsSelection = {};
let motifsRejet = {};

// Parcours des offres pour compter les motifs
dimOffre.forEach(offre => {
  if (offre.resultatEvaluation === 'Accepte') {
    motifsSelection[offre.motif] = (motifsSelection[offre.motif] || 0) + 1;
  } else if (offre.resultatEvaluation === 'Rejete') {
    motifsRejet[offre.motif] = (motifsRejet[offre.motif] || 0) + 1;
  }
});

// Trouver le motif de sélection le plus fréquent
let motifSelectionPlusFrequent = '';
let maxOccurrencesSelection = 0;

Object.entries(motifsSelection).forEach(([motif, occurrences]) => {
  if (occurrences > maxOccurrencesSelection) {
    maxOccurrencesSelection = occurrences;
    motifSelectionPlusFrequent = motif;
  }
});

// Trouver le motif de rejet le plus fréquent
let motifRejetPlusFrequent = '';
let maxOccurrencesRejet = 0;

Object.entries(motifsRejet).forEach(([motif, occurrences]) => {
  if (occurrences > maxOccurrencesRejet) {
    maxOccurrencesRejet = occurrences;
    motifRejetPlusFrequent = motif;
  }
});

  return (
    <div className="home-admin">
      <FeaturedInfo />
      <div className="chart-infos-container">
        <div className="chartContainer">
          <ResponsiveContainer width="100%" height={345}>
            <BarChart data={marchesParMois} margin={{ top: 20, left: -15, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mois" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Nombre total de Marchés" fill="#007bff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="left-info-container">
          <span className="featuredTitle">Offres</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{offres.length} / {appelDOffres.length}</span>
            <span className="featuredMoneyRate">
              {(offres.length / (appelDOffres.length || 1)).toFixed(2)}
              {(offres.length / (appelDOffres.length || 1)).toFixed(2) >= 3 ? <ArrowUpward className="featuredIcon" /> : <ArrowDownward className="featuredIcon negative" />}
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
            text={({ value, valueMax }) => `${value} / ${valueMax}`}
          />
          <span className="featuredSub">Pourcentage d'offres bien soumissionnées</span>
        </div>
      </div>

      <div className="chart-soumissionnaires-infos-container">
        <div className="chartContainer">
          <ResponsiveContainer width="100%" height={345}>
            <BarChart data={soumissionnaireClassement} margin={{ top: 20, left: -15, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nom" tickFormatter={(value) => value.slice(0, 5)+ '...'} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Nombre de Marchés Attribués" fill="#28a745" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/*  */}
        <div className="left-info-container">
          <div className="maxOccurrencesSelection">Fréquence : {maxOccurrencesSelection}</div>
          <div className="featuredTitle">Séléction</div>
          <div className="motif">{motifSelectionPlusFrequent}</div>

          <div className="ligne"></div>

          <div className="maxOccurrencesRejet">Fréquence : {maxOccurrencesRejet}</div>
          <div className="featuredTitle">Rejet</div>
          <div className="motif">{motifRejetPlusFrequent}</div>
          
          <div className="ligne"></div>

          <div className="featuredSub">Les motifs les plus fréquents</div>
        </div>
      </div>

      <div className="homeWidgets">
        <WidgetLg />
      </div>
    </div>
  );
}
