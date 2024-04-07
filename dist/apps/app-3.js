"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Endereco {
    constructor(cep, logradouro, numero, complemento, cidade, unidadeFederativa) {
        this.cep = cep;
        this.logradouro = logradouro;
        this.numero = numero;
        this.complemento = complemento;
        this.cidade = cidade;
        this.uf = unidadeFederativa;
    }
}
class Pessoa {
    constructor(cpf, nome, telefone) {
        this.cpf = cpf;
        this.nome = nome;
        this.telefone = telefone;
    }
}
class Cliente extends Pessoa {
    constructor(cpf, nome, telefone, vip, endereco, conta) {
        super(cpf, nome, telefone);
        this.enderecos = [];
        this.contas = [];
        this.vip = vip;
        this.enderecos.push(endereco);
        this.contas.push(conta);
    }
    adicionarEnderecos(enderecos) {
        this.enderecos = this.enderecos.concat(enderecos);
    }
    listarEnderecos() {
        console.log(`Listando enderecos de cliente com CPF ${this.cpf}`);
        for (let i = 0; i < this.enderecos.length; i++) {
            console.log(`Endereco ${i + 1}`);
            console.log(this.enderecos[i]);
        }
    }
    autenticar() {
        return true;
    }
}
class Credito {
    constructor(valor, data) {
        this.valor = valor;
        this.data = data;
    }
}
class Debito {
    constructor(valor, data) {
        this.valor = valor;
        this.data = data;
    }
}
class Conta {
    constructor(numero) {
        this.creditos = [];
        this.debitos = [];
        this.numero = numero;
    }
    depositar(valor) {
        let novoCredito = new Credito(valor, new Date());
        this.creditos.push(novoCredito);
    }
    sacar(valor) {
        let novoDebito = new Debito(valor, new Date());
        this.debitos.push(novoDebito);
    }
}
class ContaCorrente extends Conta {
    constructor(numero, limite) {
        super(numero);
        this.limite = limite;
    }
    calcularSaldo() {
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
    transferir(contaDestino, valor) {
        if (this.calcularSaldo() - valor >= this.limite) {
            this.sacar(valor);
            contaDestino.depositar(valor);
        }
    }
}
let cliente = new Cliente("123.456.789-10", "Cli A", "(12) 3456-7890", true, new Endereco("12345-67", "Log A", "123", "Apartamento 456", "Cidade A", "UF B"), new ContaCorrente(123, 100));
cliente.contas[0].depositar(100);
cliente.contas[0].depositar(100);
cliente.contas[0].depositar(100);
cliente.contas[0].sacar(50);
if (cliente.contas[0] instanceof ContaCorrente) {
    console.log(cliente.contas[0].calcularSaldo());
}
