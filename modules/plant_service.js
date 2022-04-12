const PlantRepository = require("./plant_repository")
const SensorReader = require('./SensorReader/sensor_reader');
const schedule = require('node-schedule');
const period = process.env.PERIOD || '*/30 * * * *';

if (process.env.PRODUCTION) {
  const job = schedule.scheduleJob(period, async () => {
    await updateHumidity();
  });
}

const getPlants = async () => {
  const plants = await PlantRepository.getPlants();
  
  return plants;
}

const createPlant = async (plant) => {
  const sensor = await assignSensor();

  if (sensor) {
    plant.sensorId = sensor._id;
    plant.humidity = sensor.humidity;
  }

  await PlantRepository.createPlant(plant);
}

const updateHumidity = async () => {
  let sensors = await PlantRepository.getSensors();

  for (let sensor of sensors) {
    const value = await SensorReader.readHumidity(sensor.channel);
    sensor.humidity = calculateHumidity(sensor.dryMax, sensor.wetMin, value);
    
    await PlantRepository.updateSensor(sensor);
    console.log("CHN: ", sensor.channel, " = ", sensor.humidity);
  }
}

const calculateHumidity = (dryMax, wetMin, value) => {
  const percent = (dryMax - wetMin) / 100;

  const humidity = Math.round(100 - (value - wetMin) / percent);

  return humidity;
}

const assignSensor = async () => {
  let availableSensor;
  let sensors = await PlantRepository.getSensors();

  for (let sensor of sensors) {
    if (!sensor.assigned) {
      sensor.assigned = true;
      availableSensor = sensor;
      break;
    }
  }

  if (!availableSensor) {
    console.log("No available sensor found");
    return null;
  }

  console.log("Assigned sensor on channel:", availableSensor.channel);
  await PlantRepository.updateSensor(availableSensor);
  
  return availableSensor;
}

module.exports = {
  getPlants,
  createPlant,
  updateHumidity,
  calculateHumidity,
  assignSensor
}
