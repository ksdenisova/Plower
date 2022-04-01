import React from 'react';
import HttpClient from '../../API/HttpClient';
import PlantCollection from '../PlantCollection';
import './index.css';

function Home() {
  const plants = HttpClient.getPlants();
  let visible = false;

  return (
    <div className="home">
      <div className="main-header">
        <h1>Plower</h1>
      </div>
      <div className="button-box">
        <button 
          className="add-button"
          data-testid="addButton">
          +
        </button>
      </div>
      <div>
        <PlantCollection plants={plants}/>
      </div>
      {visible ? 
        <div 
          className="new-plant-window"
          data-testid="newPlant">
        </div> : ""} 
    </div>
  );
}

export default Home;
