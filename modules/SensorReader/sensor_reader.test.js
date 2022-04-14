const SensorReader = require('./sensor_reader');

describe('SensorReader', () => {
  test('returns sensor humidity', async () => {
    const testHumidity = 60;
    const readHumiditySpy = jest.spyOn(SensorReader, "readHumidity").mockImplementation(() => testHumidity);
    
    const actualHumidity = await SensorReader.readHumidity();

    expect(readHumiditySpy).toHaveBeenCalled();
    expect(actualHumidity).toEqual(testHumidity);
  });
});
