const {Router} = require('express')
const FavoritePokemon = require('../models/favoritePokemon')
const router = Router()
const auth = require("../midleware/auth_midleware")
const axios = require("axios");
router.post(
  '/add', auth,
  async (req, res) => {
    try {
      const {name, base_experience, sprites, types, abilities, owner} = req.body.pokemon
      const favoritePokemon = new FavoritePokemon({
        name,
        base_experience,
        sprites,
        types,
        abilities,
        owner
      })
      await favoritePokemon.save()
      res.status(200).json({favoritePokemon})

    } catch (e) {
      console.log(e);
      res.status(500).json({message: 'something wrong'})
    }
  })
router.get('/all',
  async (req, res) => {
    try {
      const {currentpage,pagesize}=req.headers
      const response= await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${pagesize}&offset=${(currentpage - 1) * pagesize}`)
      const count = response.data.count
      const promiseArray = response.data.results.map((pokemon) => axios.get(pokemon.url))
      const pokemonsArr = await Promise.all(promiseArray)
      const finalRes=pokemonsArr.map(p=>p.data)
      res.status(200).json({finalRes,count})
    } catch (e) {
      res.status(500).json({message: 'something wrong'})
    }
  })
router.get(
  '*', auth,
  async (req, res) => {
    try {
      const pokemons = await FavoritePokemon.find({owner: req.user.user_id})
      res.json({pokemons})
    } catch (e) {
      res.status(500).json({message: 'something wrong'})
    }
  }
)
router.post(
  '/remove/:id',  //remove-favorite
  async (req, res) => {
    try {
      const pokemons = await FavoritePokemon.findByIdAndDelete(req.params.id)
      res.json({pokemons})
    } catch (e) {
      console.log(e);
      res.status(500).json({message: 'something wrong'})
    }
  })

module.exports = router
