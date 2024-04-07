abstract class Pessoa {
    public readonly cpf: string
    public readonly nome: string
    public readonly telefone: string

    constructor(cpf: string, nome: string, telefone: string) {
        this.cpf = cpf;
        this.nome = nome;
        this.telefone = telefone;
    }
}

export default Pessoa;