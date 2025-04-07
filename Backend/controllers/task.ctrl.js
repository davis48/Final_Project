const {TaskRepo} = require('../db/repository');

const postTask = async (req, res) => {
    try {
        const taskData = req.body;
        const task = await TaskRepo.createTask(taskData);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = req.body;
        const updatedTask = await TaskRepo.updateTask(taskId, taskData);
        res.status(200).json(updatedTask);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getOwnerTasks = async (req, res) => {
    try {
        const ownerId = req.params.id;
        const tasks = await TaskRepo.getOwnerTasks(ownerId);
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const findOneTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await TaskRepo.findOneTask({ _id: taskId });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const result = await TaskRepo.deleteTask(taskId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    postTask,
    updateTask,
    getOwnerTasks,
    findOneTask,
    deleteTask
}; // Export the controller functions for use in the router