const state = require('./state.js');

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
        if (document.querySelector('.filter-bmi')) {
            toggleMenu.button('.filter-bmi', function (active) {
                state.statusFilter = active;
                toggleMenu.arrayEdits()
            });
        }
    },
};

exports.toggleMenu = toggleMenu;