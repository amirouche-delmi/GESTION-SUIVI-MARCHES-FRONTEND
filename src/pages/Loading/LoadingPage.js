import React, { useEffect } from 'react';
import { Spinner } from 'spin.js';
import 'spin.js/spin.css';
import './Loading.scss';

const LoadingPage = () => {
  useEffect(() => {
    const target = document.getElementById('spinner-container');
    const spinner = new Spinner({ color: '#3498db' }).spin(target);

    return () => spinner.stop();
  }, []);

  return (
    <div className="loading-page">
      <div id="spinner-container"></div>
      <p>Chargement en cours...</p>
    </div>
  );
}

export default LoadingPage;
