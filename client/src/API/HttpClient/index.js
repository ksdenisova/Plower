class HttpClient {
  static getPlants() {
    const plants = fetch("/plants").then(response => response.json());
    
    return plants;
  }

  static async createPlant(plant) {
    await fetch("/plants", {method: "POST", headers: new Headers({'content-type': 'application/json'}), body: JSON.stringify(plant)});
  }
}

export default HttpClient;
