'use strict'
const errorHandling = require('./errorHandler');
const fs = require('fs');

function releaseError(req, res, next) {
    const username = req.headers.username;
    const filePath = `./src/users/${username}/${req.params.id}.json`;
    console.log(filePath);
    fs.access(filePath, fs.constants.F_OK, (err) => {
       if(err) {
        const err = new Error('That pokemon has not been cought yet')
        err.status = 403;
        errorHandling(err, req, res);
       }else{
        next();
       }
   })
}
  
module.exports = releaseError