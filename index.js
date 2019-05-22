import express from 'express';
import bodyParser from 'body-parser';
import Database from './lib/db';
import mockData from './mockData';

// Setup the server
const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup the database
const db = new Database();
db.addCollection('cats', mockData.cats);
db.addCollection('dogs', mockData.dogs);
db.addCollection('Pokemons', mockData.pokemons);

// Setup the routes
app.post('/cat', (req, res) => {
  if (!req.body.name) {
    console.log(req.body);
    return res.status(400).send({
      success: false,
      message: 'Name is required for cat',
    });
  }
  const newCat = req.body;
  const newId = db.cats.push(newCat);
  return res.status(201).send({
    success: true,
    message: 'Cat added successfully',
    id: newId,
  });
});

function registerGetAnimals(app, path, collection) {
app.get('/path', (req, res) => {
  return res.status(200).send({
    success: true,
    data: collection.all(),
  });
});
}

app.get('/cat/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const cat = db.cats.find({ id });
  if (cat) {
    return res.status(200).send({
      success: true,
      data: cat,
    });
  }
  return res.status(404).send({
    success: false,
    message: 'Cat not found',
  });
});

app.get('/catSearch/:key/:value', (req, res) => {
  const { key, value } = req.params;
  const cat = db.cats.find({ [key]: value });
  if (cat) {
    return res.status(200).send({
      success: true,
      data: cat,
    });
  }
  return res.status(404).send({
    success: false,
    message: 'Cat not found',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
});
