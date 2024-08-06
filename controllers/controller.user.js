const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models'); // Assurez-vous que le modèle User est correctement importé

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'RANDOM_TOKEN_SECRET';

// Fonction pour l'inscription
exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: "Nom, email et mot de passe requis" });
  }

  bcrypt.hash(password, 10)
    .then(hash => {
      return User.create({
        name,
        email,
        password: hash
      });
    })
    .then(user => res.status(201).json({ message: 'Utilisateur créé !', userId: user.id }))
    .catch(error => {
      console.error("Erreur lors de l'enregistrement de l'utilisateur:", error);
      res.status(400).json({ error: "Erreur lors de l'enregistrement de l'utilisateur" });
    });
};

// Fonction pour la connexion
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis !' });
  }

  User.findOne({ where: { email } })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      return bcrypt.compare(password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign(
              { userId: user.id },
              TOKEN_SECRET,
              { expiresIn: '24h' }
            )
          });
        });
    })
    .catch(error => {
      console.error('Erreur lors de la connexion:', error);
      res.status(500).json({ error: 'Erreur lors de la connexion' });
    });
};
