const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

require('dotenv').config();

const port = 3000;

app.use('/static', express.static(path.resolve(__dirname, 'public', 'static')));

async function getDataAPI() {

    const urlAPI = process.env.FIPE_API;

    const data = await getData(urlAPI);

    const pathFile = './public/static/data/brands.json';

    const newData = JSON.stringify(data);

    fs.writeFileSync(pathFile, newData, 'utf-8');
}

async function getData(url) {
    const response = await fetch(url);
    return response.json();
}

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {

    getDataAPI()
    .then(() => {
        console.log(`Server running... http://localhost:${port}`);
    })    
    .catch(err => {
        console.error('Error during server startup:', err);
        server.close();
    });
});
