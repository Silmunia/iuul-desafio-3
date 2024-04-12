"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Pessoa_1 = __importDefault(require("../abstract classes/Pessoa"));
class Funcionario extends Pessoa_1.default {
    constructor(cargos, cpf, nome, telefone, salario) {
        super(cpf, nome, telefone);
        this.cargos = [];
        this.cargos = cargos;
        this.salario = salario;
        for (let i = 0; i < this.cargos.length; i++) {
            let cargoAtual = this.cargos[i];
            cargoAtual.adicionarFuncionario(this);
        }
    }
    autenticar() {
        return true;
    }
}
exports.default = Funcionario;
