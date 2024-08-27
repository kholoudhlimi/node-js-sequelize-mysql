const express = require('express');
const app = express(); 

// Configuration CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next(); 
});


app.use(express.json());

// Importer les routes
const taskRoutes = require('./routes/route.task');
const userRoutes = require('./routes/route.user');
const completedRoutes = require('./routes/route.completed');

// Définir les routes
app.use('/task', taskRoutes);
app.use('/users', userRoutes);
app.use('/completed', completedRoutes);

module.exports = app;
