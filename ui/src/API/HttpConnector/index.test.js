import HttpConnector from '.';

test('returns list of plants', () => {
  const plants = HttpConnector.getPlants();

  expect(plants).toHaveLength(3);
});
