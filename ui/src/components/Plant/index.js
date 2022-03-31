import React from 'react';
import { format } from 'date-fns'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import './index.css';

function Plant( { plant } ) {
  const { name, lastWatered, humidity } = plant;
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
      <div className="humidity-box">
        <CircularProgressbarWithChildren
          data-testid="progressBar"
          value={50}
          maxValue={100}>
          <div style={{ color: '#B99A39', fontSize: 16, marginTop: -80 }}>Humidity</div>
          <div style={{ color: '#878986', fontWeight: 800}}>{humidity + '%'}</div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
}

export default Plant;
