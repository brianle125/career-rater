const http = require('http')
const fs = require('fs')
const express = require('express');
const app = express()
const port = 8080
var mysql = require('mysql')
var pool = mysql.createPool({
    host: 'localhost',
    user: 'username',
    password: 'something'
})
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index', {text: "World"})
})

app.get('/questionaire', (req, res) => {
    pool.getConnection(function(err, connection){
        if(err)
            return console.log('Could not connect')
        connection.release();
    })
    
    res.render('questionaire')
})

app.listen(port)