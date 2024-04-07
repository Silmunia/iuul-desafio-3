"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Pessoa_1 = __importDefault(require("../abstract classes/Pessoa"));
const Cargo_1 = __importDefault(require("./Cargo"));
class Funcionario extends Pessoa_1.default {
    constructor(nomeDoCargo, cpf, nome, telefone, salario) {
        super(cpf, nome, telefone);
        this.cargos = [];
        this.cargos.push(new Cargo_1.default(nomeDoCargo));
        this.salario = salario;
    }
    autenticar() {
        return true;
    }
}
exports.default = Funcionario;
