
import Conta from "../../../objects/abstract classes/Conta";
import Endereco from "../../../objects/classes/Endereco";
import InputHandler from "../../Commons/InputHandler";
import Operation from "../Abstract Operation/Operation";
import ClientMenuOperation from "./ClientMenuOperation";

class CreateClientOperation extends Operation {

    private _inputHandler: InputHandler = new InputHandler();

    public async runOperation(): Promise<Operation> {
        console.log("\n>>> Iniciando criação de Cliente");

        let clientName: string = await this._inputHandler.getStringInput("Insira o nome do Cliente: ");
        let cpf: string = await this._inputHandler.getStringInput("Insira o CPF do Cliente: ");
        let phone: string = await this._inputHandler.getStringInput("Insira o telefone do Cliente: ");
        let isVIP: boolean = await this._inputHandler.getBooleanInput("O Cliente é VIP? (s/n) ");

        console.log("\n>>> Criando Endereço inicial de Cliente");
        let initialAddress: Endereco = await this.createAddress();
        console.log(">>> Endereço inicial criado com sucesso");

        let numberOfAddresses: number = await this._inputHandler.getNumberInput("Insira o número de Endereços adicionais do Cliente: ");

        let additionalAddresses: Array<Endereco> = [];
        for (let i = 0; i < numberOfAddresses; i++) {
            console.log(`\n>>> Criando Endereço adicional ${i+1}/${numberOfAddresses}`);
            let newAddress: Endereco = await this.createAddress();

            additionalAddresses.push(newAddress);
            console.log(`>>> Endereço ${i+1}/${numberOfAddresses} criado com sucesso`);
        }

        console.log("\n>>> Criando Conta inicial do Cliente");
        let initialAccount: Conta = await this.createAccount();
        console.log(">>> Conta inicial criada com sucesso");

        let numberOfAccounts: number = await this._inputHandler.getNumberInput("Insira o número de Contas adicionais do Cliente: ");

        let additionalAccounts: Array<Conta> = [];
        for (let i = 0; i < numberOfAccounts; i++) {
            console.log(`\n>>> Criando Conta adicional ${i+1}/${numberOfAccounts}`);
            let newAccount: Conta = await this.createAccount();

            additionalAccounts.push(newAccount);
            console.log(`>>> Conta ${i+1}/${numberOfAccounts} criada com sucesso`);
        }

        this._dataManager.createClient(cpf, clientName, phone, isVIP, initialAddress, initialAccount, additionalAccounts, additionalAddresses);

        console.log(">>> Cliente criado com sucesso");

        return new ClientMenuOperation(this._dataManager);
    }

    private async createAddress(): Promise<Endereco> {
        let state: string = await this._inputHandler.getStringInput("Insira a Unidade Federativa do Endereço: ");
        let city: string = await this._inputHandler.getStringInput("Insira a cidade do Endereço: ");
        let street: string = await this._inputHandler.getStringInput("Insira o logradouro do Endereço: ");
        let number: string = await this._inputHandler.getStringInput("Insira o número do Endereço: ");
        let extraInfo: string = await this._inputHandler.getStringInput("Insira o complemento do Endereço: ");
        let zipCode: string = await this._inputHandler.getStringInput("Insira o CEP do Endereço: ");

        return this._dataManager.createAddress(zipCode, street, number, extraInfo, city, state);
    }

    private async createAccount(): Promise<Conta> {
        let accountInput = await this._inputHandler.getNumberInput("Escolha um tipo de conta para criar\n1. Conta Corrente\n2. Conta Poupança\nInsira um comando: ");

        if (accountInput == 1) {
            let number: string = await this._inputHandler.getStringInput("Insira o número da Conta: ");
            let limit: number = await this._inputHandler.getNumberInput("Insira o limite da Conta: ");
            
            return this._dataManager.createCheckingAccount(number, limit);
        } else if (accountInput == 2) {
            let number: string = await this._inputHandler.getStringInput("Insira o número da Conta: ");

            return this._dataManager.createSavingsAccount(number);
        } else {
            console.log(">>> Comando inválido. Insira 1 ou 2");
            return this.createAccount();
        }
    }

}

export default CreateClientOperation;