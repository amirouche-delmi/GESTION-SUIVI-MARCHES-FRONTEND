import React, { useContext } from 'react'
import Log from '../components/log'
import { UidContext } from '../components/AppContext'
import Dashboard from './Dashboard'
import Logout from '../components/log/Logout'

const Home = () => {
  const uid= useContext(UidContext);

  return (
    uid ? (
      <>
        <Logout />
        <Dashboard />
      </>
    ) : (
      <div className='home-page'>
        <div className="logo-container">
          <img src="/icon.png" alt="Logo" className="logo-img" />
          <span className="logo-text">Gestion et Suivi des Marchés d'Algérie Télécom</span>
        </div>
        <div className="log-container">
          <Log />
          <div className="img-container">
            <img src="./addnew.png" alt="img-log" />
          </div>
        </div>
      </div>
    )
  )
}

export default Home