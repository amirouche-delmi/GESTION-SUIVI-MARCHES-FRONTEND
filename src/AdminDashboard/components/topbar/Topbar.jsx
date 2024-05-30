import React, { useState } from "react";
import "./topbar.css";
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import ChatIcon from '@mui/icons-material/Chat';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import Logout from "../../../components/log/Logout";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';


export default function Topbar() {
  
  const dataWarehouseRefresh = async () => {
    const toastId = toast.loading('Mise à jour de l\'entrepôt de données en cours...', {
      style: {
        marginTop: '-10px',
        minWidth: '400px'
      },
    });
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/fill-data-warehouse`);
      toast.success('La mise à jour est terminée avec succès', {
        id: toastId,
        duration: 3000,
        style: {
          marginTop: '-10px',
        }
      });
    } catch (error) {
      console.error('Error refreshing data warehouse : ', error);
      toast.error('Erreur lors de la mise à jour !', {
        id: toastId,
        duration: 3000,
        style: {
          marginTop: '-10px',
        }
      });
    }
  };
  
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
            <Link to="/" className="link">
            <img src="./imgs/database-refresh-icon.png" alt="database-refresh-icon" onClick={dataWarehouseRefresh} className="topAvatar" />  
            </Link>
          </div>
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
          <img src="./imgs/admin.png" alt="profil" className="topAvatar" />
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
