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

    public set cpf(novoCpf: string) {
        this._cpf = novoCpf;
    }

    public get nome(): string {
        return this._nome;
    }

    public set nome(novoNome: string) {
        this._nome = novoNome;
    }

    public get telefone(): string {
        return this._telefone;
    }

    public set telefone(novoTelefone: string) {
        this._telefone = novoTelefone;
    }
}

export default Pessoa;