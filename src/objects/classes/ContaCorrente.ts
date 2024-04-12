
import Conta from "../abstract classes/Conta";

class ContaCorrente extends Conta {
    private _limite: number

    constructor(numero: string, limite: number) {
        super(numero);
        this._limite = limite;
    }

    public calcularSaldo(): number {
        let creditoTotal = this.calcularTotal(this._creditos);

        let debitoTotal = this.calcularTotal(this._debitos);
        
        return (creditoTotal - debitoTotal) + this._limite;
    }

    public transferir(contaDestino: Conta, valor: number) {
        this.fazerSaque(valor);

        contaDestino.depositar(valor);
    }

    public fazerSaque(valor: number) {
        if (this.calcularSaldo() - valor >= 0) {
            this.sacar(valor);
        } else {
            throw new Error(`Sacar ${valor} excede o limite de ${this._limite} da conta ${this._numero}`);
        }
    }
}

export default ContaCorrente;