const express = require('express');
const router = express.Router();
const taskController = require('../controllers/controller.task');
const auth = require('../middlewaire/auth');

router.post('/',auth, taskController.createTask);
router.get('/', auth,taskController.getAllTasks);
router.get('/:id',auth, taskController.getTaskById);
router.put('/:id',auth, taskController.updateTask);
router.delete('/:id',auth, taskController.deleteTask);

module.exports = router;
