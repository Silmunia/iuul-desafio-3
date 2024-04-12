import Funcionario from "./Funcionario";

class Cargo {
    private _nome: string
    private _funcionarios: Array<Funcionario> = []

    constructor(nome: string) {
        this._nome = nome;
    }

    public get nome(): string {
        return this._nome;
    }

    public set novoFuncionario(novo: Funcionario) {
        this._funcionarios.push(novo);
    }
}

export default Cargo;