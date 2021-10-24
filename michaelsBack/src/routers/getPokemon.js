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
        const { name, height, weight, types, front_pic, back_pic, abilities } =
          pokemon;
        res.json({
          name,
          height,
          weight,
          types,
          front_pic,
          back_pic,
          abilities,
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
