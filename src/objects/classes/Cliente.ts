
import IUsuario from "../interfaces/IUsuario";
import Pessoa from "../abstract classes/Pessoa";
import Endereco from "./Endereco";
import Conta from "../abstract classes/Conta";
import ContaCorrente from "./ContaCorrente";

class Cliente extends Pessoa implements IUsuario {

    public readonly vip: boolean
    public enderecos: Array<Endereco> = []
    public contas: Array<Conta> = []

    constructor(cpf: string, nome: string, telefone: string, vip: boolean, endereco: Endereco, conta: Conta) {
        super(cpf, nome, telefone);
        this.vip = vip;
        this.enderecos.push(endereco);
        this.contas.push(conta);
    }

    adicionarEnderecos(enderecos: Array<Endereco>) {
        this.enderecos = this.enderecos.concat(enderecos);
    }

    encontrarConta(numero: string): Conta {
        for (let i = 0; i< this.contas.length; i++) {
            if (this.contas[i].numero === numero) {
                return this.contas[i];
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
        for (let i = 0; i < this.enderecos.length; i++) {
            console.log(`Endereco ${i+1}`)
            console.log(this.enderecos[i]);
        }
    }

    autenticar(): boolean {
        return true;
    }
}

export default Cliente;