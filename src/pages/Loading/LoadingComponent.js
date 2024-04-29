import React, { useEffect } from 'react';
import { Spinner } from 'spin.js';
import 'spin.js/spin.css';
import './Loading.scss';

export default function LoadingComponent() {

    useEffect(() => {
        const target = document.getElementById('spinner-component-container');
        const spinner = new Spinner({ color: '#3498db' }).spin(target);
    
        return () => spinner.stop();
    }, []);

  return (
    <div className='loading-component'>
        <div id="spinner-component-container"></div>
    </div>
  )
}