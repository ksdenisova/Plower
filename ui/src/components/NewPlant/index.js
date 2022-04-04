import React from 'react';
import './index.css';

function NewPlant( { changeVisibility } ) {
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
        placeholder="What's the name of your plant?"
        autoFocus
        onBlur={changeVisibility}>
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
