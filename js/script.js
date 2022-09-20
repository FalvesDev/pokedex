const pokemonName = document.querySelector('#pokemon__name');
const pokemonNumber = document.querySelector('#pokemon__number');
const pokemonImage = document.querySelector('#pokemon__image');
const pokemonSh = document.querySelector('#pokemon__sh');
//api, todo que vai mostrar na tela

const form = document.querySelector('#form');
const input = document.querySelector('#input__search');

const buttonPrev = document.querySelector('#btn-prev');
const buttonNext = document.querySelector('#btn-next');
// botao prev,next

const buttonShi = document.querySelector('#sh-btn');

let searchPokemon = 1;

var psnot = true;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    };

}
//acesso da api

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data){
    pokemonImage.style.display = 'block';
    pokemonSh.style.display ='none';
    pokemonName.innerHTML = data.name; 
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-vii']['ultra-sun-ultra-moon']['front_default'];
    input.value = '';
    searchPokemon = data.id;
    psnot = true;
    } else {
        pokemonName.innerHTML = 'Not found'; 
        pokemonNumber.innerHTML = '???';
        pokemonImage.style.display = 'none';
        pokemonSh.style.display ='none';
        input.value = '';
        psnot = false;
    };
}
//renderizando dados da api

form.addEventListener('submit', (event) => {
    event.preventDefault(); 
    renderPokemon(input.value.toLowerCase());
});
//parte de busca

var shiny = false;

buttonShi.addEventListener('click', async () => {

    const data = await fetchPokemon(searchPokemon);

    if (psnot == true) {
        if (shiny == false) {
            pokemonImage.style.display = 'none';
            pokemonSh.style.display ='block';
            pokemonSh.src = data['sprites']['versions']['generation-vii']['ultra-sun-ultra-moon']['front_shiny'];
            shiny = true;
        }
    
        else {
            pokemonImage.style.display = 'block';
            pokemonSh.style.display ='none';
            shiny = false;
        }
    }

    console.log(shiny);
} );

buttonPrev.addEventListener('click', () => {
    pokemonImage.style.display = 'block';
    pokemonSh.style.display ='none';
    shiny = false;
    if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    };
});
//btn prev

buttonNext.addEventListener('click', () => {
    pokemonImage.style.display = 'block';
    pokemonSh.style.display ='none';
    shiny = false;
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});
//btn next

renderPokemon(searchPokemon);

//fim

/*
front_shiny
const buttonSh = document.querySelector('#sh-bnt');
buttonSh.addEventListener('click', () => {''} );
*/