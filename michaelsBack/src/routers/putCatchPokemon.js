'use strict';
const express = require('express');
const router = express.Router();
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
const fs = require('fs');
const os = require('os');
const path = require('path');
const catchError = require('../middleware/catchError');


router.put('/:id', catchError, (req, res) => {
  P.getPokemonByName(req.params.id).then((pokemon) => {
    const { name, height, weight, types, front_pic, back_pic, abilities, id } =
      pokemon;
    const pokemonFiltered = {
      name,
      height,
      weight,
      types,
      front_pic,
      back_pic,
      abilities,
      id,
    };
    const username = req.headers.username;

    if (!fs.existsSync(`./src/users/${username}`)) {
      fs.mkdirSync(`./src/users/${username}`);
    }
 
    fs.writeFileSync(
      `./src/users/${username}/${req.params.id}.json`,
      JSON.stringify(pokemonFiltered)
    );
    res.send(req.params.id);
  });
});

module.exports = router;
