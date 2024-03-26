import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import Logout from "../../../components/log/Logout";
import { NavLink } from "react-router-dom";

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
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <NavLink exact to="/profil">
          <img src="./imgs/dm.jpg" alt="profil" className="topAvatar" />
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
