
import Endereco from "../objects/classes/Endereco";
import ContaCorrente from "../objects/classes/ContaCorrente";
import Cliente from "../objects/classes/Cliente";

let cliente = new Cliente("123.456.789-10", "Cli A", "(12) 3456-7890", true, new Endereco("12345-67", "Log A", "123", "Apartamento 456", "Cidade A", "UF B"), new ContaCorrente("123", 0));
console.log("Novo Cliente criado");

cliente.fazerDeposito("123", 100);
console.log(`Depósito de $100 em conta número 123 de cliente com CPF ${cliente.cpf}`);

cliente.fazerDeposito("123", 100);
console.log(`Depósito de $100 em conta número 123 de cliente com CPF ${cliente.cpf}`);

cliente.fazerDeposito("123", 100);
console.log(`Depósito de $100 em conta número 123 de cliente com CPF ${cliente.cpf}`);

cliente.fazerSaque("123", 50);
console.log(`Saque de $50 em conta número 123 de cliente com CPF ${cliente.cpf}`);

let saldo = cliente.calcularSaldoDeConta("123");

console.log(`Conta número 123 de cliente com CPF ${cliente.cpf} apresenta o seguinte saldo: $${saldo}`);
