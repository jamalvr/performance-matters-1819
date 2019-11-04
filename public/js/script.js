"use strict";

let data = require('./modules/data.js');
let toggleMenu = require('./modules/togglemenu.js');

(function () {
    //// App structure
    const app = function () {
        toggleMenu.toggleMenu.init();
        data.data.getPokemonWeight();
        data.data.getPokemonCards();
    }

    app();
}());