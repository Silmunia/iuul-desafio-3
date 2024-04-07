
import Endereco from "../objects/classes/Endereco";
import ContaCorrente from "../objects/classes/ContaCorrente";
import Cliente from "../objects/classes/Cliente";

let cliente = new Cliente("123.456.789-10", "Cli A", "(12) 3456-7890", true, new Endereco("12345-67", "Log A", "123", "Apartamento 456", "Cidade A", "UF B"), new ContaCorrente("123", 100));

cliente.adicionarEnderecos([
    new Endereco("12345-80", "Log B", "456", "", "Cidade A", "UF B"), 
    new Endereco("46385-53", "Log X", "5678", "", "Cidade B", "UF B"), 
    new Endereco("46374-01", "Log H", "23", "Casa 67", "Cidade C", "UF B")
]);

cliente.listarEnderecos();