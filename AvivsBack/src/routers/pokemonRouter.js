// GET - /pokemon/get/:id - should respond with a pokemon queried by its id using Route parameters
// GET - /pokemon/query - should respond with a pokemon queried by its name using a JSON send in the requests query: { query: <string> }
const { json } = require('body-parser');
const express = require('express');
const router = express.Router();

router.get('/pokemon/get/:id', function(req, res) {
    const pokemonId = req.params.id;
    P.getPokemonByName(pokemonId).then((pokemon) => {
        res.send(pokemon);
    })
})


// router.get('/pokemon/query', function(req, res) {
//     const pokemonName = req.query;
//     const pokemon = P.getPokemonByName(pokemonName).then((pokemon) => {
        
//        const { name, height, weight, types, front_pic, back_pic, abilities } = pokemon;
        
   
//     json.send({
        
//     })
//   })