'use strict';
const fs = require('fs');
// async function catchError(req, res, next) {
//   const username = req.headers.username;
//   fs.exists(`./src/users/${username}/${req.params.id}.json`, (exists) => {
//     if (exists) {
//       const err = new Error('That Pokemon has already been cought');
//       err.status = 403;
//       errorHandling(err, req, res);
//     } else {
//       next();
//     }
//   });
// }

// function releaseError(err, req, res) {
//   err.message = 'That pokemon has not been cought yet'
//   err.status = 403;
//   errorHandling(err, req, res);
// }

function errorHandling(err, req, res) {
  res.status(err.status || 500);
  // res.status(500)
  res.send(err.message || 'Server Error');
  // throw err;
}
// module.exports = catchError
module.exports = errorHandling
// exports.catching = catchError
// exports = {
//     catching: catchError(),
//     release: releaseError
// }
