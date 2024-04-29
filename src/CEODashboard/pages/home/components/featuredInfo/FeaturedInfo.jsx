import "./featuredInfo.scss";
import { useEffect, useState } from "react";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import TimelineIcon from '@mui/icons-material/Timeline';
import axios from "axios";
import * as React from 'react';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export default function FeaturedInfo() { 
  const [marches, setMarches] = useState([]);
  const [allOffreData, setAllOffreData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/marche`);
        setMarches(response.data);

        response = await axios.get(`${process.env.REACT_APP_API_URL}/api/offre`);
        setAllOffreData(response.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Compteur pour les motifs de sélection et de rejet
let motifsSelection = {};
let motifsRejet = {};

// Parcours des offres pour compter les motifs
allOffreData.forEach(offre => {
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

  return (
    <div className="featured">
      <div className="featuredItemContainer">
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', bottom: 0, right: 0, textAlign: 'right', color: '#4cc9f0' }}>
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
      <div className="featuredItemContainer">
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', bottom: 0, right: 0, textAlign: 'right', color: '#16E0BD' }}>
            Fréquence : {maxOccurrencesSelection}
          </div>
        </div>
        <span className="featuredTitle">Séléction</span>
        <div className="featuredMoneyContainer">
          <span className="featured-motif">{motifSelectionPlusFrequent}</span>
          <span className="featuredMoneyRate">
            <CheckRoundedIcon className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Le motif le plus fréquent</span>
      </div>
      <div className="featuredItemContainer">
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', bottom: 0, right: 0, textAlign: 'right', color: '#ff595e' }}>
            Fréquence : {maxOccurrencesRejet}
          </div>
        </div>
        <span className="featuredTitle">Rejet</span>
        <div className="featuredMoneyContainer">
          <span className="featured-motif">{motifRejetPlusFrequent}</span>
          <span className="featuredMoneyRate">
            <CloseRoundedIcon className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Le motif le plus fréquent</span>
      </div>
    </div>
  );
}
