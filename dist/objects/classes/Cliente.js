"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Pessoa_1 = __importDefault(require("../abstract classes/Pessoa"));
const ContaCorrente_1 = __importDefault(require("./ContaCorrente"));
class Cliente extends Pessoa_1.default {
    constructor(cpf, nome, telefone, vip, endereco, conta) {
        super(cpf, nome, telefone);
        this.enderecos = [];
        this.contas = [];
        this.vip = vip;
        this.enderecos.push(endereco);
        this.contas.push(conta);
    }
    adicionarEnderecos(enderecos) {
        this.enderecos = this.enderecos.concat(enderecos);
    }
    encontrarConta(numero) {
        for (let i = 0; i < this.contas.length; i++) {
            if (this.contas[i].numero === numero) {
                return this.contas[i];
            }
        }
        throw new Error(`Conta de numero ${numero} não foi encontrada no cliente de CPF ${this.cpf}`);
    }
    calcularSaldoDeConta(numeroDaConta) {
        let conta = this.encontrarConta(numeroDaConta);
        return conta.calcularSaldo();
    }
    fazerTransferencia(numeroContaOrigem, clienteDestino, numeroContaDestino, valor) {
        let contaOrigem = this.encontrarConta(numeroContaOrigem);
        if (contaOrigem instanceof ContaCorrente_1.default) {
            let contaDestino = clienteDestino.encontrarConta(numeroContaDestino);
            contaOrigem.transferir(contaDestino, valor);
        }
        else {
            throw new Error(`Conta ${numeroContaOrigem} de cliente ${this.cpf} não é Conta Corrente`);
        }
    }
    fazerDeposito(numeroDaConta, valor) {
        let conta = this.encontrarConta(numeroDaConta);
        conta.depositar(valor);
    }
    fazerSaque(numeroDaConta, valor) {
        let conta = this.encontrarConta(numeroDaConta);
        conta.sacar(valor);
    }
    listarEnderecos() {
        console.log(`Listando enderecos de cliente com CPF ${this.cpf}`);
        for (let i = 0; i < this.enderecos.length; i++) {
            console.log(`Endereco ${i + 1}`);
            console.log(this.enderecos[i]);
        }
    }
    autenticar() {
        return true;
    }
}
exports.default = Cliente;
