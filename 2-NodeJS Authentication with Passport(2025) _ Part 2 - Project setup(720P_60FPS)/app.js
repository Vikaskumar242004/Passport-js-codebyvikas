const express = require('express')
const app = express();

app.set('view engine', 'ejs')

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/login', (req, res) => {
    res.send("login post")
})

app.post('/register', (req, res) => {
    res.send("register post")
})

app.get('/logout', (req, res) => {
    res.send("logout get")
})

app.get('/protected', (req, res) => {
    res.send("Protected route")
})

app.listen(5000, (req, res) => {
    console.log("run on port 5000")
})