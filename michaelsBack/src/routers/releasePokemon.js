'use strict';
const express = require('express');
const router = express.Router();
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
const fs = require('fs');
const os = require('os');

router.delete('/:id', (req, res) => {
  console.log(req.params.id);
  P.getPokemonByName(req.params.id).then((pokemon) => {
    // console.log(pokemon)
    res.send(pokemon);
  });
});

module.exports = router;
