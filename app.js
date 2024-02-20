const express = require('express');
const SetController = require('./controllers/SetController');
const CardController = require('./controllers/CardController');
const path = require('path');

const app = express();

app.use(express.static('public'));

app.get("/sets", async function(request, response) {
	const controller = new SetController();
	const data = await controller.getAll();
	response.send(data);
});

app.get("/cards", async function(request, response) {
	const controller = new CardController();
	const data = await controller.getAll(request.query);
	response.send(data);
});

app.get('/types', async function(request, response) {
	const controller = new CardController();
	const data = await controller.getCardTypes();
	response.send(data);
});

app.get('/builder', function(req, res) {
	res.sendFile(path.join(__dirname, '/views/builder.html'));
});

app.get('/ping', function(req, res) {
	res.send("I'm alive ! >:)")
});



module.exports = app;