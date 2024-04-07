
import IUsuario from "../interfaces/IUsuario";
import Pessoa from "../abstract classes/Pessoa";
import Endereco from "./Endereco";
import Conta from "../abstract classes/Conta";

class Cliente extends Pessoa implements IUsuario {

    public readonly vip: boolean
    private enderecos: Array<Endereco> = []
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

    calcularSaldoDeConta(numero: number): number {
        for (let i = 0; i< this.contas.length; i++) {
            if (this.contas[i].numero === numero) {
                return this.contas[i].calcularSaldo();
            }
        }

        throw new Error(`Conta de numero ${numero} não foi encontrada no cliente de CPF ${this.cpf}`);
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