'use strict';
const express = require('express');
const router = express.Router();

router.post('', (req, res) => {
    let userName = JSON.stringify(req.body);
        console.log(userName)
        res.send(userName); 
})

module.exports = router;