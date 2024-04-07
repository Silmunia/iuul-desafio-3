
import Conta from "../abstract classes/Conta";

class ContaPoupanca extends Conta {
    calcularSaldo(): number {
        let creditoTotal = this.calcularTotal(this.creditos);

        let debitoTotal = this.calcularTotal(this.debitos);

        return (creditoTotal - debitoTotal);
    }

    fazerSaque(valor: number): void {
        if (this.calcularSaldo() - valor >= 0) {
            this.sacar(valor);
        } else {
            throw new Error(`Sacar ${valor} excede o crédito da conta ${this.numero}`);
        }
    }
}

export default ContaPoupanca;