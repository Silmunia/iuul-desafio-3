"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Pessoa_1 = __importDefault(require("../abstract classes/Pessoa"));
class Funcionario extends Pessoa_1.default {
    constructor(cargoInicial, cpf, nome, telefone, salario, outrosCargos = []) {
        super(cpf, nome, telefone);
        this._cargos = [];
        this._cargos.push(cargoInicial);
        this._cargos = this._cargos.concat(outrosCargos);
        this._salario = salario;
        for (let i = 0; i < this._cargos.length; i++) {
            let cargoAtual = this._cargos[i];
            cargoAtual.novoFuncionario = this;
        }
    }
    get cargos() {
        return this._cargos;
    }
    get salario() {
        return this._salario;
    }
    set salario(novoSalario) {
        this._salario = novoSalario;
    }
    adicionarCargo(novoCargo) {
        this._cargos.push(novoCargo);
        novoCargo.novoFuncionario = this;
    }
    removerCargo(nomeDoCargo) {
        if (this.cargos.length === 1) {
            throw new Error("Não é possível remover o Cargo de um Funcionário com apenas 1 Cargo");
        }
        else {
            for (let i = 0; i < this._cargos.length; i++) {
                if (this._cargos[i].nome === nomeDoCargo) {
                    this._cargos.splice(i, 1);
                }
            }
            throw new Error("O Funcionário não possui o Cargo escolhido para remoção");
        }
    }
    autenticar() {
        return true;
    }
}
exports.default = Funcionario;
