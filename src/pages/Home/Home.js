import React from 'react';
import Log from '../../components/log';
import './Home.scss'

const Home = () => {
  return (
    <div className="home-page">
      <header className="home-header">
        <div className="logo-container">
          <img src="./imgs/icon.png" alt="Logo" className="logo-img" />
          <span className="logo-text">Gestion et Suivi des Marchés d'Algérie Télécom</span>
        </div>
      </header>
      <div className="home-content">
        <Log />
      </div>
    </div>
  );
};

export default Home;
