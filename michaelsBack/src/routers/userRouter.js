'use strict';
const express = require('express');
const router = express.Router();
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();

router.post('', (req, res) => {
    console.log(req.body)
    // res.append(JSON.stringify(req.body));
    // req.set(req.body)
    res.send(req.body)
});

module.exports = router;
