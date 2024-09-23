import React, { useEffect, useState } from 'react';
import { FaPlus, FaSearch, FaCheck, FaPencilAlt, FaTrash } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { createTask, deleteTaskById, getAllTasks, updateTaskById } from './Api';
import { notify } from './Utils.js';
import 'react-toastify/dist/ReactToastify.css';

const Taskmanager = () => {
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);
    const [copyTasks, setCopyTasks] = useState([]);
    const [updateTask, setUpdateTask] = useState(null);

    useEffect(() => {
        fetchAllTasks();
    }, []);

    useEffect(() => {
        if (updateTask) {
            setInput(updateTask.taskName);
        } else {
            setInput('');
        }
    }, [updateTask]);

    const fetchAllTasks = async () => {
        try {
            const { data } = await getAllTasks();
            setTasks(data);
            setCopyTasks(data);
        } catch (err) {
            console.error('Failed to fetch tasks', err);
        }
    };

    const handleAddTask = async () => {
        const obj = { taskName: input, isDone: false };
        try {
            const { success, message } = await createTask(obj);
            if (success) {
                notify(message, 'success');
                fetchAllTasks(); // Re-fetch tasks after adding a new one
            } else {
                notify(message, 'error');
            }
            setInput(''); // Clear input after adding
        } catch (err) {
            console.error('Failed to create task', err);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            const { success, message } = await deleteTaskById(id);
            if (success) {
                notify(message, 'success');
                fetchAllTasks(); // Re-fetch tasks after deletion
            } else {
                notify(message, 'error');
            }
        } catch (err) {
            console.error('Failed to delete task', err);
        }
    };

    const handleCheckAndUncheck = async (task) => {
        const { _id, isDone, taskName } = task;
        const obj = { taskName, isDone: !isDone };

        try {
            const { success, message } = await updateTaskById(_id, obj);
            if (success) {
                notify(message, 'success');
                fetchAllTasks(); // Re-fetch tasks after updating
            } else {
                notify(message, 'error');
            }
        } catch (err) {
            console.error('Failed to update task', err);
        }
    };

    const handleUpdate = async () => {
        if (updateTask && input) {
            const obj = { taskName: input, isDone: updateTask.isDone };
            try {
                const { success, message } = await updateTaskById(updateTask._id, obj);
                if (success) {
                    notify(message, 'success');
                    setUpdateTask(null); // Reset update task
                    fetchAllTasks(); // Re-fetch tasks after updating
                } else {
                    notify(message, 'error');
                }
            } catch (err) {
                console.error('Failed to update task', err);
            }
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        const filteredTasks = copyTasks.filter(item => item.taskName.toLowerCase().includes(term));
        setTasks(filteredTasks);
    };

    return (
        <div className='d-flex flex-column align-items-center w-50 m-auto mt-5'>
            <h1 className='mb-4'>Task Manager</h1>

            {/* Task Input and Search Bar */}
            <div className='d-flex justify-content-between align-items-center mb-4 w-100'>
                {/* Add/Update Task Input */}
                <div className='input-group flex-grow-1 me-2'>
                    <input
                        type="text"
                        className='form-control me-1'
                        placeholder={updateTask ? 'Update task' : 'Add a new task'}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button className='btn btn-success btn-sm me-2' onClick={updateTask ? handleUpdate : handleAddTask}>
                        <FaPlus />
                    </button>
                </div>

                {/* Search Task Input */}
                <div className='input-group flex-grow-1'>
                    <span className='input-group-text'>
                        <FaSearch />
                    </span>
                    <input type="text" className='form-control' placeholder='Search Tasks' onChange={handleSearch} />
                </div>
            </div>

            {/* Task List */}
            <div className='d-flex flex-column w-100'>
                {tasks.map((task, index) => (
                    <div key={index} className='m-2 p-2 border bg-light w-100 rounded-3 d-flex justify-content-between align-items-center'>
                        <span className={task.isDone ? 'text-decoration-line-through' : ''}>{task.taskName}</span>
                        <div>
                            <button type='button' className='btn btn-success btn-sm me-2' onClick={() => handleCheckAndUncheck(task)}>
                                <FaCheck />
                            </button>
                            <button type='button' className='btn btn-primary btn-sm me-2' onClick={() => setUpdateTask(task)}>
                                <FaPencilAlt />
                            </button>
                            <button type='button' className='btn btn-danger btn-sm me-2' onClick={() => handleDeleteTask(task._id)}>
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Toast Notification */}
            <ToastContainer position='top-right' autoClose={3000} hideProgressBar={false} />
        </div>
    );
};

export default Taskmanager;
