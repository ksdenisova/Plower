class HttpClient {
  static getPlants() {
    const plants = fetch("/plants").then(response => response.json());
    
    return plants;
  }

  static createPlant(plant) {
  }
}

export default HttpClient;
