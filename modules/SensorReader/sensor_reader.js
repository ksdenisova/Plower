const ADS1115 = require('ads1115');
const os = require('os');
let i2c;

if (os.arch() == 'arm64') {
  i2c = require('i2c-bus');
} else {
  i2c = require('./i2c.mock');
}

let sensors = [ {"id": 1, "channel": "1+GND", "humidity": null, "dryMax": 12730, "wetMin": 5571, "available": true},
                  {"id": 2, "channel": "2+GND", "humidity": null, "dryMax": 12116, "wetMin": 5265, "available": true} ];

const updateHumidity = async () => {
  for (let sensor of sensors) {
    const value = await readHumidity(sensor.channel);
    sensor.humidity = calculateHumidity(sensor.dryMax, sensor.wetMin, value);
    console.log("CHN: ", sensor.channel, " = ", sensor.humidity);
  }
}

const readHumidity = async (channel) => {
  let humidity = i2c.openPromisified(1).then(async (bus) => {
    const ads1115 = await ADS1115(bus);
    let value = await ads1115.measure(channel);
    return value;
  });

  return humidity;
}

const calculateHumidity = (dryMax, wetMin, value) => {
  const percent = (dryMax - wetMin) / 100;

  const humidity = Math.round(100 - (value - wetMin) / percent);

  return humidity;
}

const assignSensor = () => {
  let availableSensor;

  for (let sensor of sensors) {
    if (sensor.available) {
      availableSensor = sensor;
      break;
    }
  }

  if (!availableSensor) {
    console.log("No available sensor found");
    return null;
  }

  console.log("Assigned sensor on channel:", availableSensor.channel);
  availableSensor.available = false;
  return availableSensor;
}

const calibrateDrySensors = async () => {
  console.log("Calibrating dry sensors. Do not touch sensors");

  for (let sensor of sensors) {
    console.log("Calibrating dry sensor on channel", sensor.channel);
    sensor.dryMax = await calibrateDrySensor(sensor.channel);
    console.log("Save this value as dry max:", sensor.dryMax);
  }
}

const calibrateDrySensor = async (channel) => {
  let max = 0;

  for (let i = 0; i < 10; i++) {
    let currentMax = await readHumidity(channel);
    max = Math.max(max, currentMax);
  }

  return max;
}

const calibrateWetSensors = async () => {
  console.log("Calibrating wet sensors. Sensors should be placed in water");

  for (let sensor of sensors) {
    console.log("Calibrating wet sensor on channel", sensor.channel);
    sensor.wetMin = await calibrateWetSensor(sensor.channel);

    console.log("Save this value as wet min:", sensor.wetMin);
  }
}

const calibrateWetSensor = async (channel) => {
  let min = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < 10; i++) {
    let currentMin = await readHumidity(channel);
    min = Math.min(min, currentMin);
  }

  return min;
}

const setSensors = (values) => {
  sensors = values;
}

module.exports = {
  updateHumidity,
  readHumidity,
  calibrateDrySensors,
  calibrateWetSensors,
  calculateHumidity,
  assignSensor, setSensors
}
