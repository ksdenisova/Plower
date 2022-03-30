import React from 'react';
import './index.css';

function Plant( { plant } ) {
  let name = plant.name;

  return (
    <div className="plant-box">
      <div className="plant-img-box">
        <img
          className="plant-img"
          src="/default_plant.png"
        />
      </div>
      <div className="plant-name">
        {name}
      </div>
    </div>
  );
}

export default Plant;
