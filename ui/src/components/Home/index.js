import React from 'react';
import HttpConnector from '../../API/HttpConnector';
import PlantCollection from '../PlantCollection';
import './index.css';

function Home() {
  const plants = HttpConnector.getPlants();

  return (
    <div className="home">
      <div className="main-header">
        <h1>Plower</h1>
      </div>
      <div>
        <PlantCollection plants={plants}/>
      </div>
    </div>
  );
}

export default Home;
