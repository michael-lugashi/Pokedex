//<---------------- API ----------------->

// Get pokemon stats by name or ID through API
const baseUrl = "https://pokeapi.co/api/v2/pokemon/"; //API "GET" URL
const getPokemonByName = async (pokemonName) => { //Async Pokemon data get by name query
    try {
        const response = await axios.get(
            //`https://pokeapi.co/api/v2/pokemon/${pokemonName}`
            baseUrl + pokemonName
        );
        const data = response.data;
        const pokemonObject = pokemonCreator(data.name, data.height, data.weight, data.types, data.id); //Creates a new Pokemon object
        return(pokemonObject);
    } catch (error) {
        console.error("Invalid name or ID")
    }
};


// Get pokemon type stats through API
const getTypeRelatedPokemons = async (typeName) => { //Async Type data get by ID query
    try {
        const response = await axios.get(
            `https://pokeapi.co/api/v2/type/${typeName}/`
        );
        const data = response.data;
        return data.pokemon;
    } catch (error) {
        console.error("Invalid ID")
    }
};

//<---------------- DOM ------------------->

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const resultDiv = document.getElementById("result")

async function resultsDivUpdate(pokemonName){
    const pokemonObject = await getPokemonByName(pokemonName); //Pokemon object recieved
    const pokemonElement = createPokemonElement(pokemonObject); //Pokemon element created
    createTypesElements(pokemonObject.types); //Types list element creator
    resultDiv.innerHTML = "Result:"; //Clears the results <div>
    resultDiv.appendChild(pokemonElement);//Appends the Pokemon element in the result <Div>
};

//<--Event Listeners-->
//Click eventlistener in Search Button element
searchBtn.addEventListener("click", async (e)=>{ //Async event listener on search button click 
    e.preventDefault();
    const pokemonName = searchInput.value;
   resultsDivUpdate(pokemonName);
});

//Image hover handler
function imageHover(e){
        const frontImageSource = e.target.getAttribute("src"); //Gets the front image URL from the attribute
        const backImageSource = frontImageSource.replace("/pokemon/", "/pokemon/back/") //Replaces the front image URL to a path that leads to the back image
        e.target.setAttribute("src", backImageSource); //Sets the back URL as an attribute
        e.target.addEventListener("mouseleave", (e)=>{ //Listens to a mouse leave event on the Image
            e.target.setAttribute("src", frontImageSource); //Sets the back URL as an attribute
        });
};

resultDiv.addEventListener("click", createListOfRelatedPokemons);
//Type click handler
async function createListOfRelatedPokemons(e){
    if(e.target.className === "type-class"){ //Validates the selected element by class name
        const listOfPokemnsArray = await getTypeRelatedPokemons(e.target.textContent); //Saves the array of the related pokemon in a constant variable
        const listOfPokemonsElement = createElement("ul", createPokemonList(listOfPokemnsArray), ["pokemons-list-class"]); //Creates a list element of related pokemons
        e.target.appendChild(listOfPokemonsElement); //Appends the list as a child of the specific Type
    }
};
//Related name click handler
function relatedNameClick(e){
    const pokemonName = e.target.textContent;
    searchInput.value = pokemonName; //Rests the input value of the search input
    resultsDivUpdate(pokemonName); //Rests the results <div>
};

//<--Creators-->
//Create element for each name in the array of pokemons
function createPokemonList(namesArray){
    const pokemonsElementArray = ["Related Pokemons:"] //Initial element array
    namesArray.forEach(pokemon => {
        const pokeName = pokemon.pokemon.name; //Gets the name of the pokemon
        const nameElement = createElement("li", [pokeName], ["name-class"]); //Creates a list item element for that name
        nameElement.addEventListener("click", relatedNameClick); //Adds an event listener to each name
        pokemonsElementArray.push(nameElement); //Pushes the element to an array of elements
    });
    return pokemonsElementArray;
};

//Get "Types" Array and create <li> element for each type slot
function createTypesElements(typesArray){
    const typesElementArray = ["Types:"] //Initial element array
    typesArray.forEach(type => {
        const pokeType = type.type;
        const typeElement = createElement("li", [pokeType.name], ["type-class"]);
        typesElementArray.push(typeElement);
    });
    return typesElementArray;
};

//Pokemon stats div element creator
function createPokemonElement({ name, height, weight, types, imgSource }) {
    // Pokemon Name (<header>)
    const nameEl = createElement("header", [name], ["name-class"]);
    // Pokemon Height (<li>)
    const heightEl = createElement("li", ["Height: ", height], ["stats-class"]);
    // Pokemon Weight (<li>)
    const weightEl = createElement("li", ["Weight: ", weight], ["stats-class"]);
    // Pokemon Types (<ul>)
    const typesEl = createElement("ul", createTypesElements(types), ["types-class"]);
    //Pokemon Image (<img>)
    const imgEl = createElement("img", [] ,["image-class"], {src: imgSource});
    imgEl.addEventListener("mouseover", imageHover)
    return createElement("div", [nameEl, heightEl, weightEl, typesEl, imgEl], ["pokemon-class"]);
};

//Element creator 
function createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {
    //Create element
    const el = document.createElement(tagName);

    // Children
    for(const child of children) {
      el.append(child);
    }
  
    // Classes
    for(const cls of classes) {
      el.classList.add(cls);
    }
  
    // Attributes
    for (const attr in attributes) {
      el.setAttribute(attr, attributes[attr]);
    }

    //Eventlistener ???
    for(const [key, value] of Object.entries(eventListeners)){
      el.addEventListener(`${key}`, `${value}`);
    }
    
    return el;
};
  

//<---------------- OBJECT ------------------->

//Pokemon object constructor
function Pokemon(name, height, weight, types, imgSource){
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.types = [types];
    this.imgSource = imgSource;
};

//Pokemon object creator
function pokemonCreator(name, height, weight, types, id){
    const pokemon = new Pokemon();
    pokemon.name = name;
    pokemon.height = height;
    pokemon.weight = weight;
    pokemon.types = types;
    //changes the ID in the URL to get the selective image path
    pokemon.imgSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    return pokemon;
};
