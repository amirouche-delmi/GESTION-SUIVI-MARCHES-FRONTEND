import './index.css'
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Profil from "./pages/profil/Profil";
import EvaluerOffres from "./pages/evaluation/evaluerOffres/EvaluerOffres";
import EvaluationOffres from "./pages/evaluation/evaluationOffres/EvaluationOffres";
import EvaluerOffre from "./pages/evaluation/evaluerOffre/EvaluerOffre";
import AttribuerMarches from "./pages/attribution/attribuerMarches/AttribuerMarches";
import AttributionMarche from "./pages/attribution/attributionMarche/AttributionMarche";
import AttribuerMarche from './pages/attribution/attribuerMarche/AttribuerMarche';
import ConsulterMarche from "./pages/consulterMarche/ConsulterMarche";
import Email from "./pages/email/Email";
import Messages from "./pages/messages/Messages";
import Marches from './pages/marches/Marches';

const CEODashboard = () => {

  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/profil" element={<Profil />} />

          <Route path="/evaluer-offres" element={<EvaluerOffres />} />
          <Route path="/evaluation-offres/:marcheID" element={<EvaluationOffres />} />
          <Route path="/evaluer-offre/:offreID" element={<EvaluerOffre />} />

          <Route path="/attribuer-marches" element={<AttribuerMarches />} />
          <Route path="/attribution-marche/:marcheID" element={<AttributionMarche />} />
          <Route path="/attribuer-marche/:offreID" element={<AttribuerMarche />} />

          <Route path="/marches" element={<Marches />} />
          <Route path="/consulter-marche/:marcheID" element={<ConsulterMarche />} />

          <Route path="/email" element={<Email />} />
          <Route path="/Messages" element={<Messages />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default CEODashboard;