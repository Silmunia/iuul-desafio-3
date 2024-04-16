"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cargo {
    constructor(nome) {
        this._funcionarios = [];
        this._nome = nome;
    }
    get nome() {
        return this._nome;
    }
    set novoFuncionario(novo) {
        this._funcionarios.push(novo);
    }
    removerFuncionario(funcionario) {
        for (let i = 0; i < this._funcionarios.length; i++) {
            if (this._funcionarios[i] === funcionario) {
                this._funcionarios.splice(i, 1);
                return;
            }
        }
        throw new Error("O Cargo não inclui o Funcionário escolhido para remoção");
    }
}
exports.default = Cargo;
