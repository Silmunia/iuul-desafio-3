"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Pessoa_1 = __importDefault(require("../abstract classes/Pessoa"));
class Funcionario extends Pessoa_1.default {
    constructor(cargoInicial, outrosCargos = [], cpf, nome, telefone, salario) {
        super(cpf, nome, telefone);
        this._cargos = [];
        this._cargos.push(cargoInicial);
        this._cargos.concat(outrosCargos);
        this._salario = salario;
        for (let i = 0; i < this._cargos.length; i++) {
            let cargoAtual = this._cargos[i];
            cargoAtual.novoFuncionario = this;
        }
    }
    autenticar() {
        return true;
    }
}
exports.default = Funcionario;
