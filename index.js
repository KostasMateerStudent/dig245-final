// SEE README FOR INFO

// add packages required for server
const fetch = require("node-fetch");
const express = require('express');
const app = express();
const port = 3000;

const serviceUrl = 'https://developers.lingvolive.com';

const cyrillicPattern = /^[\u0400-\u04FF]+$/;

const apiKey = 'MDcyZDlmYTktYjBkOS00ODlmLWI1NGQtZWIwMmM2Y2ZmOTAxOjE5MGIyMTg1NTMwMzRiZmI5Njg5NTQ3MzBiMTZmMmFj';

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

let authorization;
// this is the default api endpoint
app.get('/api', async (req, res) => {
	res.json({
		"message": "server is live"
	});

});

// this is the data api endpoint
app.get('/api/:textToTranslate?', async (req, res) => {
	authorization = await getToken(serviceUrl, apiKey);
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
	if (!cyrillicPattern.test(req.params.textToTranslate)){
		await fetch(serviceUrl+'/api/v1/Minicard?text='+ req.params.textToTranslate + '&srcLang=1033&dstLang=1049', {
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + authorization
			}})
			.then(response => {
				return response.json();
			})
			.then(data => {
				res.json(data);
			});
	}
	else {
		await fetch(serviceUrl+'/api/v1/Minicard?text='+ req.params.textToTranslate + '&srcLang=1049&dstLang=1033', {
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + authorization
			}})
			.then(response => {
				return response.json();
			})
			.then(data => {
				res.json(data);
			});
	}
    

	// await fetch("https://randomuser.me/api/")
	// 	.then(response => {
	// 		return response.json();
	// 	})
	// 	.then(data => {
	// 		// console.log(data);
	// 		// ... return to user
	// 		res.json(data);
	// 	});
});
// getData();


// sets up path to serve static files
const path = require('path');
const { get } = require("https");
const { response } = require("express");
app.use(express.static(path.join(__dirname, 'public')));
// starts the server
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});



/* javascript */

// var authToken;

// get authorization token
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

// get translation
async function getRussianTranslation(url, token, text) {
    let translateURL = url + '/api/v1/Minicard?text='+ text + '&srcLang=1033&dstLang=1049';
    const response = await fetch(translateURL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }});
    let jsonValue = await response.json();
    console.log(jsonValue);
    return jsonValue;
}

async function main() {
    let authToken = await getToken(serviceUrl, apiKey);
    await getRussianTranslation(serviceUrl, authToken, 'go');
}

// main();
