abstract class Pessoa {
    private _cpf: string
    private _nome: string
    private _telefone: string

    constructor(cpf: string, nome: string, telefone: string) {
        this._cpf = cpf;
        this._nome = nome;
        this._telefone = telefone;
    }

    public get cpf(): string {
        return this._cpf;
    }

    public get nome(): string {
        return this._nome;
    }
}

export default Pessoa;