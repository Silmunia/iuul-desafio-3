"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cliente_1 = __importDefault(require("../classes/Cliente"));
const Credito_1 = __importDefault(require("../classes/Credito"));
const Debito_1 = __importDefault(require("../classes/Debito"));
class Conta {
    constructor(numero) {
        this.creditos = [];
        this.debitos = [];
        this.numero = numero;
    }
    get cliente() {
        if (this._cliente instanceof Cliente_1.default) {
            return this._cliente;
        }
        else {
            throw Error("Conta não possui Cliente associado");
        }
    }
    set cliente(cliente) {
        this._cliente = cliente;
    }
    calcularTotal(montante) {
        let total = 0;
        for (let i = 0; i < montante.length; i++) {
            total += montante[i].valor;
        }
        return total;
    }
    depositar(valor) {
        let novoCredito = new Credito_1.default(valor, new Date());
        this.creditos.push(novoCredito);
    }
    sacar(valor) {
        let novoDebito = new Debito_1.default(valor, new Date());
        this.debitos.push(novoDebito);
    }
}
exports.default = Conta;
