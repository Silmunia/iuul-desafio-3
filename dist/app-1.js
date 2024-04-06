"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pessoa {
    constructor(cpf, nome, telefone) {
        this.cpf = cpf;
        this.nome = nome;
        this.telefone = telefone;
    }
}
class Cargo {
    constructor(nome) {
        this.nome = nome;
    }
}
class Funcionario extends Pessoa {
    constructor(nomeDoCargo, cpf, nome, telefone, salario) {
        super(cpf, nome, telefone);
        this.cargo = new Cargo(nomeDoCargo);
        this.salario = salario;
    }
    autenticar() {
        return true;
    }
}
let atendente = new Funcionario("Atendente", "123.456.789-10", "Fun A", "(12) 3456-7890", 2500);
let gerente = new Funcionario("Gerente", "109.876.543-21", "Fun B", "(10) 9876-5432", 5000);
console.log(atendente);
console.log(gerente);
