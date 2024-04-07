
import Endereco from "../objects/classes/Endereco";
import ContaCorrente from "../objects/classes/ContaCorrente";
import ContaPoupanca from "../objects/classes/ContaPoupanca";
import Cliente from "../objects/classes/Cliente";

let clienteA = new Cliente("123.456.789-10", "Cli A", "(12) 3456-7890", true, new Endereco("12345-67", "Log A", "123", "Apartamento 456", "Cidade A", "UF B"), new ContaCorrente(123, 100));

clienteA.contas[0].depositar(1000);

let clienteB = new Cliente("456.123.789-10", "Cli B", "(10) 1256-7889", true, new Endereco("12398-66", "Log A", "13", "Apartamento 404", "Cidade A", "UF B"), new ContaPoupanca(456));

clienteB.contas[0].depositar(1000);

if (clienteA.contas[0] instanceof ContaCorrente) {
    clienteA.contas[0].transferir(clienteB.contas[0], 500);
}

if (clienteA.contas[0] instanceof ContaCorrente) {
    console.log(clienteA.contas[0].calcularSaldo());
}

if (clienteB.contas[0] instanceof ContaPoupanca) {
    console.log(clienteB.contas[0].calcularSaldo());
}