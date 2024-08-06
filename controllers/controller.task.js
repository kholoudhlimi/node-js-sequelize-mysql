const { Task } = require('../models');

exports.createTask = async (req, res) => {
    try {
      const { content, userId } = req.body;
  
      if (!content) {
        return res.status(400).json({ error: 'Content est requis' });
      }
  
      const task = await Task.create({ content, userId: userId || 1 });
      res.status(201).json({ message: 'tâche enregistré !' });
    } catch (error) {
      console.error('Erreur lors de la création de la tâche:', error);
      res.status(400).json({ error });
    }
  };
  
  exports.getAllTasks = async (req, res) => {
    try {
      const tasks = await Task.findAll();
      res.status(200).json(tasks);
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches:', error);
      res.status(400).json({ error });
    }
  };
  
  exports.getTaskById = async (req, res) => {
    try {
      const task = await Task.findByPk(req.params.id);
      if (task) {
        res.status(200).json(task);
      } else {
        res.status(404).json({ message: 'Tâche non trouvée' });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de la tâche:', error);
      res.status(400).json({ error });
    }
  };
  
  exports.updateTask = async (req, res) => {
    try {
      const task = await Task.findByPk(req.params.id);
      if (task) {
        task.content = req.body.content || task.content;
        task.userId = req.body.userId || task.userId;
        await task.save();
        res.status(200).json({ message: 'Tâche mise à jour !' });
      } else {
        res.status(404).json({ message: 'Tâche non trouvée' });
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche:', error);
      res.status(400).json({ error });
    }
  };
  
  exports.deleteTask = async (req, res) => {
    try {
      const task = await Task.findByPk(req.params.id);
      if (task) {
        await task.destroy();
        res.status(200).json({ message: 'Tâche supprimée !' });
      } else {
        res.status(404).json({ message: 'Tâche non trouvée' });
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche:', error);
      res.status(400).json({ error });
    }
  };
  