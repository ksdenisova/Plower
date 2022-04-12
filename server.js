const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const PlantService = require('./modules/plant_service');
const SensorReader = require('./modules/SensorReader/sensor_reader')

if (process.argv[2] == "calibrate") {
  if (process.argv[3] == "dry")
    PlantReader.calibrateDrySensors();
  else if (process.argv[3] == "wet")
    PlantReader.calibrateWetSensors();
  else {
    console.log("Unknown command. Use 'dry' or 'wet'")
  }
} else {
  app.use(express.json());
  app.use(express.static('client/build'));
  
  app.get('/', (req, res) => {
    res.sendFile('client/build/index.html');
  });
  
  app.get('/plants', async (req, res) => {
    const plants = await PlantService.getPlants();
    res.send(plants);
  });
  
  app.post('/plants', async (req, res) => {
    await PlantService.createPlant(req.body);
    res.send(req.body);
  })
  
  app.listen(port, async () => {
    await PlantService.updateHumidity();
    console.log(`Plower app listening on port ${port}`);
  });
}
