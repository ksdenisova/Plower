import React, { useState } from 'react';
import './index.css';

function NewPlant( { createPlant, plantsNames } ) {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleCreatePlant();
    }
  }

  const handleCreatePlant = () => {
    if (!name || plantsNames.includes(name.toLowerCase())) {
      console.log("The name should be unique and not empty");
      return;
    }
    
    createPlant(name);
  }

  return (
    <div className="new-plant-box" data-testid="newPlant">
      <div className="new-plant-img-box">
        <img
            className="new-plant-img"
            src="/new_plant.png"
            alt="img"
        />
      </div>
      <input 
        className="new-plant-form"
        type="text"
        value={name} 
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder="What's the name of your plant?"
        autoFocus>
      </input>
      <button 
        className="save-button"
        data-testid="saveButton"
        onClick={handleCreatePlant}>
        +
      </button>
    </div>
  );
}

export default NewPlant;
