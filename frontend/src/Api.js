import { API_URL } from "./Utils";

export const createTask = async (taskObj) => {
    const url = `${API_URL}/task`;
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(taskObj),
    };

    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        console.error('Error in createTask:', err); // Log error for better debugging
        return err;
    }
};

export const getAllTasks = async () => {
    const url = `${API_URL}/task`;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        console.error('Error in getAllTasks:', err); // Log error for better debugging
        return err;
    }
};

export const deleteTaskById = async (id) => {
    const url = `${API_URL}/task/${id}`;
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        console.error('Error in deleteTaskById:', err); // Log error for better debugging
        return err;
    }
};

export const updateTaskById = async (id,reqBody) => {
    const url = `${API_URL}/task/${id}`;
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(reqBody)
    };

    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        console.error('Error in deleteTaskById:', err); // Log error for better debugging
        return err;
    }
};
