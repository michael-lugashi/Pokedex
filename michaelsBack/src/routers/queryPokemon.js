'use strict';
const express = require('express');
const router = express.Router();
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
const pokemonNotFound = require('../middleware/notFoundError');

router.get(
  '',
  (req, res, next) => {
    console.log(req.query);
    P.getPokemonByName(req.query.pokemon)
      .then((pokemon) => {
        const { name, height, weight, types, sprites: {front_default, back_default}, abilities, id } =
          pokemon;
        res.json({
          name,
          height,
          weight,
          types,
          front_default,
          back_default,
          abilities,
          id
        });
      })
      .catch(() => {
        next();
      });
  },
  pokemonNotFound
);
module.exports = router;
