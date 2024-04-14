"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Conta_1 = __importDefault(require("../abstract classes/Conta"));
class ContaCorrente extends Conta_1.default {
    constructor(numero, limite) {
        super(numero);
        this._limite = limite;
    }
    calcularSaldo() {
        let creditoTotal = this.calcularTotal(this._creditos);
        let debitoTotal = this.calcularTotal(this._debitos);
        return (creditoTotal - debitoTotal) + this._limite;
    }
    transferir(contaDestino, valor) {
        try {
            this.fazerSaque(valor);
            contaDestino.depositar(valor);
        }
        catch (error) {
            throw error;
        }
    }
    fazerSaque(valor) {
        if (this.calcularSaldo() - valor >= 0) {
            this.sacar(valor);
        }
        else {
            throw new Error(`Sacar ${valor} excede o limite de ${this._limite} da conta ${this._numero}`);
        }
    }
}
exports.default = ContaCorrente;
