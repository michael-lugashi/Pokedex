'use strict';
const fs = require('fs');
const errorHandling = require('./errorHandler');

function pokemonNotExist(req, res) {
  const err = new Error('This pokemon does not exist')
  err.status = 404
  errorHandling(err, req, res)
}
module.exports = pokemonNotExist