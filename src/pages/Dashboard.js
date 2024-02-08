import React, { useContext } from 'react';
import { UidContext } from '../components/AppContext';

const Dashboard = () => {
  const uid = useContext(UidContext) // avoir la valeur de UidContext

  return (
    <div className="dashboard-container">
      <h1>Tableau de bord de : {uid}</h1>
      <p>Bienvenue sur votre tableau de bord</p>
    </div>
  );
};

export default Dashboard;