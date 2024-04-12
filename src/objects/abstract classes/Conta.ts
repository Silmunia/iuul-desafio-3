
import Cliente from "../classes/Cliente";
import Credito from "../classes/Credito";
import Debito from "../classes/Debito";

abstract class Conta {
    public readonly numero: string
    protected creditos: Array<Credito> = []
    protected debitos: Array<Debito> = []
    private _cliente: Cliente | undefined;
    
    constructor(numero: string) {
        this.numero = numero;
    }

    public get cliente(): Cliente {
        if (this._cliente instanceof Cliente) {
            return this._cliente;
        } else {
            throw Error("Conta não possui Cliente associado");
        }
    }

    public set cliente(cliente: Cliente) {
        this._cliente = cliente;
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