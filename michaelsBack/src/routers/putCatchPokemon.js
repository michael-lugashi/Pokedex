'use strict';
const express = require('express');
const router = express.Router();
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
const fs = require('fs');
const path = require('path');

router.put('/:id', (req, res) => {
  // console.log(path.dirname)
  fs.writeFileSync('./src/users/user1.json', `{"${req.params.id}": cought},\n`, { flag: 'a+' });

//   fs.writeFile('../users/result.txt', 'This is my text', (err)=> {
//     if (err) throw err;
//     console.log('Results Received');
//   });
//   fs.open(`../users`, 'wx', (err, desc) => {
//     if(!err) {
//        fs.writeFile(`map.txt`, 'sample data', (err) => {
//          // Rest of your code
//          if (err) throw err;               
//          console.log('Results Received');
//        })
//     }
//   })
  console.log(req.params.id);

  // P.getPokemonByName(req.params.id).then((pokemon) => {
  //   // console.log(pokemon)
  //   res.send(pokemon);
  // });
  res.send(req.params.id);
});

module.exports = router;
