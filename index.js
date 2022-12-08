// SEE README FOR INFO

// add packages required for server
const fetch = require("node-fetch");
const express = require('express');
const app = express();
const port = 3000;

const serviceUrl = 'https://developers.lingvolive.com';

const cyrillicPattern = /^[\u0400-\u04FF]+$/;

const apiKey = 'MDcyZDlmYTktYjBkOS00ODlmLWI1NGQtZWIwMmM2Y2ZmOTAxOjE5MGIyMTg1NTMwMzRiZmI5Njg5NTQ3MzBiMTZmMmFj';

// this is the default api endpoint
app.get('/api', async (req, res) => {
	res.json({
		"message": "server is live"
	});

});

//debug api endpoint
app.get('/api/wtf', async (req, res) => {
	authorization = await getToken(serviceUrl, apiKey);
	await fetch(serviceUrl+'/api/v1/Minicard?text=hello&srcLang=1033&dstLang=1049', {
		method: 'GET',
		headers: {
			'Authorization': 'Bearer ' + authorization
		}})
		.then(async response => {
			const body = await response.text() + response.status;
			res.send(body);
			// res.send(response.status + " " + response.json());
		})
		.catch(err => {
			console.log("WTF TEST", err);
			res.json({"error": "WTF TEST: "+ err});
		});
});


// this is the data api endpoint
app.get('/api/:textToTranslate?', async (req, res) => {
	const authorization = await getToken(serviceUrl, apiKey);
	// if required text is not present
	if (!req.params.textToTranslate) {
		// return early with message
		res.json({
			"message": "no text received"
		});
		console.log("No textToTranslate");
		return;
	}
	// ... otherwise ....
	console.log(req.params.textToTranslate);
	// default
	let translationUrl = serviceUrl+'/api/v1/Minicard?text='+ req.params.textToTranslate + '&srcLang=1049&dstLang=1033';
	
	if (!cyrillicPattern.test(req.params.textToTranslate)){
		translationUrl = serviceUrl+'/api/v1/Minicard?text='+ req.params.textToTranslate + '&srcLang=1033&dstLang=1049';
	}

	await fetch(translationUrl, {
		method: 'GET',
		headers: {
			'Authorization': 'Bearer ' + authorization
		}})
		.then(async response => {
			const body = await response.text();
			return JSON.parse(body);
		})
		.then(data => {
			res.json(data);
		})
		.catch(err => {
			console.log("ERROR TRANSLATING", err);
			res.json({"error": "ERROR TRANSLATING: "+ err});
		});
});


// sets up path to serve static files
const path = require('path');
const { get } = require("https");
const { response } = require("express");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets/js')));
app.use(express.static(path.join(__dirname, 'assets/css')));
app.use(express.static(path.join(__dirname, 'assets/img')));

// starts the server
app.listen(port, async () => {
	console.log(`Translation app listening on port ${port}`);
	authorization = await getToken(serviceUrl, apiKey);
});

// get authentication token
async function getToken(url, key) {
    const apiTokenUrl = url + '/api/v1.1/authenticate';
    const response = await fetch(apiTokenUrl, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + key
        }});
    const authToken =  await response.text();
    return authToken;
}