import React from 'react';

function PlantCollection( { plants } ) {
  const plantsView = plants.map(plant => <div key={plant.id}>{plant.name}</div>);
  
  return (
    <div>
      {plantsView}
    </div>
  );
}

export default PlantCollection;
