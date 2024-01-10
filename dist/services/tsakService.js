"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.getTasks = exports.addTask = void 0;
let tasks = [];
const addTask = (title) => {
    const newTask = {
        id: new Date().getTime(), // Un simple generador de ID
        title,
        completed: false
    };
    tasks.push(newTask);
};
exports.addTask = addTask;
const getTasks = () => {
    return tasks;
};
exports.getTasks = getTasks;
const deleteTask = (taskId) => {
    tasks = tasks.filter(task => task.id !== taskId);
};
exports.deleteTask = deleteTask;
