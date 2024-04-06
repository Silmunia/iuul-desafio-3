interface IUsuario {
    autenticar(): boolean
}

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

class Cargo {
    public readonly nome: string

    constructor(nome: string) {
        this.nome = nome;
    }
}

class Funcionario extends Pessoa implements IUsuario {

    public readonly cargo: Cargo;
    public readonly salario: number;

    constructor(nomeDoCargo: string, cpf: string, nome: string, telefone: string, salario: number) {
        super(cpf, nome, telefone);

        this.cargo = new Cargo(nomeDoCargo);
        this.salario = salario;
    }

    autenticar(): boolean {
        return true;
    }
}

let atendente = new Funcionario("Atendente", "123.456.789-10", "Fun A", "(12) 3456-7890", 2500);

let gerente = new Funcionario("Gerente", "109.876.543-21", "Fun B", "(10) 9876-5432", 5000);

console.log(atendente);

console.log(gerente);