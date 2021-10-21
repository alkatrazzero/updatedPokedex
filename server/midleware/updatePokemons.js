const axios = require('axios');
const _ = require('lodash');
const AllPokemons = require('../models/allPokemons');

module.exports = async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0');
  const pokemonsFromServer = response.data.results;
  const pokemonsFromMongo = await AllPokemons.find({ pokemon: Object });
  const differenceArray = _.differenceBy(pokemonsFromServer, pokemonsFromMongo, 'name');
  console.log(differenceArray);
  let saveToMongoPokemons = [];
  let promises = [];
  let index = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const pokemon of differenceArray) {
    promises.push(axios.get(pokemon.url));
    index++;
    if (!(index % 150)) {
      const result = await Promise.all(promises);
      const res = result.map((p) => p.data);
      saveToMongoPokemons = saveToMongoPokemons.concat(res);
      promises = [];
    }
  }
  const result = await Promise.all(promises);
  const res = result.map((p) => p.data);
  saveToMongoPokemons = saveToMongoPokemons.concat(res);

  saveToMongoPokemons.map(async (p) => {
    const {
      name, base_experience, sprites, types, abilities, weight,
    } = p;
    const allPokemons = new AllPokemons({
      name, base_experience, sprites, types, abilities, weight,
    });
    await allPokemons.save();
    console.log('base updated');
  });
};
