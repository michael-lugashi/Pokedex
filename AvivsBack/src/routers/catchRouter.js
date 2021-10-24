'use strict';
const express = require('express');
const router = express.Router();
const Pokedex = require('pokedex-promise-v2');
const validateUser = require('../middleware/validateUser')
const catchError = require('../middleware/catchError');
const P = new Pokedex();
const fs = require('fs');
const os = require('os');

router.put('/:id', validateUser, catchError, (req, res) => {
  P.getPokemonByName(req.params.id)
  .then((pokemon) => {
    const { name, height, weight, types, front_pic, back_pic, abilities, id } = pokemon;
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
    console.log(username);
    if (!fs.existsSync(`./src/users/${username}`)) {
      fs.mkdirSync(`./src/users/${username}`);
    }
    fs.writeFileSync(
      `./src/users/${username}/${req.params.id}.json`,
      JSON.stringify(pokemonFiltered)
    );
    res.send(`You caught ${name} !!!`);
  });
});

module.exports = router;
