"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cargo {
    constructor(nome) {
        this.funcionarios = [];
        this.nome = nome;
    }
    adicionarFuncionario(novo) {
        this.funcionarios.push(novo);
    }
    removerFuncionario(indice) {
        this.funcionarios.splice(indice, 1);
    }
}
exports.default = Cargo;
