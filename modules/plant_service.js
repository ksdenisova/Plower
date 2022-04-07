const PlantRepository = require("./plant_repository")

const getPlants = async () => {
  const plants = await PlantRepository.getPlants();
  
  return plants;
}

const createPlant = (plant) => {
  PlantRepository.createPlant(plant);
}

module.exports = {
  getPlants,
  createPlant
}
