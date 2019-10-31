const helper = {
    sort: function (array, data) {
        return array.sort(function (a, b) {
            return a[data] - b[data];
        });
    },

    // // Map pokemon
    // mapWeight: function (pokemon) {
    //     return pokemon.map(function (pokemon) {
    //         let pokeData = {
    //             weight: Number(pokemon.textContent),
    //             list: pokemon.classList,
    //         }

    //         return pokeData;
    //     });
    // },
};

export default helper;