"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Funcionario_1 = __importDefault(require("../objects/classes/Funcionario"));
let atendente = new Funcionario_1.default("Atendente", "123.456.789-10", "Fun A", "(12) 3456-7890", 2500);
console.log("Novo Funcionário criado:");
console.log(atendente);
let gerente = new Funcionario_1.default("Gerente", "109.876.543-21", "Fun B", "(10) 9876-5432", 5000);
console.log("Novo Funcionário criado:");
console.log(gerente);
