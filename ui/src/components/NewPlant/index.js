import React from 'react';
import './index.css';

function NewPlant( ) {
  return (
    <div className="new-plant-box">
      <img
          className="new-plant-img"
          src="/new_plant.png"
          alt="img"
      />
      <input 
        className="new-plant-form"
        type="text"
        placeholder="What's the name of your plant?">
      </input>
      <button 
        className="save-button"
        data-testid="saveButton">
        +
      </button>
    </div>
  );
}

export default NewPlant;