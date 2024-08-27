const { Completed } = require('../models'); 

// Fonction pour créer une nouvelle tâche terminée
exports.createCompleted = async (req, res) => {
  try {
    const { content, userId } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content est requis' });
    }

    const completed = await Completed.create({
      content,
      userId: userId || 1
    });

    res.status(201).json({ message: 'élement enregistré !', completed });
  } catch (error) {
    console.error('Erreur lors de la création de l\'élément complété:', error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'élément complété' });
  }
};

// Fonction pour lire toutes les tâches terminées
exports.getAllCompletedTasks = async (req, res) => {
  try {
    const tasks = await Completed.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches terminées:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des tâches terminées' });
  }
};

// Fonction pour lire une tâche terminée par ID
exports.getCompletedTaskById = async (req, res) => {
  try {
    const task = await Completed.findByPk(req.params.id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: 'Tâche terminée non trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la tâche terminée:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de la tâche terminée' });
  }
};

// Fonction pour mettre à jour une tâche terminée
exports.updateCompletedTask = async (req, res) => {
  try {
    const task = await Completed.findByPk(req.params.id);
    if (task) {
      task.content = req.body.content || task.content;
      task.userId = req.body.userId || task.userId;
      await task.save();
      res.status(200).json({ message: 'Tâche terminée mise à jour !', task });
    } else {
      res.status(404).json({ message: 'Tâche terminée non trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche terminée:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la tâche terminée' });
  }
};

// Fonction pour supprimer une tâche terminée
exports.deleteCompletedTask = async (req, res) => {
  try {
    const task = await Completed.findByPk(req.params.id);
    if (task) {
      await task.destroy();
      res.status(200).json({ message: 'Tâche terminée supprimée !' });
    } else {
      res.status(404).json({ message: 'Tâche terminée non trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche terminée:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de la tâche terminée' });
  }
};
 