'use strict';

const errorHandling = require('./errorHandler');

function checkUser(req, res, next) {
  const username = req.headers.username;
  if (username==='') {
    const err = new Error('You need to login');
    err.status = 401;
    errorHandling(err, req, res);
  } else {
      next()
  }
}
module.exports = checkUser;
