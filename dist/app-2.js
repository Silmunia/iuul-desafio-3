"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Endereco {
    constructor(cep, logradouro, numero, complemento, cidade, unidadeFederativa) {
        this.cep = cep;
        this.logradouro = logradouro;
        this.numero = numero;
        this.complemento = complemento;
        this.cidade = cidade;
        this.uf = unidadeFederativa;
    }
}
class Pessoa {
    constructor(cpf, nome, telefone) {
        this.cpf = cpf;
        this.nome = nome;
        this.telefone = telefone;
    }
}
class Cliente extends Pessoa {
    constructor(cpf, nome, telefone, vip, endereco) {
        super(cpf, nome, telefone);
        this.enderecos = [];
        this.vip = vip;
        this.enderecos.push(endereco);
    }
    adicionarEnderecos(enderecos) {
        this.enderecos = this.enderecos.concat(enderecos);
    }
    listarEnderecos() {
        console.log(`Listando enderecos de cliente com CPF ${this.cpf}`);
        for (let i = 0; i < this.enderecos.length; i++) {
            console.log(`Endereco ${i + 1}`);
            console.log(this.enderecos[i]);
        }
    }
    autenticar() {
        return true;
    }
}
let cliente = new Cliente("123.456.789-10", "Cli A", "(12) 3456-7890", true, new Endereco("12345-67", "Log A", "123", "Apartamento 456", "Cidade A", "UF B"));
cliente.adicionarEnderecos([
    new Endereco("12345-80", "Log B", "456", "", "Cidade A", "UF B"),
    new Endereco("46385-53", "Log X", "5678", "", "Cidade B", "UF B"),
    new Endereco("46374-01", "Log H", "23", "Casa 67", "Cidade C", "UF B")
]);
cliente.listarEnderecos();
