'use strict';
const express = require('express');
const router = express.Router();
const validateUser = require('../middleware/validateUser')
const fs = require('fs');

router.get('', validateUser, (req, res, next) => {
    const userName = req.headers.username;
    let files;
    if (!fs.existsSync(`./src/users/${userName}`)) {
        res.status(403).send('You have 0 Pokemons');
      }else{
        files = fs.readdirSync(`./src/users/${userName}`)
      }
      for(let i = 0; i < files.length; i++){
        files[i] = fs.readFileSync(`./src/users/${userName}/${files[i]}`).toString();
      }
        console.log("files sent!");
        res.send(files); 
})

module.exports = router;