'use strict';
const express = require('express');
const app = express();
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
const port = 3000;

// start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
app.use((req, res, next) => { // chrome only work with this headers !
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
// route our app
app.get('/pokemon/get/:id', (req, res) => {
  console.log(req.params.id)
  P.getPokemonByName(req.params.id).then((pokemon) => {
    // console.log(pokemon)
    res.send(pokemon);
  });
  // res.send(pokemon);
});
 