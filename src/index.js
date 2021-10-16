'use strict'
searchPokemon.addEventListener('click', searching)
types.addEventListener('click', findPokemonByType)
pokemonTypeList.addEventListener('click', searchPokemonFromType)

function searching() {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${search.value}`)
    .then(response => updateDom(response.data))
    .catch(alert('That Pokemon does not exist!'))
}

function updateDom(data) {
    namePokemon.textContent = `Name: ${data.name}`
    height.textContent = `Height: ${data.height}`
    weight.textContent = `Weight: ${data.weight}`
    types.textContent = `Types: `
    for (const pokiType of data.types) {
        types.append(createTypeEl(pokiType.type.name))
        if (data.types[data.types.length-1] !== pokiType) {
            types.append(', ')
        }
    }
    updatePicture(data.id)
    // pokemonPicture.src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${data.id}.png`
}

function updatePicture(id) {
    pokemonPicture.src= `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    pokemonPicture.addEventListener('mouseenter', ()=>{
        pokemonPicture.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
    })
    pokemonPicture.addEventListener('mouseout', ()=>{
        pokemonPicture.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    })

}

function createTypeEl(text) {
    const type = document.createElement('span')
    type.textContent = text
    return type
}

function findPokemonByType(event) {
    if (event.target.tagName !== 'SPAN') {
        return
    }
    axios.get(`https://pokeapi.co/api/v2/type/${event.target.textContent}`)
    .then(result=>displayNames(result.data.pokemon))
}

function displayNames(pokemon) {
    let first = pokemonTypeList.firstElementChild;
    while (first) {
        first.remove();
        first = pokemonTypeList.firstElementChild;
    }
    for (const poki of pokemon) {
        console.log(poki.pokemon.name)
        pokemonTypeList.append(pokemonName(poki.pokemon.name))
    }

}




function pokemonName(name) {
    const pokemon = document.createElement('li')
    pokemon.textContent = name
    return pokemon
}
function searchPokemonFromType(event){
    if (event.target.tagName !== 'LI') {
        return
    }
    search.value = event.target.textContent
    searching()
}