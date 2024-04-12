import Cliente from "./Cliente"

class Endereco {
    private _cep: string
    private _logradouro: string
    private _numero: string
    private _complemento: string
    private _cidade: string
    private _uf: string

    private _cliente: Cliente | undefined;

    constructor(cep: string, logradouro: string, numero: string, complemento: string, cidade: string, unidadeFederativa: string) {
        this._cep = cep;
        this._logradouro = logradouro;
        this._numero = numero;
        this._complemento = complemento;
        this._cidade = cidade;
        this._uf = unidadeFederativa;
    }

    public set cliente(cliente: Cliente) {
        this._cliente = cliente;
    }

    public get cliente(): Cliente {
        if (this._cliente instanceof Cliente) {
            return this._cliente;
        } else {
            throw Error("Endereço não possui Cliente associado");
        }
    }

    public get cep(): string {
        return this._cep;
    }

    public get logradouro(): string {
        return this._logradouro;
    }

    public get numero(): string {
        return this._numero;
    }

    public get complemento(): string {
        return this._complemento;
    }

    public get cidade(): string {
        return this._cidade;
    }

    public get uf(): string {
        return this._uf;
    }

    public listarInformaçoes(): string {
        return `${this._uf}, ${this._cidade}, ${this._logradouro}, número ${this._numero}, ${this._complemento}, CEP ${this._cep}`;
    }
}

export default Endereco;