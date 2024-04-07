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
    public contas: Array<Conta> = []

    constructor(cpf: string, nome: string, telefone: string, vip: boolean, endereco: Endereco, conta: Conta) {
        super(cpf, nome, telefone);
        this.vip = vip;
        this.enderecos.push(endereco);
        this.contas.push(conta);
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

class Credito {
    public readonly valor: number
    public readonly data: Date

    constructor(valor: number, data: Date) {
        this.valor = valor;
        this.data = data;
    }
}

class Debito {
    public readonly valor: number
    public readonly data: Date

    constructor(valor: number, data: Date) {
        this.valor = valor;
        this.data = data;
    }
}

abstract class Conta {
    public readonly numero: number
    protected creditos: Array<Credito> = []
    protected debitos: Array<Debito> = []
    
    constructor(numero: number) {
        this.numero = numero;
    }

    depositar(valor: number) {
        let novoCredito = new Credito(valor, new Date());

        this.creditos.push(novoCredito);
    }

    sacar(valor: number) {
        let novoDebito = new Debito(valor, new Date());

        this.debitos.push(novoDebito);
    }
}

class ContaCorrente extends Conta {
    public readonly limite: number

    constructor(numero: number, limite: number) {
        super(numero);
        this.limite = limite;
    }

    calcularSaldo(): number {
        let creditoTotal = 0;

        for (let i = 0; i < this.creditos.length; i++) {
            creditoTotal += this.creditos[i].valor;
        }

        let debitoTotal = 0;

        for (let i = 0; i < this.debitos.length; i++) {
            debitoTotal += this.debitos[i].valor;
        }

        return (creditoTotal - debitoTotal) + this.limite;
    }

    transferir(contaDestino: Conta, valor: number) {
        if (this.calcularSaldo() - valor >= this.limite) {
            this.sacar(valor);

            contaDestino.depositar(valor);
        }
    }
}

class ContaPoupanca extends Conta {
    calcularSaldo(): number {
        let creditoTotal = 0;

        for (let i = 0; i < this.creditos.length; i++) {
            creditoTotal += this.creditos[i].valor;
        }

        let debitoTotal = 0;

        for (let i = 0; i < this.debitos.length; i++) {
            debitoTotal += this.debitos[i].valor;
        }

        return (creditoTotal - debitoTotal);
    }
}

let clienteA = new Cliente("123.456.789-10", "Cli A", "(12) 3456-7890", true, new Endereco("12345-67", "Log A", "123", "Apartamento 456", "Cidade A", "UF B"), new ContaCorrente(123, 100));

clienteA.contas[0].depositar(1000);

let clienteB = new Cliente("456.123.789-10", "Cli B", "(10) 1256-7889", true, new Endereco("12398-66", "Log A", "13", "Apartamento 404", "Cidade A", "UF B"), new ContaPoupanca(456));

clienteB.contas[0].depositar(1000);

if (clienteA.contas[0] instanceof ContaCorrente) {
    clienteA.contas[0].transferir(clienteB.contas[0], 500);
}

if (clienteA.contas[0] instanceof ContaCorrente) {
    console.log(clienteA.contas[0].calcularSaldo());
}

if (clienteB.contas[0] instanceof ContaPoupanca) {
    console.log(clienteB.contas[0].calcularSaldo());
}