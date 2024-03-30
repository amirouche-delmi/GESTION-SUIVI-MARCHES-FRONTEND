import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Profil from "./pages/profil/Profil";
import AjouterMarche from "./pages/ajouterMarche/AjouterMarche";
import GererMarches from "./pages/gererMarches/GererMarches";
import EditerMarche from "./pages/editerMarche/EditerMarche";
import ConsulterMarche from "./pages/consulterMarche/ConsulterMarche";
import EditerOffre from "./pages/editerOffre/EditerOffre";
import Besoins from "./pages/Besoins";
import ValidationsPrealables from "./pages/ValidationsPrealables";
import CahiersDesCharges from "./pages/CahiersDesCharges";
import AppelsDOffres from "./pages/AppelsDOffres";
import Soumissionnaires from "./pages/Soumissionnaires";
import Offres from "./pages/Offres";
import AttributionsMarches from "./pages/AttributionsMarches";
import Contrats from "./pages/Contrats";
import Email from "./pages/email/Email";
import Messages from "./pages/messages/Messages";

const DMDashboard = () => {

  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/ajouter-marche" element={<AjouterMarche/>} />
          <Route path="/gerer-marches" element={<GererMarches />} />
          <Route path="/editer-marche/:marcheID" element={<EditerMarche />} />
          <Route path="/editer-offre/:offreID" element={<EditerOffre />} />
          <Route path="/consulter-marche/:marcheID" element={<ConsulterMarche />} />
          <Route path="/besoins" element={<Besoins />} />
          <Route path="/validations-prealables" element={<ValidationsPrealables />} />
          <Route path="/cahiers-des-charges" element={<CahiersDesCharges />} />
          <Route path="/appels-d-offres" element={<AppelsDOffres />} />
          <Route path="/soumissionnaires" element={<Soumissionnaires />} />
          <Route path="/offres" element={<Offres />} />
          <Route path="/attributions-marches" element={<AttributionsMarches />} />
          <Route path="/contrats" element={<Contrats />} />
          <Route path="/email" element={<Email />} />
          <Route path="/Messages" element={<Messages />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default DMDashboard;