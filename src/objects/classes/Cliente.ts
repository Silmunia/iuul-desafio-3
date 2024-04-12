
import IUsuario from "../interfaces/IUsuario";
import Pessoa from "../abstract classes/Pessoa";
import Endereco from "./Endereco";
import Conta from "../abstract classes/Conta";
import ContaCorrente from "./ContaCorrente";

class Cliente extends Pessoa implements IUsuario {

    private _vip: boolean
    private _enderecos: Array<Endereco> = []
    private _contas: Array<Conta> = []

    constructor(cpf: string, nome: string, telefone: string, vip: boolean, enderecoInicial: Endereco, contaInicial: Conta, outrasContas: Array<Conta> = [], outrosEnderecos: Array<Endereco> = []) {
        super(cpf, nome, telefone);
        this._vip = vip;

        this._enderecos.push(enderecoInicial);
        this._enderecos.concat(outrosEnderecos);

        this._enderecos.forEach((endereco) => {
            endereco.cliente = this;
        });

        this._contas.push(contaInicial);
        this._contas.concat(outrasContas);

        this._contas.forEach((conta) => {
            conta.cliente = this;
        });
    }

    public adicionarEnderecos(enderecos: Array<Endereco>) {
        this._enderecos = this._enderecos.concat(enderecos);

        enderecos.forEach((endereco) => {
            endereco.cliente = this;
        })
    }

    public encontrarConta(numero: string): Conta {
        for (let i = 0; i< this._contas.length; i++) {
            if (this._contas[i].numero === numero) {
                return this._contas[i];
            }
        }

        throw new Error(`Conta de numero ${numero} não foi encontrada no cliente de CPF ${this.cpf}`);
    }

    calcularSaldoDeConta(numeroDaConta: string): number {
        let conta = this.encontrarConta(numeroDaConta);

        return conta.calcularSaldo();
    }

    fazerTransferencia(numeroContaOrigem: string, clienteDestino: Cliente, numeroContaDestino: string, valor: number) {
        let contaOrigem = this.encontrarConta(numeroContaOrigem);

        if (contaOrigem instanceof ContaCorrente) {
            let contaDestino = clienteDestino.encontrarConta(numeroContaDestino);

            contaOrigem.transferir(contaDestino, valor);
        } else {
            throw new Error(`Conta ${numeroContaOrigem} de cliente ${this.cpf} não é Conta Corrente`);
        }

    }

    fazerDeposito(numeroDaConta: string, valor: number) {
        let conta = this.encontrarConta(numeroDaConta);

        conta.depositar(valor);
    }

    fazerSaque(numeroDaConta: string, valor: number) {
        let conta = this.encontrarConta(numeroDaConta);

        conta.sacar(valor);
    }

    listarEnderecos() {
        console.log(`Listando enderecos de cliente com CPF ${this.cpf}`);
        for (let i = 0; i < this._enderecos.length; i++) {
            console.log(`${i+1}. ${this._enderecos[i].listarInformaçoes()}`); 
        }
    }

    autenticar(): boolean {
        return true;
    }
}

export default Cliente;