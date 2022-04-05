import React from 'react';
import Plant from '../Plant';

function PlantCollection( { plants } ) {
  const plantsView = plants.map(plant => <Plant key={plant.id} plant={plant}/>);
  
  return (
    <div>
      {plantsView}
    </div>
  );
}

export default PlantCollection;
