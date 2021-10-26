const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();
const cors = require('cors');
const updatePokemons = require('./midleware/updatePokemons');

app.use(express.json());// для распознавания входящего объекта запроса как объекта JSON.
app.use(cors({ credentials: true, origin: 'http://localhost:5000/' }));
app.use('/api/pokemons', require('./routes/pokemons.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/profile', require('./routes/profileInfo.routes'));

const PORT = config.get('port') || 5000;

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`app has been started on port ${PORT}...`));
  } catch (e) {
    process.exit(1);
  }
}
const startApp = async () => {
  await start();
  await updatePokemons();
};
startApp();
