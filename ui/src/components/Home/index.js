import React, { useState } from 'react';
import HttpClient from '../../API/HttpClient';
import NewPlant from '../NewPlant';
import PlantCollection from '../PlantCollection';
import './index.css';

function Home() {
  const plants = HttpClient.getPlants();
  const [visible, setVisible] = useState(false);

  const addPlant = () => {
    setVisible(!visible);
  }

  return (
    <div>
      <div className="home">
        <div className="main-header">
          <h1>Plower</h1>
        </div>
        <div className="button-box">
          <button 
            className="add-button"
            data-testid="addButton"
            onClick={addPlant}>
            +
          </button>
        </div>
        <div>
          <PlantCollection plants={plants}/>
        </div>
      </div>
      <div>
        {visible ? <div className="new-plant-window"><NewPlant /></div> : null} 
      </div>
    </div>
  );
}

export default Home;
