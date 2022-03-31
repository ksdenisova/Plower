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

  let barColor = '#E1ECDA';
  let progressColor = '#B0D09B';

  if (humidity < 60) {
    if (humidity >= 40) {
      barColor = '#F5E7BA';
      progressColor = '#EBCC66';
    } else {
      barColor = '#ECD8D8';
      progressColor = '#E47B7B';
    }   
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
      <div className="humidity-box" data-testid="humidity">
        <CircularProgressbarWithChildren
          value={humidity}
          maxValue={100}
          styles={{
            path: { stroke: progressColor },
            trail: { stroke: barColor }
          }}>
          <div style={{ color: '#B99A39', fontSize: 16, marginTop: -85 }}>Humidity</div>
          <div style={{ color: '#878986', fontWeight: 800}}>{humidity + '%'}</div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
}

export default Plant;
