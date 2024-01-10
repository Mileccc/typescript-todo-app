// src/index.ts

// Importa las funciones del servicio taskService para agregar, obtener y eliminar tareas.
import { addTask, getTasks, deleteTask } from './services/taskService';

// Escucha el evento "click" en el elemento con el id 'addTask' (un botón).
document.getElementById('addTask')!.addEventListener('click', () => {
    // Obtiene el elemento de entrada de texto con el id 'newTask'.
    const taskInput = document.getElementById('newTask') as HTMLInputElement;

    // Llama a la función "addTask" para agregar una tarea con el valor del campo de entrada.
    addTask(taskInput.value);

    // Limpia el campo de entrada de texto después de agregar la tarea.
    taskInput.value = '';

    // Llama a la función "renderTasks" para actualizar la lista de tareas en la interfaz.
    renderTasks();
});

// Define una función llamada "renderTasks" para mostrar las tareas en la interfaz.
async function renderTasks() {
    try {
        // Obtiene la lista de tareas utilizando la función "getTasks".
        const tasks = await getTasks();

        // Obtiene el elemento con el id 'taskList' donde se mostrarán las tareas.
        const taskList = document.getElementById('taskList')!;

        // Limpia el contenido actual de la lista de tareas en la interfaz.
        taskList.innerHTML = '';

        // Itera sobre todas las tareas y crea elementos de lista (<li>) para cada una de ellas.
        tasks.forEach(task => {
            // Crea un elemento de lista (<li>) para la tarea.
            const taskItem = document.createElement('li');

            // Crea un elemento de casilla de verificación (checkbox) para indicar si la tarea está completada.
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed; // Marca la casilla si la tarea está completada.
            checkbox.className = 'checkbox'; // Agrega una clase CSS para estilizar la casilla.
            checkbox.addEventListener('change', () => {
                // Aquí se puede agregar código para actualizar el estado de la tarea cuando se cambia la casilla.
            });

            // Crea un botón para eliminar la tarea.
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.className = 'delete-btn'; // Agrega una clase CSS para estilizar el botón.
            deleteButton.addEventListener('click', () => {
                // Cuando se hace clic en el botón de eliminar, llama a la función "deleteTask" para eliminar la tarea.
                deleteTask(task.id);

                // Llama a la función "renderTasks" nuevamente para actualizar la lista de tareas en la interfaz.
                renderTasks();
            });

            // Agrega la casilla de verificación, el título de la tarea y el botón de eliminar al elemento de lista.
            taskItem.appendChild(checkbox);
            taskItem.appendChild(document.createTextNode(task.title)); // Agrega el título como texto.
            taskItem.appendChild(deleteButton);

            // Agrega el elemento de lista de tarea al contenedor de lista de tareas en la interfaz.
            taskList.appendChild(taskItem);
        });
    } catch (error) {
        console.error('Error al obtener las tareas:', error);
    }
}


// Llama a la función "renderTasks" para mostrar las tareas en la interfaz al cargar la página.
renderTasks();


