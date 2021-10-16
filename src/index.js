'use strict'
searchPokemon.addEventListener('click', searching)
types.addEventListener('click', findPokemon) 
// catchPokemon.addEventListener('click', changeCatchStatus.bind(event, 'ignor','helo'))
async function searching() {
    let done = await axios.get(`https://pokeapi.co/api/v2/type/normal`)
    console.log(done)
    axios.get(`https://pokeapi.co/api/v2/pokemon/${search.value}`)
    .then(response => updateDom(response.data))
    .catch(err=> alert(err))
    // let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search.value}`, {method: 'GET'})
    // response = JSON.parse(response)

}

function updateDom(data) {
    // let catchOrRelease = await getCatchStatus(`https://murmuring-cove-95500.herokuapp.com/api/collection/status/${data.id}`)
    // catchPokemon.addEventListener('click', changeCatchStatus.bind(event, `https://murmuring-cove-95500.herokuapp.com/api/collection/status/${data.id}`))
    // catchPokemon.textContent=catchOrRelease
    // catchPokemon.hidden=false;
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

// async function getCatchStatus(url) {
//     const response = await axios.get(url)
//     return response.data.status
// }

// async function changeCatchStatus(url) {
//     const res = await axios.post(url, {status: 'caught'})
//     console.log(res)
// }

function createTypeEl(text) {
    const type = document.createElement('span')
    type.textContent = text
    return type
}

function findPokemon(event) {
    if (event.target.tagName !== 'SPAN') {
        return
    }
    axios.get(`https://pokeapi.co/api/v2/type/${event.target.textContent}`)
    .then(result=>displayNames(result.data.pokemon))

}