import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMarche } from "../../../actions/marcheActions";
import "./ConsulterMarche.scss";
import { useParams } from "react-router-dom";
import { dateParser, isEmpty } from "../../../utils/utils";
import { getBesoin } from "../../../actions/besoinActions";
import { getValidationPrealable } from "../../../actions/validationPrealableActions";
import { getCahierDesCharges } from "../../../actions/cahierDesChargesActions";
import { getAppelDOffre } from "../../../actions/appelDOffreActions";
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Offres from "./ConsulterOffreList";
import { getAllSoumissionnaire } from "../../../actions/soumissionnaireActions";
import { getAllOffre } from "../../../actions/offreActions";

export default function ConsulterMarche() {
  const { marcheID } = useParams();
  const dispatch = useDispatch();
  const marcheData = useSelector((state) => state.marcheReducer);
  const besoinData = useSelector((state) => state.besoinReducer);
  const validationPrealableData = useSelector((state) => state.validationPrealableReducer);
  const cahierDesChargesData = useSelector((state) => state.cahierDesChargesReducer);
  const appelDOffreData = useSelector((state) => state.appelDOffreReducer);  
  const allOffreData = useSelector((state) => state.allOffreReducer);
  const allSoumissionnaireData = useSelector((state) => state.allSoumissionnaireReducer);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getMarche(marcheID));
        if (marcheData.besoinID) {
          await dispatch(getBesoin(marcheData.besoinID));
        }
        if (marcheData.validationPrealableID) {
          await dispatch(getValidationPrealable(marcheData.validationPrealableID));
        }
        if (marcheData.cahierDesChargesID) {
          await dispatch(getCahierDesCharges(marcheData.cahierDesChargesID));
        }
        if (marcheData.appelDOffreID) {
          await dispatch(getAppelDOffre(marcheData.appelDOffreID));   
          await dispatch(getAllOffre());    
          await dispatch(getAllSoumissionnaire()); 
        }
        
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des données du marché :", error);
      }
    };    
    fetchData();  
  }, [dispatch, marcheData._id]);

  return (
    <div className="consulter-marche-container">
      {(isEmpty(marcheData)) ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
          <p style={{ 
            textAlign: "center", 
            fontSize: "1.1rem",
            lineHeight: "1.5", 
          }}>
            Chargement...
          </p>
        </div>
      ) : (
        <> 
          {/* ------------------------------------------------------------ */}
          <h2>Consulter Marché</h2>
          {/* ------------------------------------------------------------ */}
          <div className="progress-bar">
            <div className="step-item">
              <div className="step-text">Marché</div>
              <div className={"step-color" + (marcheData.etape > 0  ? " completed-step" : " active-step")}></div>
            </div>
            <div className="step-item">
              <div className="step-text">Besoin</div>
              <div className={"step-color" + (marcheData.etape === 1 ? " active-step" : (marcheData.etape > 1 ? " completed-step" : ""))}></div>
            </div>
            <div className="step-item">
              <div className="step-text">Validation Préalable</div>
              <div className={"step-color" + (marcheData.etape === 2 ? " active-step" : (marcheData.etape > 2 ? " completed-step" : ""))}></div>
            </div>
            <div className="step-item">
              <div className="step-text">Cahier des Charges</div>
              <div className={"step-color" + (marcheData.etape === 3 ? " active-step" : (marcheData.etape > 3 ? " completed-step" : ""))}></div>
            </div>
            <div className="step-item">
              <div className="step-text">Appel d'Offre</div>
              <div className={"step-color" + (marcheData.etape === 4 ? " active-step" : (marcheData.etape > 4 ? " completed-step" : ""))}></div>
            </div>
            <div className="step-item">
              <div className="step-text">Offres</div>
              <div className={"step-color" + (marcheData.etape === 5 ? " active-step" : (marcheData.etape > 5 ? " completed-step" : ""))}></div>
            </div>
            <div className="step-item">
              <div className="step-text">Évaluation Offres</div>
              <div className={"step-color" + (marcheData.etape === 6 ? " active-step" : (marcheData.etape > 5 ? " completed-step" : ""))}></div>
            </div>
            <div className="step-item">
              <div className="step-text">Attribution Marché</div>
              <div className={"step-color" + (marcheData.etape === 7 ? " active-step" : (marcheData.etape > 6 ? " completed-step" : ""))}></div>
            </div>
            <div className="step-item">
              <div className="step-text">Contrat</div>
              <div className={"step-color" + (marcheData.etape === 8 ? " active-step" : (marcheData.etape > 7 ? " completed-step" : ""))}></div>
            </div>
          </div>
          {/* ------------------------------------------------------------ */}    
          <div className="details-container">
            <Accordion>
              <AccordionSummary className="accordion-summary" expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                <div className="accordion-title">Marché</div>
              </AccordionSummary>
              <AccordionDetails className="accordion-details">
                <label className="detail-label">Intitulé :</label> 
                <div className="detail-content">{marcheData.intitule}</div>
              </AccordionDetails>
              <AccordionDetails className="accordion-details">
                <label className="detail-label">Description :</label> 
                <div className="detail-content">{marcheData.description}</div>
              </AccordionDetails>          
            </Accordion>
            {/* ------------------------------------------------------------ */}
            {!isEmpty(besoinData) && (
              <Accordion>
                <AccordionSummary className="accordion-summary" expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                  <div className="accordion-title">Besoin</div>
                </AccordionSummary>
                <AccordionDetails className="accordion-details">
                  <label className="detail-label">Intitulé :</label> 
                  <div className="detail-content">{besoinData.intitule}</div>
                </AccordionDetails>
                <AccordionDetails className="accordion-details">
                  <label className="detail-label">Description :</label> 
                  <div className="detail-content">{besoinData.description}</div>
                </AccordionDetails>          
                <AccordionDetails className="accordion-details">
                  <label className="detail-label">Date Expression :</label> 
                  <div className="detail-content">{dateParser(besoinData.dateExpression)}</div>
                </AccordionDetails>          
                <AccordionDetails className="accordion-details">
                  <label className="detail-label">Objectifs :</label> 
                  <div className="detail-content">{besoinData.objectifs}</div>
                </AccordionDetails>  
                <AccordionDetails className="accordion-details">
                  <label className="detail-label">Estimation Cout :</label> 
                  <div className="detail-content">{besoinData.estimationCout}</div>
                </AccordionDetails>          
                <AccordionDetails className="accordion-details">
                  <label className="detail-label">Exprime Par :</label> 
                  <div className="detail-content">{besoinData.exprimePar}</div>
                </AccordionDetails>          
              </Accordion>
            )}
            {/* ------------------------------------------------------------ */}
            {!isEmpty(validationPrealableData) && (
              <Accordion>
                <AccordionSummary className="accordion-summary" expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                  <div className="accordion-title">Validation Préalable</div>
                </AccordionSummary>
                <AccordionDetails className="accordion-details">
                  <label className="detail-label">Date Validation :</label> 
                  <div className="detail-content">{dateParser(validationPrealableData.dateValidation)}</div>
                </AccordionDetails>
                <AccordionDetails className="accordion-details">
                  <label className="detail-label">Reserves Remarques :</label> 
                  <div className="detail-content">{validationPrealableData.reservesRemarques}</div>
                </AccordionDetails>          
                <AccordionDetails className="accordion-details">
                  <label className="detail-label">Validé Par :</label> 
                  <div className="detail-content">
                    {validationPrealableData.validePar.length > 1 ? (
                      <span>{validationPrealableData.validePar.map((v, index) => (index === 0 ? v : ', ' + v))}</span>
                    ) : (
                      <span>{validationPrealableData.validePar[0]}</span>
                    )}
                </div>
                </AccordionDetails>                 
              </Accordion>
            )}
            {/* ------------------------------------------------------------ */}
            {!isEmpty(cahierDesChargesData) && (
              <Accordion>
                <AccordionSummary className="accordion-summary" expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                  <div className="accordion-title">Cahier Des Charges</div>
                </AccordionSummary>
                <AccordionDetails className="accordion-details">
                  <label className="detail-label">Intitule :</label> 
                  <div className="detail-content">{cahierDesChargesData.intitule}</div>
                </AccordionDetails>
                <AccordionDetails className="accordion-details">
                  <label className="detail-label">Description Succincte :</label> 
                  <div className="detail-content">{cahierDesChargesData.descriptionSuccincte}</div>
                </AccordionDetails>          
                <AccordionDetails className="accordion-details">
                  <label className="detail-label">Date Finalisation :</label> 
                  <div className="detail-content">{dateParser(cahierDesChargesData.dateFinalisation)}</div>
                </AccordionDetails>          
                <AccordionDetails className="accordion-details">
                  <label className="detail-label">Validé Par :</label> 
                  <div className="detail-content">{cahierDesChargesData.validePar}</div>
                </AccordionDetails>          
                <AccordionDetails className="accordion-details">
                  <label className="detail-label">Participants :</label> 
                  <div className="detail-content">
                    {cahierDesChargesData.participants.length > 1 ? (
                      <span>{cahierDesChargesData.participants.map((v, index) => (index === 0 ? v : ', ' + v))}</span>
                    ) : (
                      <span>{cahierDesChargesData.participants[0]}</span>
                    )}
                  </div>
                </AccordionDetails>          
                <AccordionDetails className="accordion-details">
                  <label className="detail-label">Exemplaire Numerique :</label> 
                  <a className="detail-content" href={`${process.env.REACT_APP_API_URL}/api/uploads/cahierDesCharges/${cahierDesChargesData._id}.pdf`} target="_blank" rel="noopener noreferrer">Ouvrir le fichier dans un nouvel onglet</a>
                </AccordionDetails>                 
                <embed src={`${process.env.REACT_APP_API_URL}/api/uploads/cahierDesCharges/${cahierDesChargesData._id}.pdf`} type="application/pdf" width="100%" height="400px" />
              </Accordion>
            )}
            {/* -------------------------------------------------------------- */}
            {!isEmpty(appelDOffreData) && (
              <Accordion>
                <AccordionSummary className="accordion-summary" expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                  <div className="accordion-title">Appel d'offre</div>
                </AccordionSummary>
                <AccordionDetails className="accordion-details">
                  <label className="detail-label">Date Lancement :</label> 
                  <div className="detail-content">{dateParser(appelDOffreData.dateLancement)}</div>
                </AccordionDetails>
                <AccordionDetails className="accordion-details">
                  <label className="detail-label">Date Cloture :</label> 
                  <div className="detail-content">{dateParser(appelDOffreData.dateCloture)}</div>
                </AccordionDetails>         
                <AccordionDetails className="accordion-details">
                  <label className="detail-label">Medias Utilises :</label> 
                  <div className="detail-content">
                    {appelDOffreData.mediasUtilises.length > 1 ? (
                      <span>{appelDOffreData.mediasUtilises.map((v, index) => (index === 0 ? v : ', ' + v))}</span>
                    ) : (
                      <span>{appelDOffreData.mediasUtilises[0]}</span>
                    )}
                </div>
                </AccordionDetails>                 
                <AccordionDetails className="accordion-details">
                  <label className="detail-label">Redacteurs :</label> 
                  <div className="detail-content">
                    {appelDOffreData.redacteurs.length > 1 ? (
                      <span>{appelDOffreData.redacteurs.map((v, index) => (index === 0 ? v : ', ' + v))}</span>
                    ) : (
                      <span>{appelDOffreData.redacteurs[0]}</span>
                    )}
                </div>
                </AccordionDetails>                 
              </Accordion>
            )}
            {/* ------------------------------------------------------------ */}
            {(!isEmpty(appelDOffreData) && !isEmpty(allOffreData) && !isEmpty(allSoumissionnaireData)) && (
              <>
                <Accordion>
                  <AccordionSummary className="accordion-summary" expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                    <div className="accordion-title">Offres</div>
                  </AccordionSummary>
                  <Offres />   
                </Accordion>
              </>         
            )}
            {/* ------------------------------------------------------------ */}
          </div>
        </>
      )}
    </div>
  )
}


