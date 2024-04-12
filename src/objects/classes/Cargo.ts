import Funcionario from "./Funcionario";

class Cargo {
    public readonly nome: string

    public funcionarios: Array<Funcionario> = []

    constructor(nome: string) {
        this.nome = nome;
    }

    public adicionarFuncionario(novo: Funcionario) {
        this.funcionarios.push(novo);
    }

    public removerFuncionario(indice: number) {
        this.funcionarios.splice(indice, 1);
    }
}

export default Cargo;