const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const PlantService = require('./modules/plant_service');
const PlantReader = require('./modules/plant_reader');

const schedule = require('node-schedule');

const job = schedule.scheduleJob('* * * * * *', async () => {
  await PlantReader.updateHumidity();
});

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

app.listen(port, () => {
  console.log(`Plower app listening on port ${port}`)
});
