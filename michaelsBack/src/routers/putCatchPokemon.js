'use strict';
const express = require('express');
const router = express.Router();
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
const fs = require('fs');
const os = require('os');
const path = require('path');

// const mkdirp = require('mkdirp');

router.put('/:id', (req, res) => {
  // console.log(path.dirname)
  P.getPokemonByName(req.params.id).then((pokemon) => {
    // console.log(pokemon)

    const { name, height, weight, types, front_pic, back_pic, abilities, id } =
      pokemon;
    const pokemonFiltered = {
      name,
      height,
      weight,
      types,
      front_pic,
      back_pic,
      abilities,
      id,
    };
    // console.log(os.userInfo());
    if (
      fs.existsSync(
        `./src/users/${os.userInfo().username}/${req.params.id}.json`
      )
    ) {
      res.status(403).send('This pokemon is already cought');
      return;
      console.log('brave');
    }
    if (!fs.existsSync(`./src/users/${os.userInfo().username}`)) {
      fs.mkdirSync(`./src/users/${os.userInfo().username}`);
    }
    // fs.mkdir('./src/users/max-lang', (err) => {
    //     res.send(pokemonFiltered);
    // });
    fs.writeFileSync(
      `./src/users/${os.userInfo().username}/${req.params.id}.json`,
      JSON.stringify(pokemonFiltered)
    );
    res.send(req.params.id);
  });
  // ./users/max-langerman/134.json

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
});

module.exports = router;
