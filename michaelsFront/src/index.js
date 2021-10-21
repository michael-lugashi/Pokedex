'use strict';
// Event Listeners
searchPokemon.addEventListener('click', searching);
types.addEventListener('click', findPokemonByType);
pokemonTypeList.addEventListener('click', searchPokemonFromType);

// Text from the search bar is sent to the api
function searching() {
  axios
    .get(`http://localhost:3000/pokemon/get/${search.value.toLowerCase()}`)
    .then((response) => updateDom(response.data))
    .catch(() => alert('That Pokemon does not exist!'));
}

// The information from the server is used to update the page
function updateDom(data) {
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
  updatePicture(data.id);
}

// Makes it so when you hover over the pokemon you see its back
function updatePicture(id) {
  pokemonPicture.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  pokemonPicture.addEventListener('mouseenter', () => {
    pokemonPicture.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`;
  });
  pokemonPicture.addEventListener('mouseout', () => {
    pokemonPicture.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  });
}

// creats an element for each type so I can click on the type
function createTypeEl(text) {
  const type = document.createElement('span');
  type.textContent = text;
  return type;
}

// finds all the pokemon that have that type
function findPokemonByType(event) {
  if (event.target.tagName !== 'SPAN') {
    return;
  }
  typeHeading.textContent = `Type: ${event.target.textContent}`;
  axios
    .get(`https://pokeapi.co/api/v2/type/${event.target.textContent}`)
    .then((result) => displayNames(result.data.pokemon));
}

// all the pokemon that have a certain type are diplayed in the DOM
function displayNames(pokemon) {
  let first = pokemonTypeList.firstElementChild;
  while (first) {
    first.remove();
    first = pokemonTypeList.firstElementChild;
  }
  for (const poki of pokemon) {
    console.log(poki.pokemon.name);
    pokemonTypeList.append(createListEl(poki.pokemon.name));
  }
}

// creates a list element for displayNames
function createListEl(name) {
  const pokemon = document.createElement('li');
  pokemon.textContent = name;
  pokemon.classList.add('pokemonName');
  return pokemon;
}

// when you click on a pokemon name from the types list it will be searched
function searchPokemonFromType(event) {
  if (event.target.tagName !== 'LI') {
    return;
  }
  search.value = event.target.textContent;
  searching();
}
