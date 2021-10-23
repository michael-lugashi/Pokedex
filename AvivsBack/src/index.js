'use strict';
const express = require('express');
const app = express();
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
const pokemonRouter = require('./routers/pokemonRouter');
const queryRouter = require('./routers/queryPokemon');
const catchRouter = require('./routers/putCatchPokemon');
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
app.use('/pokemon/get/', pokemonRouter); //Get equest by id with dynamic router 
app.use('/pokemon/', queryRouter); //Get equest by name with query router 
app.use('/pokemon/catch/', catchRouter); // Put request 

 