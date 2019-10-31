"use strict";

import data from './modules/data.js';
import toggleMenu from './modules/toggleMenu.js';

(function () {
    //// App structure
    const app = function () {
        toggleMenu.init();
        data.getPokemonWeight();
        data.getPokemonCards();
    }

    app();
}());