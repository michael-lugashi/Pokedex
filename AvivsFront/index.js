//<---------------- API ----------------->
let userName = "false"; //Global user name - starts as null
//Post your initial user name to the server 
const baseUrl = "http://localhost:3000"; //API "GET" URL
const postUserName = async () => { 
    try {
        const response = await axios.post(
            `${baseUrl}/info`,
            {username: userName}
        )
        const data = response.data;
        userName = data.username;
        return(data);
    } catch (error) {
        console.error("No User Name")
    }
};

// Get pokemon stats by ID through API (pokemonRouter.js)
const getPokemonById = async (pokemonId) => { //Async Pokemon data get by ID
    try {
        const response = await axios.get(
            `${baseUrl}/pokemon/get/${pokemonId}`,
            {
                headers: {
                    'username': userName
                }
            });
        const data = response.data;
        const pokemonObject = pokemonCreator(data.name, data.height, data.weight, data.types, data.id); //Creates a new Pokemon object
        return(pokemonObject);
    } catch (error) {
        const errorStatus = error.response.status;
        if(errorStatus === 401){
            alert(error.response.data);
        }else{
            alert("Invalid Pokemon Name/ID");
        }
    }
};
//`${baseUrl}pokemon/?pokemon=${pokemonName}` //query operator

// Get pokemon stats by ID through API (pokemonRouter.js)
const catchPokemon = async (pokemonId) => { //Async Pokemon data get by name query
    try {
        const response = await axios.put(
            `${baseUrl}/pokemon/catch/${pokemonId}`,
            pokemonId,  //Put request must have a body
            {
                headers: {
                    'username': userName
                }
            });
        const data = response.data;
        return(data);
    } catch (error) {
        const errorStatus = error.response.status;
        console.log(errorStatus);
        if(errorStatus === 401 || errorStatus === 403){
            alert(error.response.data);
        }else{
            alert("Invalid Pokemon Name/ID");
        }
    }
};

// Get pokemon stats by ID through API (pokemonRouter.js)
const releasePokemon = async (pokemonId) => { //Async Pokemon data get by name query
    try {
        const response = await axios.delete(
            `${baseUrl}/pokemon/release/${pokemonId}`,
            {
                headers: {
                    'username': userName
                }
            });
        const data = response.data;
        return(data);
    } catch (error) {
        const errorStatus = error.response.status;
        console.log(errorStatus);
        if(errorStatus === 401 || errorStatus === 403){
            alert(error.response.data);
        }else{
            alert("Invalid Pokemon Name/ID");
        }
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
const listBtn = document.getElementById("list-btn");

async function resultsDivUpdate(pokemonName){
    const pokemonObject = await getPokemonById(pokemonName); //Pokemon object recieved
    const pokemonElement = createPokemonElement(pokemonObject); //Pokemon element created
    createTypesElements(pokemonObject.types); //Types list element creator
    resultDiv.innerHTML = "Result:"; //Clears the results <div>
    resultDiv.appendChild(pokemonElement);//Appends the Pokemon element in the result <Div>
};

//<--Event Listeners-->
resultDiv.addEventListener("click", createListOfRelatedPokemons);

//Click eventlistener in Search Button element
searchBtn.addEventListener("click", async (e)=>{ //Async event listener on search button click 
    e.preventDefault();
    const pokemonName = searchInput.value;
   resultsDivUpdate(pokemonName);
});

//<--Event Handlers-->

//Related name click handler
function relatedNameClick(e){
    const pokemonName = e.target.textContent;
    searchInput.value = pokemonName; //Rests the input value of the search input
    resultsDivUpdate(pokemonName); //Rests the results <div>
};

//Type click handler
async function createListOfRelatedPokemons(e){
    if(e.target.className === "type-class"){ //Validates the selected element by class name
        const listOfPokemnsArray = await getTypeRelatedPokemons(e.target.textContent); //Saves the array of the related pokemon in a constant variable
        const listOfPokemonsElement = createElement("ul", createPokemonList(listOfPokemnsArray), ["pokemons-list-class"]); //Creates a list element of related pokemons
        e.target.appendChild(listOfPokemonsElement); //Appends the list as a child of the specific Type
    }
};

//Image hover handler
function imageHover(e){
    const frontImageSource = e.target.getAttribute("src"); //Gets the front image URL from the attribute
    const backImageSource = frontImageSource.replace("/pokemon/", "/pokemon/back/") //Replaces the front image URL to a path that leads to the back image
    e.target.setAttribute("src", backImageSource); //Sets the back URL as an attribute
    e.target.addEventListener("mouseleave", (e)=>{ //Listens to a mouse leave event on the Image
        e.target.setAttribute("src", frontImageSource); //Sets the back URL as an attribute
    });
};

//Catch click handler
async function handleCatch(e){
    e.preventDefault();
    resultDiv.innerText = await catchPokemon(searchInput.value);
};

//Release click handler
async function handleRelease(e){
    e.preventDefault();
    resultDiv.innerText = await releasePokemon(searchInput.value);
}

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
    //Catch button
    const catchButton = createElement("button", ["CATCH!"], ["catch-button-class"]);
    catchButton.addEventListener("click", handleCatch);
    const releaseButton = createElement("button", ["RELEASE!"], ["release-button-class"]);
    releaseButton.addEventListener("click", handleRelease);
    return createElement("div", [nameEl, heightEl, weightEl, typesEl, imgEl, catchButton, releaseButton], ["pokemon-class"]);
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

//<---------------- Pop Up Form ------------------->

const submitLogin = document.getElementById("login-button");
const loginInput = document.getElementById("username-input");
const openButton = document.getElementById("openButton");
submitLogin.addEventListener("click", handleLogin);

function handleLogin(e){
    e.preventDefault();
    if(loginInput.value === ""){ //Validates the username input
        alert("Invalid Username")
    }else{
        userName = loginInput.value; //Assigns the global userName with the new input
        loginInput.value = userName; //Assigns the userName to the input value
        openButton.innerText = userName; //Changes the button inner text to userName
        postUserName(); //Activate the post username request to the server
        closeForm();
    }
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }