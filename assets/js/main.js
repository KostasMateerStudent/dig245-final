
/* javascript */

const serviceUrl = 'https://developers.lingvolive.com';

const apiKey = 'MDcyZDlmYTktYjBkOS00ODlmLWI1NGQtZWIwMmM2Y2ZmOTAxOjE5MGIyMTg1NTMwMzRiZmI5Njg5NTQ3MzBiMTZmMmFj';

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
    let translateURL = url + '/api/v1/Translation?text='+ text + '&srcLang=1033&dstLang=1049';
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

main();

