
import Credito from "../classes/Credito";
import Debito from "../classes/Debito";

abstract class Conta {
    public readonly numero: number
    protected creditos: Array<Credito> = []
    protected debitos: Array<Debito> = []
    
    constructor(numero: number) {
        this.numero = numero;
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