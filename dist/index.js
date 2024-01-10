"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const readline = __importStar(require("readline"));
const taskService_1 = require("./services/taskService");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const showMenu = () => {
    console.log('\n1. Añadir tarea');
    console.log('2. Ver tareas');
    console.log('3. Eliminar tarea');
    console.log('4. Salir');
    rl.question('Selecciona una opción: ', (answer) => {
        switch (answer) {
            case '1':
                rl.question('Descripción de la tarea: ', (desc) => {
                    (0, taskService_1.addTask)(desc);
                    showMenu();
                });
                break;
            case '2':
                console.log((0, taskService_1.getTasks)());
                showMenu();
                break;
            case '3':
                rl.question('ID de la tarea a eliminar: ', (id) => {
                    (0, taskService_1.deleteTask)(parseInt(id));
                    showMenu();
                });
                break;
            case '4':
                rl.close();
                break;
            default:
                console.log('Opción no válida.');
                showMenu();
        }
    });
};
showMenu();
