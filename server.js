const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

let plants = [ { "id": "0", "name": "My lovely plant name", "lastWatered": "2022-03-30T12:01:00", "humidity": "75" },
  { "id": "1", "name": "A really finicky plant", "lastWatered": "2022-03-18T07:15:00", "humidity": "50" },
  { "id": "2", "name": "Some other plant name here", "lastWatered": "2022-03-28T23:12:10", "humidity": "32" },
  { "id": "3", "name": "Tina", "lastWatered": "", "humidity": "" }];

app.use(express.json());
app.use(express.static('client/build'));

app.get('/', (req, res) => {
  res.sendFile('client/build/index.html');
})

app.get('/plants', async (req, res) => {
  res.send(plants);
});

app.post('/plants', (req, res) => {
  plants.push(req.body);
  res.send(req.body);
})

app.listen(port, () => {
  console.log(`Plower app listening on port ${port}`)
});
