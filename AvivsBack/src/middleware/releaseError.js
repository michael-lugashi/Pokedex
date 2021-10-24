'use strict'
const errorHandling = require('./errorHandler');
const fs = require('fs');

function releaseError(req, res) {
    const username = req.headers.username;
    fs.exists(`./src/users/${username}/${req.params.id}.json`, (exists) => {
      if (!exists) {
        const err = new Error('That pokemon has not been cought yet')
        err.status = 403;
        errorHandling(err, req, res);
      }
  })
}
  
module.exports = releaseError