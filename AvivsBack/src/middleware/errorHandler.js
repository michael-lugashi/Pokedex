'use strict';
const fs = require('fs');
function errorHandling(err, req, res) {
  console.log(err);
  res.status(err.status || 500);
  res.send(err.message || 'Server Error');
}

module.exports = errorHandling

