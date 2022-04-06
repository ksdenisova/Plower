class HttpClient {
  static getPlants() {
    try {
      const plants = fetch("/plants").then(response => response.json());
      return plants;
    } catch(error) {
      console.error("Unable to get plants: " + error);
    }
  }

  static async createPlant(plant) {
    try {
      await fetch("/plants", {method: "POST", headers: new Headers({'content-type': 'application/json'}), body: JSON.stringify(plant)});
    } catch(error) {
      console.error("Unable to create plants: " + error);
    }
  }
}

export default HttpClient;
