class Endereco {
    public readonly cep: string
    public readonly logradouro: string
    public readonly numero: string
    public readonly complemento: string
    public readonly cidade: string
    public readonly uf: string

    constructor(cep: string, logradouro: string, numero: string, complemento: string, cidade: string, unidadeFederativa: string) {
        this.cep = cep;
        this.logradouro = logradouro;
        this.numero = numero;
        this.complemento = complemento;
        this.cidade = cidade;
        this.uf = unidadeFederativa;
    }
}

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

class Cliente extends Pessoa implements IUsuario {

    public readonly vip: boolean
    private enderecos: Array<Endereco> = []

    constructor(cpf: string, nome: string, telefone: string, vip: boolean, endereco: Endereco) {
        super(cpf, nome, telefone);
        this.vip = vip;
        this.enderecos.push(endereco);
    }

    adicionarEnderecos(enderecos: Array<Endereco>) {
        this.enderecos = this.enderecos.concat(enderecos);
    }

    listarEnderecos() {
        console.log(`Listando enderecos de cliente com CPF ${this.cpf}`);
        for (let i = 0; i < this.enderecos.length; i++) {
            console.log(`Endereco ${i+1}`)
            console.log(this.enderecos[i]);
        }
    }

    autenticar(): boolean {
        return true;
    }
}

let cliente = new Cliente("123.456.789-10", "Cli A", "(12) 3456-7890", true, new Endereco("12345-67", "Log A", "123", "Apartamento 456", "Cidade A", "UF B"));

cliente.adicionarEnderecos([
    new Endereco("12345-80", "Log B", "456", "", "Cidade A", "UF B"), 
    new Endereco("46385-53", "Log X", "5678", "", "Cidade B", "UF B"), 
    new Endereco("46374-01", "Log H", "23", "Casa 67", "Cidade C", "UF B")
]);

cliente.listarEnderecos();