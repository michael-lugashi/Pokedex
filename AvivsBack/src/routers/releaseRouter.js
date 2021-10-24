'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');
const releaseError = require('../middleware/releaseError');
const validateUser = require('../middleware/validateUser')

router.delete('/:id', validateUser, releaseError,
  (req, res) => {
    const username = req.headers.username;
    fs.unlinkSync(`./src/users/${username}/${req.params.id}.json`),
        res.send('delete succesful');
        console.log('File deleted!');
      });

module.exports = router;