
import Conta from "../abstract classes/Conta";

class ContaCorrente extends Conta {
    public readonly limite: number

    constructor(numero: string, limite: number) {
        super(numero);
        this.limite = limite;
    }

    calcularSaldo(): number {
        let creditoTotal = 0;

        for (let i = 0; i < this.creditos.length; i++) {
            creditoTotal += this.creditos[i].valor;
        }

        let debitoTotal = 0;

        for (let i = 0; i < this.debitos.length; i++) {
            debitoTotal += this.debitos[i].valor;
        }

        return (creditoTotal - debitoTotal) + this.limite;
    }

    transferir(contaDestino: Conta, valor: number) {
        this.fazerSaque(valor);

        contaDestino.depositar(valor);
    }

    fazerSaque(valor: number)  {
        if (this.calcularSaldo() - valor >= this.limite) {
            this.sacar(valor);
        } else {
            throw new Error(`Sacar ${valor} excede o limite de ${this.limite} da conta ${this.numero}`);
        }
    }
}

export default ContaCorrente;