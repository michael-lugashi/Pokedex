'use strict';
const fs = require('fs');
const errorHandling = require('./errorHandler');

function catchError(req, res, next) {
  const username = req.headers.username;
  fs.exists(`./src/users/${username}/${req.params.id}.json`, (exists) => {
    if (exists) {
      const err = new Error('That Pokemon has already been cought');
      err.status = 403;
      errorHandling(err, req, res);
    } else {
      next();
    }
  });
}
module.exports = catchError