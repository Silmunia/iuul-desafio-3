
import Conta from "../abstract classes/Conta";

class ContaCorrente extends Conta {
    public readonly limite: number

    constructor(numero: string, limite: number) {
        super(numero);
        this.limite = limite;
    }

    calcularSaldo(): number {
        let creditoTotal = this.calcularTotal(this.creditos);

        let debitoTotal = this.calcularTotal(this.debitos);
        
        return (creditoTotal - debitoTotal) + this.limite;
    }

    transferir(contaDestino: Conta, valor: number) {
        this.fazerSaque(valor);

        contaDestino.depositar(valor);
    }

    fazerSaque(valor: number) {
        if (this.calcularSaldo() - valor >= 0) {
            this.sacar(valor);
        } else {
            throw new Error(`Sacar ${valor} excede o limite de ${this.limite} da conta ${this.numero}`);
        }
    }
}

export default ContaCorrente;