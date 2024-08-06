const express = require('express');
const router = express.Router();
const completedController = require('../controllers/controller.completed');

// Route pour créer une nouvelle tâche terminée
router.post('/', completedController.createCompleted);

// Route pour lire toutes les tâches terminées
router.get('/', completedController.getAllCompletedTasks);

// Route pour lire une tâche terminée par ID
router.get('/:id', completedController.getCompletedTaskById);

// Route pour mettre à jour une tâche terminée
router.put('/:id', completedController.updateCompletedTask);

// Route pour supprimer une tâche terminée
router.delete('/:id', completedController.deleteCompletedTask);

module.exports = router;
