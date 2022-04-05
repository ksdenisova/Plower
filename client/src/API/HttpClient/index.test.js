import HttpClient from '.';

test('returns list of plants', () => {
  const plants = HttpClient.getPlants();

  expect(plants).toHaveLength(4);
});
