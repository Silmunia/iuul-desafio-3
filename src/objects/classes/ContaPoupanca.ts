
import Conta from "../abstract classes/Conta";

class ContaPoupanca extends Conta {
    calcularSaldo(): number {
        let creditoTotal = 0;

        for (let i = 0; i < this.creditos.length; i++) {
            creditoTotal += this.creditos[i].valor;
        }

        let debitoTotal = 0;

        for (let i = 0; i < this.debitos.length; i++) {
            debitoTotal += this.debitos[i].valor;
        }

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