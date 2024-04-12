"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Conta_1 = __importDefault(require("../abstract classes/Conta"));
class ContaPoupanca extends Conta_1.default {
    calcularSaldo() {
        let creditoTotal = this.calcularTotal(this._creditos);
        let debitoTotal = this.calcularTotal(this._debitos);
        return (creditoTotal - debitoTotal);
    }
    fazerSaque(valor) {
        if (this.calcularSaldo() - valor >= 0) {
            this.sacar(valor);
        }
        else {
            throw new Error(`Sacar ${valor} excede o crédito da conta ${this.numero}`);
        }
    }
}
exports.default = ContaPoupanca;
