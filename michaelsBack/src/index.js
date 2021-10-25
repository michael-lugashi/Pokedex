'use strict';
const express = require('express');
const app = express();
// const Pokedex = require('pokedex-promise-v2');
// const P = new Pokedex();
const pokemonRouter = require('./routers/getPokemon');
const queryRouter = require('./routers/queryPokemon');
const catchRouter = require('./routers/putCatchPokemon');
const releasePokemon = require('./routers/releasePokemon');
const user = require('./routers/userRouter');
const checkUser = require('./middleware/userHandler');
const listRouter = require('./routers/listRouter');
const port = 3000;

// start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
app.use((req, res, next) => { // chrome only work with this headers !
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  res.append("Access-Control-Allow-Headers", "username");
  next();
});
app.use(express.json());
app.use(checkUser);
// route our app
app.use('/pokemon/get/', pokemonRouter);
app.use('/pokemon/', queryRouter);
app.use('/pokemon/catch/', catchRouter);
app.use('/pokemon/release/', releasePokemon);
app.use('/info', user);
app.use('/pokemon/list', listRouter);
