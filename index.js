import express from 'express';
import bodyParser from 'body-parser';
import Database from './lib/db';
import mockData from './mockData';
import Animals from './animals.js';

// Setup the server
const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup the database
const db = new Database();
db.addCollection('cats', mockData.cats);
db.addCollection('dogs', mockData.dogs);
db.addCollection('pokemons', mockData.pokemons);

const cat = new Animals('cat', db.cats, app);
cat.getAllAnimals();
cat.registerAnimal();
cat.getAnimalSearch();
cat.getAnimalId();

const dog = new Animals('dog', db.dogs, app);
dog.getAllAnimals();
dog.registerAnimal();
dog.getAnimalSearch();
dog.getAnimalId();

const pokemon = new Animals('pokemon', db.pokemons, app);
pokemon.getAllAnimals();
pokemon.registerAnimal();
pokemon.getAnimalSearch();
pokemon.getAnimalId();

// Start server
app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
});