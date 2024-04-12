"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cargo_1 = __importDefault(require("../objects/classes/Cargo"));
const Funcionario_1 = __importDefault(require("../objects/classes/Funcionario"));
let cargoAtendente = new Cargo_1.default("Atendente");
let atendente = new Funcionario_1.default([cargoAtendente], "123.456.789-10", "Fun A", "(12) 3456-7890", 2500);
console.log("Novo Funcionário criado:");
console.log(atendente);
console.log(cargoAtendente);
let cargoGerente = new Cargo_1.default("Gerente");
let gerente = new Funcionario_1.default([cargoGerente], "109.876.543-21", "Fun B", "(10) 9876-5432", 5000);
console.log("Novo Funcionário criado:");
console.log(gerente);
console.log(cargoGerente);
