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
  WorkOutline,
  Report,
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
import EditAttributesSharpIcon from '@mui/icons-material/EditAttributesSharp';
import RuleSharpIcon from '@mui/icons-material/RuleSharp';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';

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
            <li className={`sidebarListItem ${location.pathname === '/evaluer-offres' ? 'active' : ''}`}>
              <RuleSharpIcon className="sidebarIcon" />
              <Link to="/evaluer-offres" className="link">
                Évaluer Offres
              </Link>
            </li>
            <li className={`sidebarListItem ${location.pathname === '/attribuer-marches' ? 'active' : ''}`}>
              <InventoryRoundedIcon className="sidebarIcon" />
              <Link to="/attribuer-marches" className="link">
                Attribuer Marchés
              </Link>
            </li>
            <li className={`sidebarListItem ${location.pathname === '/marches' ? 'active' : ''}`}>
              <Business className="sidebarIcon" />
              <Link to="/marches" className="link">
                Marchés
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
