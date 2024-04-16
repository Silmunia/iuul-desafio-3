
import Cliente from "../classes/Cliente";
import Credito from "../classes/Credito";
import Debito from "../classes/Debito";

abstract class Conta {
    protected _numero: string
    protected _creditos: Array<Credito> = []
    protected _debitos: Array<Debito> = []
    protected _cliente: Cliente | undefined;
    
    constructor(numero: string) {
        this._numero = numero;
    }

    public get numero(): string {
        return this._numero;
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

    public calcularTotal(montante: Array<Credito | Debito>): number {

        let total: number = 0;

        for (let i = 0; i < montante.length; i++) {
            total += montante[i].valor;
        }

        return total;
    }

    public depositar(valor: number) {
        let novoCredito = new Credito(valor, new Date());

        this._creditos.push(novoCredito);
    }

    public sacar(valor: number) {
        let novoDebito = new Debito(valor, new Date());

        this._debitos.push(novoDebito);
    }

    abstract calcularSaldo(): number;

    abstract fazerSaque(valor: number): void;
}

export default Conta;