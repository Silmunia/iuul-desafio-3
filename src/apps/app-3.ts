
import Endereco from "../objects/classes/Endereco"
import ContaCorrente from "../objects/classes/ContaCorrente"
import Cliente from "../objects/classes/Cliente"

let cliente = new Cliente("123.456.789-10", "Cli A", "(12) 3456-7890", true, new Endereco("12345-67", "Log A", "123", "Apartamento 456", "Cidade A", "UF B"), new ContaCorrente(123, 100));

cliente.contas[0].depositar(100);
cliente.contas[0].depositar(100);
cliente.contas[0].depositar(100);

cliente.contas[0].sacar(50);

if (cliente.contas[0] instanceof ContaCorrente) {
    console.log(cliente.contas[0].calcularSaldo());
}