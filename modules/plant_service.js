const PlantRepository = require("./plant_repository")

const getPlants = () => {
  const plants = PlantRepository.getPlants();
    
  return plants;
}

const createPlant = (plant) => {
  PlantRepository.createPlant(plant);
}

module.exports = {
  getPlants,
  createPlant
}
