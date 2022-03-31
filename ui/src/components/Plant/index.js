import React from 'react';
import { format } from 'date-fns'
import './index.css';

function Plant( { plant } ) {
  const { name, lastWatered } = plant;
  let date = "Last watered:";

  if (lastWatered) {
    date = new Date(lastWatered);
    date = format(date, "'Last watered: 'MMMM dd, yyyy' at 'hh:mm aaa");
  }
    
  return (
    <div className="plant-box">
      <div className="plant-img-box">
        <img
          className="plant-img"
          src="/default_plant.png"
          alt="img"
        />
      </div>
      <div className="plant-info">
        <div className="plant-name">
          {name}
        </div>
        <div className="plant-date">
          {date}
        </div>
      </div>
    </div>
  );
}

export default Plant;
