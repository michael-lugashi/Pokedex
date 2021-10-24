'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');
const releaseError = require('../middleware/releaseError');
const validateUser = require('../middleware/validateUser')

router.delete('/:id', validateUser, releaseError,
  (req, res, next) => {
    const username = req.headers.username;
    console.log(username);
    fs.unlink(`./src/users/${username}/${req.params.id}.json`),
        res.send('delete succesful');
        console.log('File deleted!');
      });

module.exports = router;