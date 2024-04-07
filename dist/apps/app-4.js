"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Endereco_1 = __importDefault(require("../objects/classes/Endereco"));
const ContaCorrente_1 = __importDefault(require("../objects/classes/ContaCorrente"));
const ContaPoupanca_1 = __importDefault(require("../objects/classes/ContaPoupanca"));
const Cliente_1 = __importDefault(require("../objects/classes/Cliente"));
let clienteA = new Cliente_1.default("123.456.789-10", "Cli A", "(12) 3456-7890", true, new Endereco_1.default("12345-67", "Log A", "123", "Apartamento 456", "Cidade A", "UF B"), new ContaCorrente_1.default(123, 100));
clienteA.fazerDeposito(123, 1000);
let clienteB = new Cliente_1.default("456.123.789-10", "Cli B", "(10) 1256-7889", true, new Endereco_1.default("12398-66", "Log A", "13", "Apartamento 404", "Cidade A", "UF B"), new ContaPoupanca_1.default(456));
clienteB.fazerDeposito(456, 1000);
clienteA.fazerTransferencia(123, clienteB, 456, 500);
console.log(clienteA.calcularSaldoDeConta(123));
console.log(clienteB.calcularSaldoDeConta(456));
