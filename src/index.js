'use strict'
searchPokemon.addEventListener('click', searching)

async function searching() {
    console.log(search.value)
    const response = await axios.get(`https://murmuring-cove-95500.herokuapp.com/api/pokemon/${search.value}`)
    console.log(response.data.name)
    // const pokemon = document.getElementById('name')
    // pokemon.textContent = response.data.name
    updateDom(response.data)

}

function updateDom(data) {
    // const pokemon = document.getElementById('name')
    namePokemon.textContent = `Name: ${data.name}`
    height.textContent = `Height: ${data.height}`
    weight.textContent = `Weight: ${data.weight}`
    type.textContent = `Types: ${data.types}`
    pokemonPicture.src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${data.id}.png`
}