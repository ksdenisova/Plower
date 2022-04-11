const PlantReader = require('./plant_reader');

describe('PlantReader', () => {
  test('returns sensor humidity', async () => {
    const testHumidity = 60;
    const readHumiditySpy = jest.spyOn(PlantReader, "readHumidity").mockImplementation(() => testHumidity);
    
    const actualHumidity = await PlantReader.readHumidity();

    expect(readHumiditySpy).toHaveBeenCalled();
    expect(actualHumidity).toEqual(testHumidity);
  });
});
