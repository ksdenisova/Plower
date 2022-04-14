import React from 'react';
import { format } from 'date-fns'
import Humidity from '../Humidity';
import './index.css';

function Plant( { plant } ) {
  const { name, lastWatered, humidity } = plant;
  let date = "Not yet watered";

  if (lastWatered) {
    date = new Date(lastWatered);
    date = format(date, "'Last watered: 'MMMM dd, yyyy' at 'h:mm aaa");
  }

  return (
    <div className="plant-box" data-testid="plant">
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
      <div className="humidity-box">
        <Humidity moisture={humidity}/>
      </div>
    </div>
  );
}

export default Plant;
