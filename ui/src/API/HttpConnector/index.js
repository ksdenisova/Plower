class HttpConnector {
  static getPlants() {
    const plants = [ { "id": "0", "name": "My lovely plant name" },
                    { "id": "1", "name": "A really finicky plant" },
                    { "id": "2", "name": "Some other plant name here" }];

    return plants;
  }
}

export default HttpConnector;
