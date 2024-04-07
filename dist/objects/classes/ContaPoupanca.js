"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Conta_1 = __importDefault(require("../abstract classes/Conta"));
class ContaPoupanca extends Conta_1.default {
    calcularSaldo() {
        let creditoTotal = 0;
        for (let i = 0; i < this.creditos.length; i++) {
            creditoTotal += this.creditos[i].valor;
        }
        let debitoTotal = 0;
        for (let i = 0; i < this.debitos.length; i++) {
            debitoTotal += this.debitos[i].valor;
        }
        return (creditoTotal - debitoTotal);
    }
}
exports.default = ContaPoupanca;
