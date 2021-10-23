'use strict';
const express = require('express');
const router = express.Router();
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
const fs = require('fs');
const os = require('os');

router.delete('/:id', (req, res) => {
    console.log(req.params.id);
    fs.unlink(
      `./src/users/${os.userInfo().username}/${req.params.id}.json`,
      (err) => {
        if (err) {
          res.status(403).send('That pokemon has not been caught yet');
          return;
        }
        res.send('delete succesful')
        // if no error, file has been deleted successfully
        console.log('File deleted!');
      }
    );
  });
  
  module.exports = router;