const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

const Sauce = require('./models/sauce');
const User = require('./models/user');

const app = express();

mongoose.connect('mongodb+srv://aymeric:Veget@51@cluster0.nnu7k.mongodb.net/test',
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
    })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json());

//app.use('/api/sauce', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;