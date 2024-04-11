
import Cliente from "../objects/classes/Cliente";
import Endereco from "../objects/classes/Endereco";
import Conta from "../objects/abstract classes/Conta";
import ContaCorrente from "../objects/classes/ContaCorrente";
import Funcionario from "../objects/classes/Funcionario";
import InputHandler from "./InputHandler";
import ContaPoupanca from "../objects/classes/ContaPoupanca";

class FactoryRepository {

    private inputHandler: InputHandler = new InputHandler();

    public async startEmployeeCreation(): Promise<Funcionario> {
        return new Promise<Funcionario>(async (resolve) => {
            let employeeName: string = await this.inputHandler.getStringInput("Insira o nome do Funcionário: ");
            let roleName: string = await this.inputHandler.getStringInput("Insira o cargo do Funcionário: ");
            let cpf: string = await this.inputHandler.getStringInput("Insira o CPF do Funcionário: ");
            let phone: string = await this.inputHandler.getStringInput("Insira o telefone do Funcionário: ");
            let salary: number = await this.inputHandler.getNumberInput("Insira o salário do Funcionário: ");

            let newEmployee = new Funcionario(roleName, cpf, employeeName, phone, salary);

            console.log(">>> Funcionário criado com sucesso");
            
            resolve(newEmployee);
        });
    }

    public async startClientCreation(): Promise<Cliente> {
        return new Promise<Cliente>(async (resolve) => {

            let clientName: string = await this.inputHandler.getStringInput("Insira o nome do Cliente: ");
            let cpf: string = await this.inputHandler.getStringInput("Insira o CPF do Cliente: ");
            let phone: string = await this.inputHandler.getStringInput("Insira o telefone do Cliente: ");
            let address: Endereco = await this.startAddressCreation();
            let account: Conta = await this.startAccountCreation();
            let isVIP: boolean = await this.inputHandler.getBooleanInput("O Cliente é VIP? (s/n) ");

            let newClient = new Cliente(cpf, clientName, phone, isVIP, address, account);

            console.log(">>> Cliente criado com sucesso");

            resolve(newClient);
        });
    }

    public async startAddressCreation(): Promise<Endereco> {
        return new Promise<Endereco>(async (resolve) => {

            console.log(">>> Criando Endereço");

            let state: string = await this.inputHandler.getStringInput("Insira a Unidade Federativa do Endereço: ");
            let city: string = await this.inputHandler.getStringInput("Insira a cidade do Endereço: ");
            let street: string = await this.inputHandler.getStringInput("Insira o logradouro do Endereço: ");
            let number: string = await this.inputHandler.getStringInput("Insira o número do Endereço: ");
            let extraInfo: string = await this.inputHandler.getStringInput("Insira o complemento do Endereço: ");
            let zipCode: string = await this.inputHandler.getStringInput("Insira o CEP do Endereço: ");

            let newAddress = new Endereco(zipCode, street, number, extraInfo, city, state);

            resolve(newAddress);

        });
    }

    public async startAccountCreation(): Promise<Conta> {
        return this.inputHandler.getNumberInput("Escolha um tipo de conta para criar:\n1. Conta Corrente\n2. Conta Poupança\nInsira um comando: ").then(async (input) => {
            if (input == 1) {
                return this.startCheckingAccountCreation();
            } else if (input == 2) {
                return this.startSavingsAccountCreation();
            } else {
                console.log(">>> Comando inválido");
                return this.startAccountCreation();
            }
        });
    }

    private async startCheckingAccountCreation(): Promise<Conta> {
        console.log(">>> Criando Conta Corrente");

        let number: string = await this.inputHandler.getStringInput("Insira o número da Conta Corrente: ");
        let limit: number = await this.inputHandler.getNumberInput("Insira o limite da Conta Corrente: ");

        let newAccount = new ContaCorrente(number, limit);
        return Promise.resolve(newAccount);
    }

    private async startSavingsAccountCreation(): Promise<Conta> {
        console.log(">>> Criando Conta Poupança");

        let number = await this.inputHandler.getStringInput("Insira o número da Conta Poupança: ");

        let newAccount = new ContaPoupanca(number);
        return Promise.resolve(newAccount);
    }
}

export default FactoryRepository;