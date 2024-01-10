// src/services/taskService.ts

// Importa la biblioteca Axios para realizar solicitudes HTTP.
import axios from 'axios';

// Importa la interfaz Task desde el archivo "task.ts" en el directorio "../models".
import { Task } from "../models/task";

// URL de la API donde se manejan las tareas.
const API_URL = 'http://localhost:3001';

// Define una función asincrónica "addTask" para agregar una nueva tarea.
export const addTask = async (title: string): Promise<void> => {
    // Crea un nuevo objeto de tipo Task con un ID generado a partir de la hora actual.
    const newTask: Task = {
        id: new Date().getTime(), // Un simple generador de ID
        title,
        completed: false
    };
    
    // Realiza una solicitud POST a la API para agregar la nueva tarea.
    await axios.post(`${API_URL}/task`, newTask);
};

// Define una función asincrónica "getTasks" para obtener todas las tareas.
export const getTasks = async (): Promise<Task[]> => {
    // Realiza una solicitud GET a la API para obtener la lista de tareas y espera la respuesta.
    const response = await axios.get(`${API_URL}/tasks`);
    
    // Retorna los datos de respuesta que contienen las tareas.
    return response.data;
};

// Define una función asincrónica "deleteTask" para eliminar una tarea por su ID.
export const deleteTask = async (taskId: number): Promise<void> => {
    // Realiza una solicitud DELETE a la API para eliminar la tarea especificada por su ID.
    await axios.delete(`${API_URL}/task/${taskId}`);
};
