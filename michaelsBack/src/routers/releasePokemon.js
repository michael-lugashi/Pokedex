'use strict';
const express = require('express');
const router = express.Router();
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
const fs = require('fs');
const os = require('os');
const releaseError = require('../middleware/releaseError');

router.delete(
  '/:id',
  (req, res, next) => {
    const username = req.headers.username;
    console.log(req.params.id);
    fs.unlink(
      `./src/users/${username}/${req.params.id}.json`,
      (err) => {
        if (err) {
          next();
          // releaseError(err, req, res)
          // res.status(403).send('That pokemon has not been caught yet');
          return;
        }
        res.send('delete succesful');
        // if no error, file has been deleted successfully
        console.log('File deleted!');
      }
    );
    //   fs.existsSync(`./src/users/${os.userInfo().username}/${req.params.id}.json`, (exists)=>{
    //       if (!exists) {
    //           res.status(403).send('That pokemon has not been caught yet')
    //           return
    //       }

    //   });
    //   P.getPokemonByName(req.params.id).then((pokemon) => {
    //     // console.log(pokemon)

    //     res.send(pokemon);
    //   });
  },
  releaseError
);

module.exports = router;
