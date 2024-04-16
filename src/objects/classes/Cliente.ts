
import IUsuario from "../interfaces/IUsuario";
import Pessoa from "../abstract classes/Pessoa";
import Endereco from "./Endereco";
import Conta from "../abstract classes/Conta";
import ContaCorrente from "./ContaCorrente";
import ContaPoupanca from "./ContaPoupanca";

class Cliente extends Pessoa implements IUsuario {

    private _vip: boolean
    private _enderecos: Array<Endereco> = []
    private _contas: Array<Conta> = []

    constructor(cpf: string, nome: string, telefone: string, vip: boolean, enderecoInicial: Endereco, contaInicial: Conta, outrasContas: Array<Conta> = [], outrosEnderecos: Array<Endereco> = []) {
        super(cpf, nome, telefone);
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

    public get vip(): boolean {
        return this._vip;
    }

    public set vip(novoVIP: boolean) {
        this._vip = novoVIP;
    }

    public get contas(): Array<Conta> {
        return this._contas;
    }

    public get enderecos(): Array<Endereco> {
        return this._enderecos;
    }

    public adicionarEnderecos(enderecos: Array<Endereco>) {
        this._enderecos = this._enderecos.concat(enderecos);

        enderecos.forEach((endereco) => {
            endereco.cliente = this;
        })
    }

    public removerEndereco(indice: number) {
        if (this._enderecos.length === 1) {
            throw new Error("Não é possível remover o Endereço de um Cliente com apenas um Endereço");
        } else if (indice < 0 || indice >= this._enderecos.length) {
            throw new Error("O Endereço escolhido para remoção é inválido");
        } else {
            this._enderecos.splice(indice, 1);
        }
    }

    public adicionarContas(contas: Array<Conta>) {
        this._contas = this._contas.concat(contas);

        contas.forEach((conta) => {
            conta.cliente = this;
        })
    }

    public removerConta(indice: number) {
        if (this._contas.length === 1) {
            throw new Error("Não é possível remover a Conta de um Cliente com apenas uma Conta");
        } else if (indice < 0 || indice >= this._contas.length) {
            throw new Error("A Conta escolhida para remoção é inválida");
        } else {
            this._contas.splice(indice, 1);
        }
    }

    public encontrarConta(numero: string): ContaCorrente | ContaPoupanca {
        for (let i = 0; i< this._contas.length; i++) {
            if (this._contas[i].numero === numero) {
                return this._contas[i] as ContaCorrente | ContaPoupanca;
            }
        }

        throw new Error(`Conta de numero ${numero} não foi encontrada no cliente de CPF ${this.cpf}`);
    }

    public calcularSaldoDeConta(numeroDaConta: string): number {
        let conta = this.encontrarConta(numeroDaConta);

        return conta.calcularSaldo();
    }

    public fazerTransferencia(numeroContaOrigem: string, clienteDestino: Cliente, numeroContaDestino: string, valor: number) {
        let contaOrigem = this.encontrarConta(numeroContaOrigem);

        if (contaOrigem instanceof ContaCorrente) {
            let contaDestino = clienteDestino.encontrarConta(numeroContaDestino);

            contaOrigem.transferir(contaDestino, valor);
        } else {
            throw new Error(`Conta ${numeroContaOrigem} de cliente ${this.cpf} não é Conta Corrente`);
        }

    }

    public fazerDeposito(numeroDaConta: string, valor: number) {
        let conta = this.encontrarConta(numeroDaConta);

        conta.depositar(valor);
    }

    public fazerSaque(numeroDaConta: string, valor: number) {
        try {
            let conta = this.encontrarConta(numeroDaConta);
            
            conta.fazerSaque(valor);
        } catch (error) {
            throw error;
        }
    }

    public listarEnderecos(): string {

        let resultado = "";

        for (let i = 0; i < this._enderecos.length; i++) {
            resultado += `${i+1}. ${this._enderecos[i].listarInformaçoes()}\n`; 
        }

        return resultado;
    }

    public autenticar(): boolean {
        return true;
    }
}

export default Cliente;