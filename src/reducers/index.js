import { combineReducers } from 'redux';
import userReducer from './userReducer';
import allUserReducer from './allUserReducer';
import marcheReducer from './marcheReducer';
import allMarcheReducer from './allMarcheReducer';
import besoinReducer from './besoinReducer';
import validationPrealableReducer from './validationPrealableReducer';
import cahierDesChargesReducer from './cahierDesChargesReducer';
import appelDOffreReducer from './appelDOffreReducer';
import allOffreReducer from './allOffreReducer';
import offreReducer from './offreReducer';
import allSoumissionnaireReducer from './allSoumissionnaireReducer';
import soumissionnaireReducer from './soumissionnaireReducer';
import attributionMarcheReducer from './attributionMarcheReducer';
import contratReducer from './contratReducer';

export default combineReducers({
  userReducer,
  allUserReducer,
  marcheReducer,
  allMarcheReducer,
  besoinReducer,
  validationPrealableReducer,
  cahierDesChargesReducer,
  appelDOffreReducer,
  allOffreReducer,
  offreReducer,
  allSoumissionnaireReducer,
  soumissionnaireReducer,
  attributionMarcheReducer,
  contratReducer,
});