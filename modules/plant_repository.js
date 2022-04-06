let plants = [ { "id": "0", "name": "My lovely plant name", "lastWatered": "2022-03-30T12:01:00", "humidity": "75" },
  { "id": "1", "name": "A really finicky plant", "lastWatered": "2022-03-18T07:15:00", "humidity": "50" },
  { "id": "2", "name": "Some other plant name here", "lastWatered": "2022-03-28T23:12:10", "humidity": "32" },
  { "id": "3", "name": "Tina", "lastWatered": "", "humidity": "" }];

const getPlants = () =>  {
  return plants;
}

const createPlant = (plant) => {
  plants.push(plant);
}

module.exports = {
  getPlants,
  createPlant
}
