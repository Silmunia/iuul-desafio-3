"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Endereco_1 = __importDefault(require("../objects/classes/Endereco"));
const ContaCorrente_1 = __importDefault(require("../objects/classes/ContaCorrente"));
const Cliente_1 = __importDefault(require("../objects/classes/Cliente"));
let cliente = new Cliente_1.default("123.456.789-10", "Cli A", "(12) 3456-7890", true, new Endereco_1.default("12345-67", "Log A", "123", "Apartamento 456", "Cidade A", "UF B"), new ContaCorrente_1.default(123, 100));
cliente.contas[0].depositar(100);
cliente.contas[0].depositar(100);
cliente.contas[0].depositar(100);
cliente.contas[0].sacar(50);
if (cliente.contas[0] instanceof ContaCorrente_1.default) {
    console.log(cliente.contas[0].calcularSaldo());
}
