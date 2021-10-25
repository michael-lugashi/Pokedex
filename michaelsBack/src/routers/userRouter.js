'use strict';
const express = require('express');
const router = express.Router();
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
const fs = require('fs');

router.post('', (req, res) => {

    if (!fs.existsSync(`./src/users/${req.body.username}`)){
        fs.mkdirSync(`./src/users/${req.body.username}`);
    }

    console.log(req.body.username)
    res.send(`Created new user ${req.body.username}, now log in!`)
});

module.exports = router;
