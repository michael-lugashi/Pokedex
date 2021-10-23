// GET - /pokemon/get/:id - should respond with a pokemon queried by its id using Route parameters
// GET - /pokemon/query - should respond with a pokemon queried by its name using a JSON send in the requests query: { query: <string> }
const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
    const pokemonId = req.params.id;
    P.getPokemonByName(pokemonId).then((pokemon) => {
        res.send(pokemon);
    })
})

module.exports = router;