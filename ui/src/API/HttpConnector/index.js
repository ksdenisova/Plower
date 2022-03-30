class HttpConnector {
  static getPlants() {
    const plants = [ { "id": "0", "name": "My lovely plant name", "lastWatered": "2022-03-30T12:01:00" },
                    { "id": "1", "name": "A really finicky plant", "lastWatered": "2022-03-18T07:15:00" },
                    { "id": "2", "name": "Some other plant name here", "lastWatered": "2022-03-28T23:12:10" }];

    return plants;
  }
}

export default HttpConnector;
