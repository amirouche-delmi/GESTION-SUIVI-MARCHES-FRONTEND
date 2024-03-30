import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  AddCircleOutlineOutlined,
  Business,
  FormatListBulleted,
  PlaylistAddCheck,
  Description,
  Assignment,
  Money,
  Group,
} from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Tableau de bord</h3>
          <ul className="sidebarList">
            <li className={`sidebarListItem ${location.pathname === '/' ? 'active' : ''}`}>
              <Timeline className="sidebarIcon" />
              <Link to="/" className="link">
                Analytique
              </Link>
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Menu rapide</h3>
          <ul className="sidebarList">
            <li className={`sidebarListItem ${location.pathname === '/profil' ? 'active' : ''}`}>
              <PermIdentity className="sidebarIcon" />
              <Link to="/profil" className="link">
                Profil
              </Link>
            </li>
            <li className={`sidebarListItem ${location.pathname === '/gerer-utilisateurs' ? 'active' : ''}`}>
              <ManageAccountsOutlinedIcon className="sidebarIcon" />
              <Link to="/gerer-utilisateurs" className="link">
                Gerer Utilisateurs
              </Link>
            </li>
            <li className={`sidebarListItem ${location.pathname === '/gerer-marches' ? 'active' : ''}`}>
              <Business className="sidebarIcon" />
              <Link to="/gerer-marches" className="link">
                Gérer Marchés
              </Link>
            </li>
            <li className={`sidebarListItem ${location.pathname === '/besoins' ? 'active' : ''}`}>
              <FormatListBulleted className="sidebarIcon" />
              <Link to="/besoins" className="link">
                Besoins
              </Link>
            </li>
            <li style={{ whiteSpace: 'nowrap' }} className={`sidebarListItem ${location.pathname === '/validations-prealables' ? 'active' : ''}`}>
              <PlaylistAddCheck className="sidebarIcon" />
              <Link to="/validations-prealables" className="link">
                Validations Préalables
              </Link>
            </li>
            <li style={{ whiteSpace: 'nowrap' }} className={`sidebarListItem ${location.pathname === '/cahiers-des-charges' ? 'active' : ''}`}>
              <Description className="sidebarIcon" />
              <Link to="/cahiers-des-charges" className="link">
                Cahiers Des Charges
              </Link>
            </li>
            <li className={`sidebarListItem ${location.pathname === '/appels-d-offres' ? 'active' : ''}`}>
              <Assignment className="sidebarIcon" />
              <Link to="/appels-d-offres" className="link">
                Appels d'offres
              </Link>
            </li>
            <li className={`sidebarListItem ${location.pathname === '/soumissionnaires' ? 'active' : ''}`}>
              <Group className="sidebarIcon" />
              <Link to="/soumissionnaires" className="link">
                Soumissionnaires
              </Link>
            </li>
            <li className={`sidebarListItem ${location.pathname === '/offres' ? 'active' : ''}`}>
              <Money className="sidebarIcon" />
              <Link to="/offres" className="link">
                Offres
              </Link>
            </li>
            <li className={`sidebarListItem ${location.pathname === '/attributions-marches' ? 'active' : ''}`}>
              <AssignmentTurnedInIcon className="sidebarIcon" />
              <Link to="/attributions-marches" className="link">
                Attributions Marchés
              </Link>
            </li>
            <li className={`sidebarListItem ${location.pathname === '/contrats' ? 'active' : ''}`}>
              <Description className="sidebarIcon" />
              <Link to="/contrats" className="link">
                Contrats
              </Link>
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className={`sidebarListItem ${location.pathname === '/email' ? 'active' : ''}`}>
              <MailOutline className="sidebarIcon" />
              <Link to="/email" className="link">
                Mail
              </Link>
            </li>
            <li className={`sidebarListItem ${location.pathname === '/messages' ? 'active' : ''}`}>
              <ChatBubbleOutline className="sidebarIcon" />
              <Link to="/messages" className="link">
                Messages
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
