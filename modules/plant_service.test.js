const PlantService = require('./plant_service');
const PlantRepository = require('./plant_repository');

describe('PlantService', () => {
  beforeEach(() => {
    const sensors = [ {"id": 1, "channel": "1+GND", "humidity": 85, "dryMax": 12000, "wetMin": 5000, "assigned": true},
                  {"id": 2, "channel": "2+GND", "humidity": 10, "dryMax": 12500, "wetMin": 5500, "assigned": false} ];

    jest.spyOn(PlantRepository, "getSensors").mockImplementation(() => {return sensors});
    jest.spyOn(PlantRepository, "updateSensor").mockImplementation(() => null);
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  }); 

  test('returns list of plants', async () => {
    const testPlants = [ { "id": "0", "name": "First test plant", "dateAdded": "2022-03-30T11:10:00", 
                            "lastWatered": "2022-03-30T12:01:00", "sensorId": "1", "humidity": "75", "lastReading": "2022-03-30T12:01:00"},
                          { "id": "1", "name": "Second test plant", "dateAdded": "2022-04-01T11:11:00", 
                            "lastWatered": "2022-04-01T15:00:00", "sensorId": "2", "humidity": "50", "lastReading": "2022-04-04T10:15:00"}];

    const getPlantsSpy = jest.spyOn(PlantRepository, "getPlants").mockImplementation(() => testPlants);
    
    const actualPlants = await PlantService.getPlants();

    expect(getPlantsSpy).toHaveBeenCalled();
    expect(actualPlants).toEqual(testPlants);
  });

  test('creates plant', async () => {
    const testPlant = { "id": "0", "name": "First test plant", "dateAdded": "2022-03-30T11:10:00", 
                            "lastWatered": "2022-03-30T12:01:00", "sensorId": "1", "humidity": "75", "lastReading": "2022-03-30T12:01:00"};

    const createPlantsSpy = jest.spyOn(PlantRepository, "createPlant").mockImplementation(() => {});

    await PlantService.createPlant(testPlant);

    expect(createPlantsSpy).toHaveBeenCalledWith(testPlant);
  });

  test('converts humidity from digital value to %', () => {
    const dryMax = 12000;
    const wetMin = 5000;
    const mediumValue = 7500;
    const dryValue = 11500;
    const wetValue = 5200;

    const actualMedium = PlantService.calculateHumidity(dryMax, wetMin, mediumValue);
    const actualDry = PlantService.calculateHumidity(dryMax, wetMin, dryValue);
    const actualWet= PlantService.calculateHumidity(dryMax, wetMin, wetValue);
    
    const expectedMedium = 64;
    const expectedDry = 7;
    const expectedWet = 97;

    expect(actualMedium).toEqual(expectedMedium);
    expect(actualDry).toEqual(expectedDry);
    expect(actualWet).toEqual(expectedWet);
  });

  test('returns first available sensor', async () => {
    const availableSensor = await PlantService.assignSensor();
    const expectedSensor = {"id": 2, "channel": "2+GND", "humidity": 10, "dryMax": 12500, "wetMin": 5500, "assigned": true};

    expect(availableSensor).toEqual(expectedSensor);
  });

  test('returns null if not found available sensor', async () => {
    const sensors = [ {"id": 1, "channel": "1+GND", "humidity": 85, "dryMax": 12730, "wetMin": 5571, "assigned": true} ];

    const getSensorsSpy = jest.spyOn(PlantRepository, "getSensors").mockImplementation(() => {return sensors});
    const availableSensor = await PlantService.assignSensor();

    expect(availableSensor).toBeNull();
  });
});
