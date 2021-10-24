'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('', (req, res) => {
  const username = req.headers.username;
  let files;
  if (!fs.existsSync(`./src/users/${userName}`)) {
    res.status(403).send('You have 0 Pokemons');
  } else {
    files = fs.readdirSync(`./src/users/${userName}`);
  }
  for (let i = 0; i < files.length; i++) {
    files[i] = fs
      .readFileSync(`./src/users/${userName}/${files[i]}`)
      .toString();
  }
  console.log(files);
  res.send(files);
});

module.exports = router;
