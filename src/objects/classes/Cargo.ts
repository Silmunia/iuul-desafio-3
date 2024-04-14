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

    public removerFuncionario(funcionario: Funcionario) {
        for (let i = 0; i < this._funcionarios.length; i++) {
            if (this._funcionarios[i] === funcionario) {
                this._funcionarios.splice(i, 1);
                return;
            }
        }

        throw new Error("O Cargo não inclui o Funcionário escolhido para remoção");
    }
}

export default Cargo;