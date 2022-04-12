const PlantRepository = require("./plant_repository")
const SensorReader = require('./SensorReader/sensor_reader');
const schedule = require('node-schedule');

const job = schedule.scheduleJob('* /30 * * * *', async () => {
  await SensorReader.updateHumidity();
});

const getPlants = async () => {
  const plants = await PlantRepository.getPlants();
  
  return plants;
}

const createPlant = async (plant) => {
  await PlantRepository.createPlant(plant);
}

module.exports = {
  getPlants,
  createPlant
}
