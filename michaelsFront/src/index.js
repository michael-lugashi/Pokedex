'use strict';
// Event Listeners
let username = '';
const baseUrl = 'http://localhost:3000/';
document.addEventListener('click', buttons);


function buttons(event) {
  if (event.target.tagName !== 'BUTTON') {
    // return;
  }
  const btn = event.target.id;
  if (btn === 'catch') {
    catchPokemon('d');
    return;
  }
  if (btn === 'release') {
    releasePokemon();
    return;
  }
  const input = event.target
    .closest('div')
    .querySelector('input')
    .value.toLowerCase();

  if (btn === 'logIn') {
    logIn(input);
    return;
  }
  if (btn === 'createAccount') {
    createAccount(input);
    return;
  }
  if (btn === 'searchPokemonById') {
    searchPokemon(input, 'pokemon/get/');
    return;
  }
  if (btn === 'searchPokemonByName') {
    searchPokemon(input, 'pokemon/?pokemon=');
    return;
  }
  if (btn === 'seeCoaghtPokemon') {
    seeCoaghtPokemon();
  }
}
function seeCoaghtPokemon() {
  axios
    .get(`${baseUrl}pokemon/list`, {
      headers: {
        username,
      },
    })
    .then((response) => {
      clearList()
      const pokemons=response.data
      for (const pokemon of pokemons) {
        createPokemon(JSON.parse(pokemon))
      }
    }).catch((err) => {
      alert(err)
    })
}
function clearList() {
  coaghtContainer.hidden = false
  let first = coaghtPokemon.firstElementChild;
  while (first) {
    first.remove();
    first = coaghtPokemon.firstElementChild;
  }
}
function createPokemon(pokemon){
  console.log(pokemon)
  let container = document.createElement('div')
  let img = document.createElement('img')
  img.src = pokemon.front_default
  let name = document.createElement('p')
  name.textContent = pokemon.name
  container.append(img)
  container.append(name)
  coaghtPokemon.append(container)
}

function releasePokemon() {
  axios.delete(`${baseUrl}pokemon/release/${displayContainer.pokemon}`, {
    headers: {
      username,
    },
  }).then(response => {
    alert(response.data)
  })
  .catch(err => {
    alert(err)
  })
}
function catchPokemon() {
  console.log(displayContainer.pokemon);
  axios
    .put(
      `${baseUrl}pokemon/catch/${displayContainer.pokemon}`,
      { body: null }, // put request must have body
      {
        headers: {
          username,
        },
      }
    )
    .then((response) => alert(response.data))
    .catch((err) => alert(err));
}
function createAccount(input) {
  axios
    .post(`${baseUrl}info`, {
      username: input,
    })
    .then((response) => alert(response.data))
    .catch((err) => alert(err));
}
function logIn(input) {
  // const input = btn.closest('div').querySelector('input').value
  username = input;
  const header = document.querySelector('#infoContainer > .headings');
  header.textContent = `Welcome: ${username}`;
}
// Text from the search bar is sent to the api
function searchPokemon(input, extention) {
  // const input = btn.closest('div').querySelector('input').value.toLowerCase();
  console.log(input);
  axios
    .get(`${baseUrl}${extention}${input}`, {
      headers: {
        username,
      },
    })
    .then((response) => {
      catchOrRelease.hidden = false;
      updateDom(response.data);
    })
    .catch((err) => alert(err));
}

// The information from the server is used to update the page
function updateDom(data) {
  catchOrRelease.hidden = false;
  displayContainer.pokemon = data.id;
  namePokemon.textContent = `Name: ${data.name}`;
  height.textContent = `Height: ${data.height}`;
  weight.textContent = `Weight: ${data.weight}`;
  types.textContent = `Types: `;
  for (const pokiType of data.types) {
    types.append(createTypeEl(pokiType.type.name));
    // I add a comma and a space seperating the types unless its the last type
    if (data.types[data.types.length - 1] !== pokiType) {
      types.append(', ');
    }
  }
  updatePicture(data.front_default, data.back_default);
}

// Makes it so when you hover over the pokemon you see its back
function updatePicture(front, back) {
  pokemonPicture.src = front;
  pokemonPicture.addEventListener('mouseenter', () => {
    pokemonPicture.src = back;
  });
  pokemonPicture.addEventListener('mouseout', () => {
    pokemonPicture.src = front;
  });
}

// creats an element for each type so I can click on the type
function createTypeEl(text) {
  const type = document.createElement('span');
  type.textContent = text;
  return type;
}


