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
  console.log( req.headers.username)
  const username = req.headers.username;
  console.log('p')
  P.getPokemonByName(req.params.id).then((pokemon) => {
    const { name, height, weight, types, sprites: {front_default, back_default}, abilities, id } =
    pokemon;
    const pokemonFiltered = {
      name,
      height,
      weight,
      types,
      front_default,
      back_default,
      abilities,
      id,
    };

    if (!fs.existsSync(`./src/users/${username}`)) {
      fs.mkdirSync(`./src/users/${username}`);
    }
 
    fs.writeFileSync(
      `./src/users/${username}/${req.params.id}.json`,
      JSON.stringify(pokemonFiltered)
    );
    res.send('catch Succesful!');
  });
});

module.exports = router;
