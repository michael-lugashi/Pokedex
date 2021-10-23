'use strict';
const express = require('express');
const router = express.Router();
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
const fs = require('fs');
const path = require('path');
const os = require('os');

router.get('', (req, res) => {
    const userName = os.userInfo().username;
    let files;
    if (!fs.existsSync(`./src/users/${userName}`)) {
        res.status(403).send('You have 0 Pokemons');
      }else{
        files = fs.readdirSync(`./src/users/${userName}`)
      }
      for(let i = 0; i < files.length; i++){
        files[i] = fs.readFileSync(`./src/users/${userName}/${files[i]}`).toString();
      }
        console.log(files);
        res.send(files); 
})

module.exports = router;