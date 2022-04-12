const SensorReader = require('./sensor_reader');

describe('SensorReader', () => {
  test('returns sensor humidity', async () => {
    const testHumidity = 60;
    const readHumiditySpy = jest.spyOn(SensorReader, "readHumidity").mockImplementation(() => testHumidity);
    
    const actualHumidity = await SensorReader.readHumidity();

    expect(readHumiditySpy).toHaveBeenCalled();
    expect(actualHumidity).toEqual(testHumidity);
  });

  test('converts humidity from digital value to %', () => {
    const dryMax = 12000;
    const wetMin = 5000;
    const mediumValue = 7500;
    const dryValue = 11500;
    const wetValue = 5200;

    const actualMedium = SensorReader.calculateHumidity(dryMax, wetMin, mediumValue);
    const actualDry = SensorReader.calculateHumidity(dryMax, wetMin, dryValue);
    const actualWet= SensorReader.calculateHumidity(dryMax, wetMin, wetValue);
    
    const expectedMedium = 64;
    const expectedDry = 7;
    const expectedWet = 97;

    expect(actualMedium).toEqual(expectedMedium);
    expect(actualDry).toEqual(expectedDry);
    expect(actualWet).toEqual(expectedWet);
  });

  test('returns first available sensor', () => {
    const sensors = [ {"id": 1, "channel": "1+GND", "humidity": 85, "dryMax": 12730, "wetMin": 5571, "available": false},
                  {"id": 2, "channel": "2+GND", "humidity": 10, "dryMax": 12116, "wetMin": 5265, "available": true} ];

    SensorReader.setSensors(sensors);
    const availableSensor = SensorReader.assignSensor();
    const expectedSensor = {"id": 2, "channel": "2+GND", "humidity": 10, "dryMax": 12116, "wetMin": 5265, "available": false};

    expect(availableSensor).toEqual(expectedSensor);
  });

  test('returns null if not found available sensor', () => {
    const sensors = [ {"id": 1, "channel": "1+GND", "humidity": 85, "dryMax": 12730, "wetMin": 5571, "available": false} ];

    SensorReader.setSensors(sensors);
    const availableSensor = SensorReader.assignSensor();

    expect(availableSensor).toBeNull();
  });
});
