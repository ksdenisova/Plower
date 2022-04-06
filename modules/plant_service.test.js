const PlantService = require('./plant_service');
const PlantRepository = require('./plant_repository');

describe('PlantService', () => {
  test('returns list of plants', () => {
    const testPlants = [ { "id": "0", "name": "First test plant", "dateAdded": "2022-03-30T11:10:00", 
                            "lastWatered": "2022-03-30T12:01:00", "sensorId": "1", "humidity": "75", "lastReading": "2022-03-30T12:01:00"},
                          { "id": "1", "name": "Second test plant", "dateAdded": "2022-04-01T11:11:00", 
                            "lastWatered": "2022-04-01T15:00:00", "sensorId": "2", "humidity": "50", "lastReading": "2022-04-04T10:15:00"}];

    const getPlantsSpy = jest.spyOn(PlantRepository, "getPlants").mockImplementation(() => testPlants);
    
    const actualPlants = PlantService.getPlants();

    expect(getPlantsSpy).toHaveBeenCalled();
    expect(actualPlants).toEqual(testPlants);
  });

  test('creates plant', () => {
    const testPlant = { "id": "0", "name": "First test plant", "dateAdded": "2022-03-30T11:10:00", 
                            "lastWatered": "2022-03-30T12:01:00", "sensorId": "1", "humidity": "75", "lastReading": "2022-03-30T12:01:00"};

    const createPlantsSpy = jest.spyOn(PlantRepository, "createPlant");
    
    PlantService.createPlant(testPlant);

    expect(createPlantsSpy).toHaveBeenCalledWith(testPlant);
  });
});
