const { Router } = require('express');
const FavoritePokemon = require('../models/favoritePokemon');
const AllPokemons = require('../models/allPokemons');

const router = Router();
const auth = require('../midleware/auth_midleware');
const mongoose = require('mongoose');

router.post(
  '/add-favorite', auth,
  async (req, res) => {
    try {
      const favoritePokemon = new FavoritePokemon({
        pokemonId: req.body.pokemonId,
        owner: req.user.user_id,
      });
      await favoritePokemon.save();
      const pokemon = await AllPokemons.findById({ _id: req.body.pokemonId });
      console.log(pokemon);
      res.status(200).json({ pokemon });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'something wrong' });
    }
  },
);
router.get('/type',
  async (req, res) => {
    try {
      const { currentPage, pageSize } = req.query;
      const str = [req.query.type];
      const type = str[0].split(',');
      const offset = (currentPage - 1) * pageSize;
      const totalCount = await AllPokemons.countDocuments(({ types: { $elemMatch: { 'type.name': { $in: type } } } }));
      const pokemons = await AllPokemons.find(({ types: { $elemMatch: { 'type.name': { $in: type } } } })).skip(offset).limit(parseInt(pageSize));
      res.status(200).json({ pokemons, totalCount });
    } catch (e) {
      res.status(500).json({ message: 'something wrong' });
    }
  });
router.get('/name',
  async (req, res) => {
    try {
      const { name, currentPage, pageSize } = req.query;
      console.log(name, currentPage, pageSize);
      const offset = (currentPage - 1) * pageSize;
      const totalCount = await AllPokemons.countDocuments({ name: new RegExp(`^${name}`, 'i') });
      const pokemons = await AllPokemons.find({ name: new RegExp(`^${name}`, 'i') }).skip(offset).limit(parseInt(pageSize));
      res.status(200).json({ pokemons, totalCount });
    } catch (e) {
      res.status(500).json({ message: 'something wrong' });
    }
  });

router.get('/all',
  async (req, res) => {
    try {
      const { currentPage, pageSize } = req.query;
      const offset = (currentPage - 1) * pageSize;
      const totalCount = await AllPokemons.countDocuments({ pokemon: Object });
      const pokemons = await AllPokemons.find({ pokemon: Object }).skip(offset).limit(parseInt(pageSize));
      res.status(200).json({ pokemons, totalCount });
    } catch (e) {
      res.status(500).json({ message: 'something wrong' });
    }
  });
router.get(
  '/favorites', auth,
  // User.findOne({ 'items.id': { $all: ids } })
  async (req, res) => {
    try {
      const pokemons = await FavoritePokemon.aggregate([
        {
          $match: {
            owner: new mongoose.Types.ObjectId(req.user.user_id),
          },
        },
        {
          $lookup: {
            from: 'allpokemons',
            localField:
          'pokemonId',
            foreignField:
          '_id',
            as:
          'pokemon',
          }
          ,
        },
        {
          $unwind: {
            path: '$pokemon',
            preserveNullAndEmptyArrays:
          true,
          }
          ,
        },
        {
          $match: {
            pokemon: {
              $exists: true,
            },
          },
        },
        {
          $replaceWith: '$pokemon',
        },
      ]);
      res.json({ pokemons });
    } catch (e) {
      res.status(500).json({ message: e });
    }
  },
);
router.post(
  '/remove/:id', // remove-favorite
  async (req, res) => {
    try {
      const pokemons = await FavoritePokemon.findOneAndDelete({ pokemonId: req.params.id });
      res.json({ pokemons });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'something wrong' });
    }
  },
);

module.exports = router;
