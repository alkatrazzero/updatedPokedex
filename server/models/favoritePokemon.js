const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  pokemonId: { type: Types.ObjectId, ref: 'AllPokemons' },
  owner: { type: Types.ObjectId, ref: 'User' },
});
module.exports = model('FavoritePokemon', schema);
