const taskModel = require("../models/taskModel");

const createTask = async (req, res) => {
    const data = req.body;
    try {
        const model = new taskModel(data);
        await model.save();
        res.status(201).json({ message: 'Task created successfully', success: true, data });
    } catch (err) {
        console.error('Error in creating task:', err); // Log the error
        res.status(500).json({ message: 'Failed to create a task', success: false, error: err.message });
    }
};


const fetchAllTask = async (req, res) => {
    try {
        const data = await taskModel.find({});
        res.status(200).json({ message: 'Tasks retrieved successfully', success: true, data });
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve tasks', success: false, err });
    }
};

const updateTaskbyId = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        await taskModel.findByIdAndUpdate(id, body);
        res.status(200).json({ message: 'Task updated successfully', success: true });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update task', success: false });
    }
};

const deleteTaskbyId = async (req, res) => {
    try {
        const id = req.params.id;
        await taskModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Task deleted successfully', success: true });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete task', success: false });
    }
};

module.exports = {
    createTask,
    fetchAllTask,
    updateTaskbyId,
    deleteTaskbyId
};
