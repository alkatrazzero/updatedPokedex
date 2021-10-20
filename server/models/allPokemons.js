const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: { type: String },
  base_experience: { type: Number },
  sprites: { type: Object },
  types: { type: Object },
  abilities: { type: Array },
  weight: { type: Number },

});
module.exports = model('AllPokemons', schema);
