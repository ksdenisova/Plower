const ADS1115 = require('ads1115');
const os = require('os');
let i2c;

if (os.arch() == 'arm64') {
  i2c = require('i2c-bus');
} else {
  i2c = require('./i2c.mock');
}

const readHumidity = async (channel) => {
  const humidity = i2c.openPromisified(1).then(async (bus) => {
    const ads1115 = await ADS1115(bus);
    const value = await ads1115.measure(channel);
    return value;
  });

  return humidity;
}

const calibrateDrySensor = async (channel) => {
  let max = 0;

  for (let i = 0; i < 10; i++) {
    let currentMax = await readHumidity(channel);
    max = Math.max(max, currentMax);
  }

  return max;
}

const calibrateWetSensor = async (channel) => {
  let min = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < 10; i++) {
    let currentMin = await readHumidity(channel);
    min = Math.min(min, currentMin);
  }

  return min;
}

module.exports = {
  readHumidity,
  calibrateDrySensor,
  calibrateWetSensor
}
