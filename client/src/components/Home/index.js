import React, { useState, useEffect } from 'react';
import HttpClient from '../../API/HttpClient';
import NewPlant from '../NewPlant';
import PlantCollection from '../PlantCollection';
import './index.css';

function Home() {
  const [plants, setPlants] = useState([]);
  const [newPlantVisibility, setVisibility] = useState(false);
  const [plantsNames, setNames] = useState([]);

  useEffect(() => {
    refresh();
  }, []);

  const  refresh = async () => {
    try {
      const plants = await HttpClient.getPlants();
      const sortedPlants = plants.sort((x,y) => new Date(y.dateAdded) - new Date(x.dateAdded));
      const names = plants.map(plant => plant.name.toLowerCase());

      setPlants(sortedPlants);
      setNames(names);
    } catch (error) {
    }
  }

  const changeVisibility = () => {
    setVisibility(!newPlantVisibility);
  }

  const createPlant = async (name) => { 
    const plant = { "name": name, "sensorId": "", "humidity": "", 
                  "dateAdded": "", "lastWatered": ""};
    
    try {
      await HttpClient.createPlant(plant);
    } catch(error) {
      console.error("Unable to create plants");
    }
  
    await refresh();
    
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
        {newPlantVisibility ? <div className="new-plant-window"><NewPlant createPlant={createPlant} plantsNames={plantsNames}/></div> : null} 
      </div>
    </div>
  );
}

export default Home;
