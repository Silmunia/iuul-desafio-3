"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pessoa {
    constructor(cpf, nome, telefone) {
        this._cpf = cpf;
        this._nome = nome;
        this._telefone = telefone;
    }
    get cpf() {
        return this._cpf;
    }
    set cpf(novoCpf) {
        this._cpf = novoCpf;
    }
    get nome() {
        return this._nome;
    }
    set nome(novoNome) {
        this._nome = novoNome;
    }
    get telefone() {
        return this._telefone;
    }
    set telefone(novoTelefone) {
        this._telefone = novoTelefone;
    }
}
exports.default = Pessoa;
