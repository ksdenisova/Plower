const PlantReader = require('./sensor_reader');

describe('PlantReader', () => {
  test('returns sensor humidity', async () => {
    const testHumidity = 60;
    const readHumiditySpy = jest.spyOn(PlantReader, "readHumidity").mockImplementation(() => testHumidity);
    
    const actualHumidity = await PlantReader.readHumidity();

    expect(readHumiditySpy).toHaveBeenCalled();
    expect(actualHumidity).toEqual(testHumidity);
  });

  test('converts humidity from digital value to %', () => {
    const dryMax = 12000;
    const wetMin = 5000;
    const mediumValue = 7500;
    const dryValue = 11500;
    const wetValue = 5200;

    const actualMedium = PlantReader.calculateHumidity(dryMax, wetMin, mediumValue);
    const actualDry = PlantReader.calculateHumidity(dryMax, wetMin, dryValue);
    const actualWet= PlantReader.calculateHumidity(dryMax, wetMin, wetValue);
    
    const expectedMedium = 64;
    const expectedDry = 7;
    const expectedWet = 97;

    expect(actualMedium).toEqual(expectedMedium);
    expect(actualDry).toEqual(expectedDry);
    expect(actualWet).toEqual(expectedWet);
  });
});
