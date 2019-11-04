// We also need express and request here
const express = require('express');
const request = require('request');

// But this time, we only call the router part of express
const router = express.Router();

// Create a route for our overview page
router.get('/', function (req, res) {
	request('https://pokeapi.co/api/v2/pokemon/', {
		json: true
	}, function (err, requestRes, body) {
		console.log(body);

		if (err) {
			// We got an error
			res.render('404', {
				title: '404',
			});
		} else {
			// Render the page using the 'posts' view and our body data
			res.render('overview', {
				title: 'Posts', // We use this for the page title, see views/partials/head.ejs
				pokemonData: body.results
			});
		}
	});
});

// Create a route for our detail page
router.get('/:id', function (req, res) {
	request(`https://pokeapi.co/api/v2/pokemon/${req.params.id}`, {
		json: true
	}, function (err, requestRes, body) {
		if (err) {
			// We got an error
			res.render('404', {
				title: '404	',
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