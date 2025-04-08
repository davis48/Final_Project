const taskRouter = require('express').Router();
const taskCtrl = require('../controllers/task.ctrl');
const authenticate = require('../middlewares/authenticate');

taskRouter.use(authenticate)
taskRouter.post('/', taskCtrl.postTask); // Create a new task
taskRouter.put('/:id', taskCtrl.updateTask); // Update a task by ID
taskRouter.get('/owner/:id', taskCtrl.getOwnerTasks); // Get tasks by owner ID
taskRouter.delete('/:id', taskCtrl.deleteTask); // Delete a task by ID
taskRouter.get('/findone/:id', taskCtrl.findOneTask); // Get a task by ID 'findOneTask'


module.exports = taskRouter;