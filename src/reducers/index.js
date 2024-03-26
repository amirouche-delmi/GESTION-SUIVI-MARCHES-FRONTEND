import { combineReducers } from 'redux';
import userReducer from './userReducer';
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

export default combineReducers({
  userReducer,
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
});