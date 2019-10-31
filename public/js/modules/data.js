import helper from './helper.js';
import state from './state.js';

const data = {
    getPokemonWeight: function () {
        if (document.querySelector('.overview')) {
            let pokemonWeight = document.querySelectorAll('.pokemon-weight');
            let weightArray = Array.from(pokemonWeight);

            state.pokemonWeight = weightArray;
            // state.pokemonWeight = weightArray;
            console.log(state.pokemonWeight);
        }
    },

    getPokemonCards: function () {
        if (document.querySelector('.overview')) {
            let pokemonCards = document.querySelectorAll('.pokemon-card');
            let cardArray = Array.from(pokemonCards);

            state.pokemonCards = cardArray;
            console.log(state.pokemonCards);
        }
    }
};

export default data;