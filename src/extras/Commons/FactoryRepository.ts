
import Cargo from "../../objects/classes/Cargo";
import Cliente from "../../objects/classes/Cliente";
import Endereco from "../../objects/classes/Endereco";
import Conta from "../../objects/abstract classes/Conta";
import ContaCorrente from "../../objects/classes/ContaCorrente";
import Funcionario from "../../objects/classes/Funcionario";
import InputHandler from "./InputHandler";
import ContaPoupanca from "../../objects/classes/ContaPoupanca";

class FactoryRepository {

    private inputHandler: InputHandler = new InputHandler();

    public createEmployee(
        initialRole: Cargo, 
        cpf: string, 
        employeeName: string, 
        phone: string, 
        salary: number, 
        additionalRoles: Array<Cargo>
    ): Funcionario {
        let newEmployee = new Funcionario(initialRole, cpf, employeeName, phone, salary, additionalRoles);

        return newEmployee;
    }

    public createRole(roleName: string): Cargo {
        let newRole: Cargo = new Cargo(roleName);

        return newRole;
    }

    public async startClientCreation(): Promise<Cliente> {
        return new Promise<Cliente>(async (resolve) => {

            let clientName: string = await this.inputHandler.getStringInput("Insira o nome do Cliente: ");
            let cpf: string = await this.inputHandler.getStringInput("Insira o CPF do Cliente: ");
            let phone: string = await this.inputHandler.getStringInput("Insira o telefone do Cliente: ");
            let isVIP: boolean = await this.inputHandler.getBooleanInput("O Cliente é VIP? (s/n) ");

            let initialAddress: Endereco = await this.startAddressCreation("\n>>> Criando Endereço inicial do Cliente");

            let numberOfAddresses: number = await this.inputHandler.getNumberInput("Insira o número de Endereços adicionais do Cliente: ");

            let additionalAddresses: Array<Endereco> = [];

            for (let i = 0; i < numberOfAddresses; i++) {
                let newAddress: Endereco = await this.startAddressCreation(`\n>>> Criando Endereço adicional ${i+1}/${numberOfAddresses}`);

                additionalAddresses.push(newAddress);
            }

            let initialAccount: Conta = await this.startAccountCreation("\n>>> Criando Conta inicial do Cliente");

            let numberOfAccounts: number = await this.inputHandler.getNumberInput("Insira o número de Contas adicionais do Cliente: ");

            let additionalAccounts: Array<Conta> = [];

            for (let j = 0; j < numberOfAccounts; j++) {
                let newAccount: Conta = await this.startAccountCreation(`\n>>> Criando Conta adicional ${j+1}/${numberOfAccounts}`);

                additionalAccounts.push(newAccount);
            }

            let newClient = new Cliente(cpf, clientName, phone, isVIP, initialAddress, initialAccount, additionalAccounts, additionalAddresses);

            console.log(">>> Cliente criado com sucesso");

            resolve(newClient);
        });
    }

    public async startAddressCreation(startingMessage: string): Promise<Endereco> {
        return new Promise<Endereco>(async (resolve) => {

            console.log(startingMessage);

            let state: string = await this.inputHandler.getStringInput("Insira a Unidade Federativa do Endereço: ");
            let city: string = await this.inputHandler.getStringInput("Insira a cidade do Endereço: ");
            let street: string = await this.inputHandler.getStringInput("Insira o logradouro do Endereço: ");
            let number: string = await this.inputHandler.getStringInput("Insira o número do Endereço: ");
            let extraInfo: string = await this.inputHandler.getStringInput("Insira o complemento do Endereço: ");
            let zipCode: string = await this.inputHandler.getStringInput("Insira o CEP do Endereço: ");

            let newAddress = new Endereco(zipCode, street, number, extraInfo, city, state);

            console.log(">>> Endereço criado com sucesso");

            resolve(newAddress);

        });
    }

    public async startAccountCreation(startingMessage: string): Promise<Conta> {
        console.log(startingMessage);
        return this.inputHandler.getNumberInput("Escolha um tipo de conta para criar\n1. Conta Corrente\n2. Conta Poupança\nInsira um comando: ").then(async (input) => {
            if (input == 1) {
                return this.startCheckingAccountCreation();
            } else if (input == 2) {
                return this.startSavingsAccountCreation();
            } else {
                console.log(">>> Comando inválido");
                return this.startAccountCreation(startingMessage);
            }
        });
    }

    private async startCheckingAccountCreation(): Promise<Conta> {
        let number: string = await this.inputHandler.getStringInput("Insira o número da Conta Corrente: ");
        let limit: number = await this.inputHandler.getNumberInput("Insira o limite da Conta Corrente: ");

        let newAccount = new ContaCorrente(number, limit);

        console.log(">>> Conta Corrente criada com sucesso");

        return Promise.resolve(newAccount);
    }

    private async startSavingsAccountCreation(): Promise<Conta> {
        let number = await this.inputHandler.getStringInput("Insira o número da Conta Poupança: ");

        let newAccount = new ContaPoupanca(number);

        console.log(">>> Conta Poupança criada com sucesso");

        return Promise.resolve(newAccount);
    }
}

export default FactoryRepository;