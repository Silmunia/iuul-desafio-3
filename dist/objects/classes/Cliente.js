"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Pessoa_1 = __importDefault(require("../abstract classes/Pessoa"));
const ContaCorrente_1 = __importDefault(require("./ContaCorrente"));
class Cliente extends Pessoa_1.default {
    constructor(cpf, nome, telefone, vip, enderecoInicial, contaInicial, outrasContas = [], outrosEnderecos = []) {
        super(cpf, nome, telefone);
        this._enderecos = [];
        this._contas = [];
        this._vip = vip;
        this._enderecos.push(enderecoInicial);
        this._enderecos = this._enderecos.concat(outrosEnderecos);
        this._enderecos.forEach((endereco) => {
            endereco.cliente = this;
        });
        this._contas.push(contaInicial);
        this._contas = this._contas.concat(outrasContas);
        this._contas.forEach((conta) => {
            conta.cliente = this;
        });
    }
    get vip() {
        return this._vip;
    }
    set vip(novoVIP) {
        this._vip = novoVIP;
    }
    get contas() {
        return this._contas;
    }
    get enderecos() {
        return this._enderecos;
    }
    adicionarEnderecos(enderecos) {
        this._enderecos = this._enderecos.concat(enderecos);
        enderecos.forEach((endereco) => {
            endereco.cliente = this;
        });
    }
    removerEndereco(indice) {
        if (this._enderecos.length === 1) {
            throw new Error("Não é possível remover o Endereço de um Cliente com apenas 1 Endereço");
        }
        else {
            this._enderecos.splice(indice, 1);
        }
    }
    encontrarConta(numero) {
        for (let i = 0; i < this._contas.length; i++) {
            if (this._contas[i].numero === numero) {
                return this._contas[i];
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
        try {
            let conta = this.encontrarConta(numeroDaConta);
            conta.fazerSaque(valor);
        }
        catch (error) {
            throw error;
        }
    }
    listarEnderecos() {
        console.log(`Listando enderecos de cliente com CPF ${this.cpf}`);
        for (let i = 0; i < this._enderecos.length; i++) {
            console.log(`${i + 1}. ${this._enderecos[i].listarInformaçoes()}`);
        }
    }
    autenticar() {
        return true;
    }
}
exports.default = Cliente;
