
import Conta from "../abstract classes/Conta";

class ContaPoupanca extends Conta {
    public calcularSaldo(): number {
        let creditoTotal = this.calcularTotal(this._creditos);

        let debitoTotal = this.calcularTotal(this._debitos);

        return (creditoTotal - debitoTotal);
    }

    public fazerSaque(valor: number) {
        if (this.calcularSaldo() - valor >= 0) {
            this.sacar(valor);
        } else {
            throw new Error(`Sacar ${valor} excede o crédito da conta ${this.numero}`);
        }
    }
}

export default ContaPoupanca;