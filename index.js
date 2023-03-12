require('dotenv').config();
const http = require('http')
const fs = require('fs')
const express = require('express');
const app = express()
const port = 8080
var mysql = require('mysql')
const { Pool, Client } = require("pg")
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});


app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));

app.get('/',  (req, res) => {
    const client = pool.connect();
    var query = 'select * from company_list';

    pool.query(query, (err, result) => {
        if(err)
            res.send(err);
        else 
        {
            console.log(result);
            res.render('index', {'companies' : result.rows});
        }
    })
})

app.get('/index', (req, res) => {
    const client = pool.connect();
    var query = 'select * from company_list';

    pool.query(query, (err, result) => {
        if(err)
            res.send(err);
        res.render('index', {'blogs' : result.rows});
    })
})

app.get('/review', (req, res) => {
    res.render('review')
})

app.listen(port)