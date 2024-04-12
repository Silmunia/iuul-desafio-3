
import Endereco from "../objects/classes/Endereco";
import ContaCorrente from "../objects/classes/ContaCorrente";
import Cliente from "../objects/classes/Cliente";

let endereco: Endereco = new Endereco("12345-67", "Log A", "123", "Apartamento 456", "Cidade A", "UF B");
let conta: ContaCorrente = new ContaCorrente("123", 100);
let cliente = new Cliente("123.456.789-10", "Cli A", "(12) 3456-7890", true, endereco, conta);
console.log("Novo Cliente criado:");
console.log(cliente);

let novosEnderecos: Array<Endereco> = [
    new Endereco("12345-80", "Log B", "456", "", "Cidade A", "UF B"), 
    new Endereco("46385-53", "Log X", "5678", "", "Cidade B", "UF B"), 
    new Endereco("46374-01", "Log H", "23", "Casa 67", "Cidade C", "UF B")
]

console.log(`Adicionando ${novosEnderecos.length} novos(s) endereço(s) ao cliente com CPF ${cliente.cpf}`);
cliente.adicionarEnderecos(novosEnderecos);

cliente.listarEnderecos();