'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');
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
          return;
        }
        res.send('delete succesful');
        console.log('File deleted!');
      }
    );
  },
  releaseError
);

module.exports = router;
