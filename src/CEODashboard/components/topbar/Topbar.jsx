import React from "react";
import "./topbar.css";
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import ChatIcon from '@mui/icons-material/Chat';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import Logout from "../../../components/log/Logout";
import { Link, NavLink } from "react-router-dom";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <img src="./imgs/icon.png" alt="Logo" className="logo-img" />
          <span className="logo-text">
            <NavLink exact to="/">Algérie-Télécom</NavLink>
          </span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <Link to="/email" className="link">
              <AlternateEmailRoundedIcon />
              <span className="topIconBadge">2</span>      
            </Link>
          </div>
          <div className="topbarIconContainer">
            <Link to="/messages" className="link">
              <ChatIcon />
              <span className="topIconBadge">2</span>
            </Link>
          </div>
          <div className="topbarIconContainer">             
            <Link to="/" className="link">
              <LeaderboardIcon />
            </Link>
          </div>
          <NavLink exact to="/profil">
          <img src="./imgs/ceo.jpg" alt="profil" className="topAvatar" />
          </NavLink>
          
          <div className="logout">
            <Logout  />
            <span class="text-hover">Déconnexion</span>
          </div>
        </div>
      </div>
    </div>
  );
}
