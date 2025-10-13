const {hashSync} = require('bcrypt');
const express = require('express')
const app = express();
const userModel = require('./config/database');

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended : true}))

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
  let user = new userModel({
    username : req.body.username,
    password : hashSync(req.body.password,5) 
  })
  user.save().then(user => console.log(user));
  res.send({success : true})
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