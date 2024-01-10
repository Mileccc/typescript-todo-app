// backend/server.js

// Importa la biblioteca Express para crear un servidor web.
const express = require('express');

// Importa la biblioteca Cors para habilitar el intercambio de recursos entre dominios.
const cors = require('cors');

// Importa la biblioteca mysql2 para interactuar con la base de datos MySQL.
const mysql = require('mysql2');

// Crea una instancia de la aplicación Express.
const app = express();

// Puerto en el que se ejecutará el servidor.
const PORT = 3001;

// Configuración de la conexión a la base de datos MySQL.
const connection = mysql.createConnection({
    host: 'localhost', // Host de la base de datos MySQL.
    user: 'root', // Nombre de usuario de la base de datos.
    password: '8586', // Contraseña de la base de datos.
    database: 'tasksDB', // Nombre de la base de datos.
    port: 55000 // Puerto de la base de datos.
});

// Conectar a la base de datos MySQL.
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

// Habilita el uso de Cors para permitir solicitudes desde otros dominios.
app.use(cors());

// Habilita el análisis de solicitudes entrantes como objetos JSON.
app.use(express.json());

// Ruta GET para obtener todas las tareas desde la base de datos MySQL.
app.get('/tasks', (req, res) => {
    connection.query('SELECT * FROM tasks', (error, results) => {
        if (error) throw error;
        res.json(results); // Responde con un JSON que contiene todas las tareas obtenidas desde la base de datos.
    });
});

// Ruta POST para agregar una nueva tarea en la base de datos MySQL.
app.post('/task', (req, res) => {
    const task = req.body; // Obtiene la tarea desde el cuerpo de la solicitud.
    connection.query('INSERT INTO tasks SET ?', task, (error) => {
        if (error) throw error;
        res.status(201).send(); // Responde con un código 201 (creado) para indicar que la tarea se ha agregado con éxito.
    });
});

// Ruta DELETE para eliminar una tarea de la base de datos MySQL por su ID.
app.delete('/task/:id', (req, res) => {
    const { id } = req.params; // Obtiene el ID de la tarea desde los parámetros de la URL.
    connection.query('DELETE FROM tasks WHERE id = ?', [id], (error) => {
        if (error) throw error;
        res.status(200).send(); // Responde con un código 200 (éxito) para indicar que la tarea se ha eliminado con éxito.
    });
});

// Inicia el servidor en el puerto especificado y muestra un mensaje en la consola cuando está listo.
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
