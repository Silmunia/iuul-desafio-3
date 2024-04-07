"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Pessoa_1 = __importDefault(require("../abstract classes/Pessoa"));
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
