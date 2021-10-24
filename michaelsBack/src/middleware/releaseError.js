'use strict'
const errorHandling = require('./errorHandler');

function releaseError(req, res) {
    const err = new Error('That pokemon has not been cought yet')
    err.status = 403;
    errorHandling(err, req, res);
  }
  
module.exports = releaseError