const PlantRepository = require('./Repository/plant_repository');
const SensorRepository = require('./Repository/sensor_repository');
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
    const humidity = await getCurrentHumidity(sensor);
    sensor.humidity = humidity;
    plant.sensorId = sensor._id;
    plant.humidity = humidity;
    plant.lastWatered = new Date(Date.now());
    
    await SensorRepository.saveSensor(sensor);
  }

  await PlantRepository.createPlant(plant);
}

const updateHumidity = async () => {
  const sensors = await SensorRepository.getSensors();

  for (let sensor of sensors) {
    const humidity = await getCurrentHumidity(sensor);

    if (humidity - sensor.humidity >= 10) {
      const lastWatered = new Date(Date.now());
      await PlantRepository.updatePlantWatering(sensor._id, humidity, lastWatered);
    } else {
      await PlantRepository.updatePlantHumidity(sensor._id, humidity);
    }
  
    await SensorRepository.updateSensor(sensor._id, humidity);
    console.log("Current humidity on channel", sensor.channel, "=", humidity);
  }
}

const getCurrentHumidity = async (sensor) => {
  const value = await SensorReader.readHumidity(sensor.channel);
  const humidity = calculateHumidity(sensor.dryMax, sensor.wetMin, value);

  return humidity;
}

const calculateHumidity = (dryMax, wetMin, value) => {
  const percent = (dryMax - wetMin) / 100;

  const humidity = Math.round(100 - (value - wetMin) / percent);

  return Math.max(humidity, 0);
}

const assignSensor = async () => {
  let availableSensor;
  const sensors = await SensorRepository.getSensors();

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
  return availableSensor;
}

const calibrateDrySensors = async () => {
  console.log("Calibrating dry sensors. Do not touch sensors.");

  const sensors = await SensorRepository.getSensors();

  for (let sensor of sensors) {
    console.log("Calibrating dry sensor on channel", sensor.channel);
    sensor.dryMax = await SensorReader.calibrateDrySensor(sensor.channel);
    await SensorRepository.saveSensor(sensor);
    
    console.log("Saved this value as dry max:", sensor.dryMax);
  }

  if (process.env.PRODUCTION) {
    process.exit(0);
  }
}

const calibrateWetSensors = async () => {
  console.log("Calibrating wet sensors. Sensors should be placed into the water.\nIf they are not, please place sensors into the water and start the calibration again.");

  const sensors = await SensorRepository.getSensors();

  for (let sensor of sensors) {
    console.log("Calibrating wet sensor on channel", sensor.channel);
    sensor.wetMin = await SensorReader.calibrateWetSensor(sensor.channel);
    await SensorRepository.saveSensor(sensor);

    console.log("Saved this value as wet min:", sensor.wetMin);
  }

  if (process.env.PRODUCTION) {
    process.exit(0);
  }
}

module.exports = {
  getPlants,
  createPlant,
  updateHumidity,
  getCurrentHumidity,
  calculateHumidity,
  assignSensor,
  calibrateDrySensors,
  calibrateWetSensors
}
