import React, { useState, useEffect } from 'react';
import HttpClient from '../../API/HttpClient';
import NewPlant from '../NewPlant';
import PlantCollection from '../PlantCollection';
import './index.css';

function Home() {
  const [plants, setPlants] = useState([]);
  const [newPlantVisibility, setVisibility] = useState(false);

  useEffect(() => {
    let plants = HttpClient.getPlants();
    setPlants(plants);
  }, []);

  const changeVisibility = () => {
    setVisibility(!newPlantVisibility);
  }

  const createPlant = (name) => { 
    let id = plants.length;
    let plant = { "id": id, "name": name, "lastWatered": "", "humidity": "" };
    
    HttpClient.createPlant(plant);

    let newPlants = plants;
    newPlants[id] = plant;

    setPlants(newPlants)
    changeVisibility();
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
            onClick={changeVisibility}>
            +
          </button>
        </div>
        <div>
          <PlantCollection plants={plants}/>
        </div>
      </div>
      <div>
        {newPlantVisibility ? <div className="blur" onClick={changeVisibility}></div> : null}
        {newPlantVisibility ? <div className="new-plant-window"><NewPlant createPlant={createPlant}/></div> : null} 
      </div>
    </div>
  );
}

export default Home;
