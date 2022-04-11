const ADS1115 = require('ads1115');
const os = require('os');
let i2c;

if (os.arch() == 'arm64')
  i2c = require('i2c-bus');
else
  i2c = require('./i2c.mock.js');

const sensors = [ {"id": 1, "channel": "1+GND", "humidity": null, "dryMax": 12730, "wetMin": 5571, "available": false},
                  {"id": 2, "channel": "2+GND", "humidity": null, "dryMax": 12116, "wetMin": 5265, "available": false} ];

const updateHumidity = async () => {
  for (let sensor of sensors) {
    sensor.humidity = await readHumidity(sensor.channel);
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

module.exports = {
  updateHumidity,
  readHumidity
}
