import React from 'react';
import PlantCollection from '../PlantCollection';
import './index.css';

function Home() {
  const plants = [ { "id": "0", "name": "My first plant" },
                    { "id": "2", "name": "My second plant" }];

  return (
    <div className="home">
      <div className="main-header">
        <h1>Plower</h1>
      </div>
      <div>
        <PlantCollection plants={plants}/>
      </div>
    </div>
  );
}

export default Home;
