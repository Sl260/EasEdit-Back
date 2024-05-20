// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const userController = require('./contollers/userController');
const signupController = require ('./contollers/signupController');
const jwtVerify = require('./middlewares/jwtVerify');

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB_CONNECT)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => console.log('Connexion à MongoDB échouée !', err));

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
  
app.get('/', (req, res) => {
    res.send('<h1>Bienvenue sur notre page d\'accueil!</h1>');
});

app.post('/login', userController.login);
app.post('/signup', signupController.signup);

app.listen(3005, () => {
    console.log('Serveur démarré sur le port 3005');
  });