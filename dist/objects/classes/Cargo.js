"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cargo {
    constructor(nome) {
        this._funcionarios = [];
        this._nome = nome;
    }
    set novoFuncionario(novo) {
        this._funcionarios.push(novo);
    }
}
exports.default = Cargo;
