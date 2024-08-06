const http = require('http');
const app = require('./app');
const { sequelize } = require('./models'); // Assurez-vous que ce chemin est correct

// Fonction pour normaliser le port
const normalizePort = val => {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};

// Définir le port
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Fonction pour gérer les erreurs de serveur
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Créer le serveur HTTP
const server = http.createServer(app);

// Écouter les erreurs de serveur
server.on('error', errorHandler);

// Écouter les événements de serveur
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// Démarrer le serveur HTTP
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  // Connexion à la base de données
  sequelize.authenticate()
    .then(() => {
      console.log('Database connected!');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
});
