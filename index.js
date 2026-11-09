const express = require('express');
const app = express();
const port = 8000;

app.get('/', (req, res) => {
    res.send('Welcome to the homepage');
})

app.get('/contact-us', (req, res) => {
    res.send('welcome to our contact page')
})

app.get('/tweet', (req, res) => {
    res.send('here are tweets')
})

app.post('/tweet', (req, res) => {
    res.status(201).send('Tweets created successfully')
})

app.listen(port, () => {
    console.log(`My server is runnin on port ${port}`);  
})