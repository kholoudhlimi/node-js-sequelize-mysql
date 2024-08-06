const express = require('express');
const bodyParser = require('body-parser'); // Optionnel si express.json() est utilisé
const { sequelize } = require('./models'); // Importer la connexion à la base de données
const dotenv = require('dotenv');

// Charge les variables d'environnement depuis un fichier .env
dotenv.config();

const app = express(); // Crée une instance de l'application Express

// Configuration CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next(); // Assurez-vous d'appeler next() pour passer au middleware suivant
});

// Utilisation des middlewares pour traiter les requêtes JSON
app.use(express.json()); // Remplace bodyParser.json()

// Importer les routes
const taskRoutes = require('./routes/route.task');
const userRoutes = require('./routes/route.user');
const completedRoutes = require('./routes/route.completed');

// Définir les routes
app.use('/task', taskRoutes);
app.use('/users', userRoutes);
app.use('/completed', completedRoutes);

module.exports = app;
