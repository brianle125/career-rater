const http = require('http')
const fs = require('fs')
const express = require('express');
const app = express()
const port = 8080
var mysql = require('mysql')

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/index', (req, res) => {
    res.render('index')
})

app.get('/questionaire', (req, res) => {
    res.render('questionaire')
})

app.listen(port)