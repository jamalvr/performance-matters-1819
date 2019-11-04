(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let state = require('./state.js');

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

exports.data = data;
},{"./state.js":2}],2:[function(require,module,exports){
//// Set global var
var pokemonWeight = [];
var pokemonCards = [];
var statusFilter;

exports.pokemonCards = pokemonCards;
exports.pokemonWeight = pokemonWeight;
exports.statusFilter = statusFilter;
},{}],3:[function(require,module,exports){
let state = require('./state.js');

const toggleMenu = {
    // Button functionality
    button: function (selector, callBack) {
        let button = document.querySelector(selector);

        button.addEventListener('click', function () {
            if (!button.classList.contains('active')) {
                button.classList.add('active');
                callBack(true);
            } else {
                button.classList.remove('active');
                callBack(false);
            }
        })
    },

    arrayEdits: function () {
        let sorted = [];

        if (state.statusFilter) {
            sorted = state.pokemonWeight.filter(function (pokemon) {
                return Number(pokemon.textContent) < 300;
            });
            sorted.forEach(function (card) {
                let closestElement = card.closest('li');
                closestElement.classList.add('doei');
            })
        } else {
            sorted = state.pokemonWeight;
            sorted.forEach(function (card) {
                let closestElement = card.closest('li');
                closestElement.classList.remove('doei');
            })
        }
    },

    init: function () {
        toggleMenu.button('.filter-bmi', function (active) {
            state.statusFilter = active;
            toggleMenu.arrayEdits()
        });
    },
};

exports.toggleMenu = toggleMenu;
},{"./state.js":2}],4:[function(require,module,exports){
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
},{"./modules/data.js":1,"./modules/togglemenu.js":3}]},{},[4]);
