
import Credito from "../classes/Credito";
import Debito from "../classes/Debito";

abstract class Conta {
    public readonly numero: string
    protected creditos: Array<Credito> = []
    protected debitos: Array<Debito> = []
    
    constructor(numero: string) {
        this.numero = numero;
    }

    calcularTotal(montante: Array<Credito | Debito>): number {

        let total: number = 0;

        for (let i = 0; i < montante.length; i++) {
            total += montante[i].valor;
        }

        return total;
    }

    depositar(valor: number) {
        let novoCredito = new Credito(valor, new Date());

        this.creditos.push(novoCredito);
    }

    sacar(valor: number) {
        let novoDebito = new Debito(valor, new Date());

        this.debitos.push(novoDebito);
    }

    abstract calcularSaldo(): number;
}

export default Conta;