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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/',  (req, res) => {
    res.render('index');
})

app.get('/index', (req, res) => {
    res.render('index');
})

app.post('/index', (req, res) => {
    res.render('review');
})

app.get('/review', (req, res) => {
    res.render('review');
})

app.post('/review', async (req, res) => {
    let company = req.body.company;
    let confidence = req.body.confidence;
    let transparency = req.body.transparency;
    let morale = req.body.morale;
    let satisfaction = req.body.satisfaction;
    let compensation = req.body.compensation;

    try {
        const query = `insert into reviewlist values('${company}', ${confidence}, ${transparency}, ${morale}, ${satisfaction}, ${compensation})`;
        const client = await pool.connect();
        client.query(query);
    } catch(error)
    {
        res.send(err);
    }
    res.redirect('reviewlist');
})

app.get('/reviewlist', (req, res) => {
    var query = 'select * from reviewlist';
    pool.query(query, (err, result) => {
        if(err)
            res.send(err);
        else 
        {
            res.render('reviewlist', {'reviews' : result.rows});
        }
    })
})

app.listen(port)