
import Endereco from "../objects/classes/Endereco";
import ContaCorrente from "../objects/classes/ContaCorrente";
import ContaPoupanca from "../objects/classes/ContaPoupanca";
import Cliente from "../objects/classes/Cliente";

let clienteA = new Cliente("123.456.789-10", "Cli A", "(12) 3456-7890", true, new Endereco("12345-67", "Log A", "123", "Apartamento 456", "Cidade A", "UF B"), new ContaCorrente("123", 0));
console.log("Novo Cliente criado");

clienteA.fazerDeposito("123", 1000);
console.log(`Depósito de $1000 em conta número 123 de cliente com CPF ${clienteA.cpf}`);

let clienteB = new Cliente("456.123.789-10", "Cli B", "(10) 1256-7889", true, new Endereco("12398-66", "Log A", "13", "Apartamento 404", "Cidade A", "UF B"), new ContaPoupanca("456"));
console.log("Novo Cliente criado");

clienteB.fazerDeposito("456", 1000);
console.log(`Depósito de $1000 em conta número 456 de cliente com CPF ${clienteB.cpf}`);

clienteA.fazerTransferencia("123", clienteB, "456", 500);
console.log(`Transferência de $500 de conta número 123 de cliente com CPF ${clienteA.cpf} para conta número 456 de cliente com CPF ${clienteB.cpf}`);

console.log(`Conta número 123 de cliente com CPF ${clienteA.cpf} apresenta o seguinte saldo: $${clienteA.calcularSaldoDeConta("123")}`);

console.log(`Conta número 123 de cliente com CPF ${clienteA.cpf} apresenta o seguinte saldo: $${clienteB.calcularSaldoDeConta("456")}`);