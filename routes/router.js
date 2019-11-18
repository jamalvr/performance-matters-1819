// We also need express and request here
const express = require('express');
const request = require('request');
const caching = require('../utils/caching.js');

// But this time, we only call the router part of express
const router = express.Router();

// Create a route for our overview page
router.get('/', function (req, res) {
	let pokemons = caching.readCache();
	console.log(pokemons);

	renderOverview = function (pokemons) {
		res.render('overview', {
			title: 'Posts', // We use this for the page title, see views/partials/head.ejs
			pokemonData: pokemons,
		});
	}

	if (pokemons === null) {
		console.log('requesting pokemon');

		request('https://pokeapi.co/api/v2/pokemon/', {
			json: true
		}, async function (err, requestRes, body) {
			console.log('async start');
			if (err) {
				console.log('error:', err);
				// We got an error
				res.render('error', {
					title: '503',
					header: '503 gij hedde geen internet verbinding',
					paragraph: 'We kunnen daardoor de overzichtspagina niet laden',
				});
			} else {
				function getPokemonDetails(url, i) {
					console.log('requesting pokemon details:', url);
					return new Promise(function (resolve, reject) {
						request(url, {
							json: true
						}, function (err, requestRes, pokemonDetails) {
							if (!err) {
								body.results[i] = pokemonDetails;
								resolve(body);
							} else {
								reject
							}
						})
					})
				}

				console.log(requestRes);

				for (let i = 0; body.results.length > i; i++) {
					// console.log(i, body.results[i].url);
					let url = body.results[i].url;

					await getPokemonDetails(url, i);
				}

				// Render the page using the 'posts' view and our body data
				renderOverview(body.results);
				caching.saveCache(body.results);
			}
		});
	} else {
		// Render the page using the 'posts' view and our body data
		renderOverview(pokemons);
	}
});

// Create a route for our detail page
router.get('/:id', function (req, res) {
	request(`https://pokeapi.co/api/v2/pokemon/${req.params.id}`, {
		json: true
	}, function (err, requestRes, body) {
		if (err) {
			// We got an error
			res.render('error', {
				title: '503',
				header: '503 gij hedde geen internet verbinding',
				paragraph: 'We kunnen daardoor de detailpagina niet laden',
			});
		} else {
			console.log(body);

			// Render the page using the 'post' view and our body data
			res.render('detail', {
				title: `Post ${req.params.id}`,
				postData: body
			});
		}
	});
});

// Make sure to export the router so it becomes available on imports
module.exports = router;