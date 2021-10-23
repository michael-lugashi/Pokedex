'use strict';
const express = require('express');
const router = express.Router();
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();

router.get('', (req, res) => {
  console.log(req.query);
  P.getPokemonByName(req.query.pokemon).then((pokemon) => {
    // console.log(pokemon)
    const { name, height, weight, types, front_pic, back_pic, abilities } = pokemon;
    res.json({
        name,
        height,
        weight,
        types,
        front_pic,
        back_pic,
        abilities
    });
  });
});
module.exports = router;
