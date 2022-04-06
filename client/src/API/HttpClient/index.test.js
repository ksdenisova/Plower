import HttpClient from '.';

describe('HttpClient', () => {
  test('returns list of plants', async () => {
    const testPlants = [ { "id": "0", "name": "First test plant", "lastWatered": "2022-03-30T12:01:00", "humidity": "75" },
                      { "id": "1", "name": "Second test plant", "lastWatered": "2022-03-18T07:15:00", "humidity": "50" },
                      { "id": "2", "name": "Third test plant", "lastWatered": "2022-03-28T23:12:10", "humidity": "32" }];
    
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(testPlants)
      })
    );
    
    const actualPlants = await HttpClient.getPlants();
  
    expect(actualPlants).toHaveLength(testPlants.length);
    expect(actualPlants).toEqual(testPlants);
  });
});
