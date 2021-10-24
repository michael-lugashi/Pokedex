'use strict';
const express = require('express');
const app = express();
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
const idRouter = require('./routers/idRouter');
const queryRouter = require('./routers/queryRouter');
const catchRouter = require('./routers/catchRouter');
const listRouter = require('./routers/listRouter');
const releaseRouter = require('./routers/releaseRouter');
const userNameRouter = require('./routers/userNameRouter');

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

app.use(express.json())

// route our app
app.use('/pokemon/get/', idRouter); //Get request by id with dynamic router 
app.use('/pokemon/?pokemon=', queryRouter); //Get request by name with query router 
app.use('/pokemon/catch/', catchRouter); //Put request by id, adds database 
app.use('/pokemon/release/', releaseRouter);//Delete request by id, discards database
app.use('/pokemon/', listRouter);//Get request, returns list of database
app.use('/info', userNameRouter)//Get request, returns username

 