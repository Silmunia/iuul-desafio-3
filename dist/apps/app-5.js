"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Endereco_1 = __importDefault(require("../objects/classes/Endereco"));
const ContaCorrente_1 = __importDefault(require("../objects/classes/ContaCorrente"));
const ContaPoupanca_1 = __importDefault(require("../objects/classes/ContaPoupanca"));
const Cliente_1 = __importDefault(require("../objects/classes/Cliente"));
let clienteA = new Cliente_1.default("123.456.789-10", "Cli A", "(12) 3456-7890", true, new Endereco_1.default("12345-67", "Log A", "123", "Apartamento 456", "Cidade A", "UF B"), new ContaCorrente_1.default("123", 100));
console.log("Novo Cliente criado");
clienteA.fazerDeposito("123", 300);
console.log(`Depósito de $300 em conta número 123 de cliente com CPF ${clienteA.cpf}`);
let clienteB = new Cliente_1.default("456.123.789-10", "Cli B", "(10) 1256-7889", true, new Endereco_1.default("12398-66", "Log A", "13", "Apartamento 404", "Cidade A", "UF B"), new ContaPoupanca_1.default("456"));
console.log("Novo Cliente criado");
clienteB.fazerDeposito("456", 100);
console.log(`Depósito de $100 em conta número 456 de cliente com CPF ${clienteB.cpf}`);
try {
    clienteA.fazerTransferencia("123", clienteB, "456", 1000);
    console.log(`Transferência de $1000 de conta número 123 de cliente com CPF ${clienteA.cpf} para conta número 456 de cliente com CPF ${clienteB.cpf}`);
}
catch (error) {
    if (error instanceof Error) {
        console.log(`Falha na transferência: ${error.message}`);
    }
    else {
        console.log("Transferência falhou por erro desconhecido");
    }
}
console.log(`Conta número 123 de cliente com CPF ${clienteA.cpf} apresenta o seguinte saldo: $${clienteA.calcularSaldoDeConta("123")}`);
console.log(`Conta número 456 de cliente com CPF ${clienteB.cpf} apresenta o seguinte saldo: $${clienteB.calcularSaldoDeConta("456")}`);
