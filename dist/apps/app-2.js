"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Endereco_1 = __importDefault(require("../objects/classes/Endereco"));
const Cliente_1 = __importDefault(require("../objects/classes/Cliente"));
let cliente = new Cliente_1.default("123.456.789-10", "Cli A", "(12) 3456-7890", true, new Endereco_1.default("12345-67", "Log A", "123", "Apartamento 456", "Cidade A", "UF B"));
cliente.adicionarEnderecos([
    new Endereco_1.default("12345-80", "Log B", "456", "", "Cidade A", "UF B"),
    new Endereco_1.default("46385-53", "Log X", "5678", "", "Cidade B", "UF B"),
    new Endereco_1.default("46374-01", "Log H", "23", "Casa 67", "Cidade C", "UF B")
]);
cliente.listarEnderecos();
