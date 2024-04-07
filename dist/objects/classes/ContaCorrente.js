"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Conta_1 = __importDefault(require("../abstract classes/Conta"));
class ContaCorrente extends Conta_1.default {
    constructor(numero, limite) {
        super(numero);
        this.limite = limite;
    }
    calcularSaldo() {
        let creditoTotal = this.calcularTotal(this.creditos);
        let debitoTotal = this.calcularTotal(this.debitos);
        return (creditoTotal - debitoTotal) + this.limite;
    }
    transferir(contaDestino, valor) {
        this.fazerSaque(valor);
        contaDestino.depositar(valor);
    }
    fazerSaque(valor) {
        if (this.calcularSaldo() - valor >= 0) {
            this.sacar(valor);
        }
        else {
            throw new Error(`Sacar ${valor} excede o limite de ${this.limite} da conta ${this.numero}`);
        }
    }
}
exports.default = ContaCorrente;
