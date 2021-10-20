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
      if (req.user.user_id) {
        const favoritePokemon = new FavoritePokemon({
          pokemonId: req.body.pokemonId,
          owner: req.user.user_id,
        });
        await favoritePokemon.save();
      } else {
        res.status(402).json({ message: 'Вы не авторизованы' });
      }
      if (req.body.pokemonId) {
        await AllPokemons.findById({ _id: req.body.pokemonId }, (err, pokemon) => {
          if (err) {
            console.log(err);
          }
          res.status(200).json({ pokemon });
        });
      } else res.status(404).json({ message: 'такого покемона не существует' });
    } catch (e) {
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
      if (req.query.type) {
        const offset = (currentPage - 1) * pageSize;
        const totalCount = await AllPokemons.countDocuments(({ types: { $elemMatch: { 'type.name': { $in: type } } } }));
        await AllPokemons.find(({ types: { $elemMatch: { 'type.name': { $in: type } } } }), (err, pokemons) => {
          if (err) {
            console.log(err);
          }
          res.status(200).json({ pokemons, totalCount });
        }).skip(offset).limit(parseInt(pageSize));
      } else {
        res.status(400).json({ message: 'тип не выбран' });
      }
    } catch (e) {
      res.status(500).json({ message: 'something wrong' });
    }
  });
router.get('/name',
  async (req, res) => {
    try {
      const { name, currentPage, pageSize } = req.query;
      const offset = (currentPage - 1) * pageSize;
      const totalCount = await AllPokemons.countDocuments({ name: new RegExp(`^${name}`, 'i') });
      await AllPokemons.find({ name: new RegExp(`^${name}`, 'i') }, (err, pokemons) => {
        if (err) {
          console.log(err);
        }
        res.status(200).json({ pokemons, totalCount });
      }).skip(offset).limit(parseInt(pageSize));
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
      await AllPokemons.find({ pokemon: Object }, (err, pokemons) => {
        if (err) {
          console.log(err);
        }
        res.status(200).json({ pokemons, totalCount });
      }).skip(offset).limit(parseInt(pageSize));
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
      await FavoritePokemon.findOneAndDelete({ pokemonId: req.params.id }, (err, pokemons) => {
        if (err) {
          console.log(err);
        }
        res.json({ pokemons });
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'something wrong' });
    }
  },
);

module.exports = router;
