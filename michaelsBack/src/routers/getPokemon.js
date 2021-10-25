'use strict';
const express = require('express');
const router = express.Router();
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
const pokemonNotFound = require('../middleware/notFoundError');

router.get(
  '/:id',
  (req, res, next) => {
    console.log(req.params.id);
    P.getPokemonByName(req.params.id)
      .then((pokemon) => {
        // console.log(pokemon)
        const { name, height, weight, types, sprites: {front_default, back_default}, abilities, id } =
          pokemon;
          console.log(front_default)
        res.json({
          name,
          height,
          weight,
          types,
          front_default, 
          back_default,
          abilities,
          id,
        });
        // res.send(pokemon);
      })
      .catch(() => {
        next();
      });
  },
  pokemonNotFound
);

module.exports = router;
