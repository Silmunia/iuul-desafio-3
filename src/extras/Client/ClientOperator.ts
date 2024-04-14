
import Cliente from "../../objects/classes/Cliente";
import Conta from "../../objects/abstract classes/Conta";
import ContaCorrente from "../../objects/classes/ContaCorrente";
import ContaPoupanca from "../../objects/classes/ContaPoupanca";
import Endereco from "../../objects/classes/Endereco";

import ClientControllerState from "./ClientControllerState";
import DataManager from "../Commons/DataManager";
import InputHandler from "../Commons/InputHandler";

class ClientOperator {

    private clientInEditing: Cliente;
    private dataManager: DataManager;
    private inputHandler: InputHandler = new InputHandler();

    constructor(dataManager: DataManager) {
        this.dataManager = dataManager;

        let nilAddress = new Endereco("", "", "", "", "", "");
        let nilAccount = new ContaPoupanca("");
        this.clientInEditing = new Cliente("", "", "", false, nilAddress, nilAccount);
    }

    public async createClientOperation(): Promise<ClientControllerState> {
        console.log("\n>>> Iniciando criação de Cliente");

        let clientName: string = await this.inputHandler.getStringInput("Insira o nome do Cliente: ");
        let cpf: string = await this.inputHandler.getStringInput("Insira o CPF do Cliente: ");
        let phone: string = await this.inputHandler.getStringInput("Insira o telefone do Cliente: ");
        let isVIP: boolean = await this.inputHandler.getBooleanInput("O Cliente é VIP? (s/n) ");

        console.log("\n>>> Criando Endereço inicial de Cliente");
        let initialAddress: Endereco = await this.createAddressOperation();
        console.log(">>> Endereço inicial criado com sucesso");

        let numberOfAddresses: number = await this.inputHandler.getNumberInput("Insira o número de Endereços adicionais do Cliente: ");

        let additionalAddresses: Array<Endereco> = [];
        for (let i = 0; i < numberOfAddresses; i++) {
            console.log(`\n>>> Criando Endereço adicional ${i+1}/${numberOfAddresses}`);
            let newAddress: Endereco = await this.createAddressOperation();

            additionalAddresses.push(newAddress);
            console.log(`>>> Endereço ${i+1}/${numberOfAddresses} criado com sucesso`);
        }

        console.log("\n>>> Criando Conta inicial do Cliente");
        let initialAccount: Conta = await this.createAccountOperation();
        console.log(">>> Conta inicial criada com sucesso");

        let numberOfAccounts: number = await this.inputHandler.getNumberInput("Insira o número de Contas adicionais do Cliente: ");

        let additionalAccounts: Array<Conta> = [];
        for (let i = 0; i < numberOfAccounts; i++) {
            console.log(`\n>>> Criando Conta adicional ${i+1}/${numberOfAccounts}`);
            let newAccount: Conta = await this.createAccountOperation();

            additionalAccounts.push(newAccount);
            console.log(`>>> Conta ${i+1}/${numberOfAccounts} criada com sucesso`);
        }

        this.dataManager.createClient(cpf, clientName, phone, isVIP, initialAddress, initialAccount, additionalAccounts, additionalAddresses);

        console.log(">>> Cliente criado com sucesso");

        return ClientControllerState.CLIENT_MENU;
    }

    private async createAddressOperation(): Promise<Endereco> {
        let state: string = await this.inputHandler.getStringInput("Insira a Unidade Federativa do Endereço: ");
        let city: string = await this.inputHandler.getStringInput("Insira a cidade do Endereço: ");
        let street: string = await this.inputHandler.getStringInput("Insira o logradouro do Endereço: ");
        let number: string = await this.inputHandler.getStringInput("Insira o número do Endereço: ");
        let extraInfo: string = await this.inputHandler.getStringInput("Insira o complemento do Endereço: ");
        let zipCode: string = await this.inputHandler.getStringInput("Insira o CEP do Endereço: ");

        return this.dataManager.createAddress(zipCode, street, number, extraInfo, city, state);
    }

    private async createAccountOperation(): Promise<Conta> {
        let accountInput = await this.inputHandler.getNumberInput("Escolha um tipo de conta para criar\n1. Conta Corrente\n2. Conta Poupança\nInsira um comando: ");

        let number: string = await this.inputHandler.getStringInput("Insira o número da Conta: ");

        if (accountInput == 1) {
            let limit: number = await this.inputHandler.getNumberInput("Insira o limite da Conta: ");
            
            return this.dataManager.createCheckingAccount(number, limit);
        } else if (accountInput == 2) {
            return this.dataManager.createSavingsAccount(number);
        } else {
            console.log(">>> Comando inválido. Insira 1 ou 2");
            return this.createAccountOperation();
        }
    }

    public listClientsOperation(): ClientControllerState {
        console.log("\n>>> Listando Clientes");
        console.log(this.dataManager.listClients());
        if (this.dataManager.getClients().length === 0) {
            console.log(">>> Voltando ao Menu de Clientes");
            return ClientControllerState.CLIENT_MENU;
        } else {
            return ClientControllerState.CLIENT_SELECTION;
        }
    }

    public listClientInfoOperation(): ClientControllerState {
        console.log("\n>>> Listando informações do Cliente");
        console.log(this.dataManager.listEditedClientInfo());
        return ClientControllerState.CLIENT_EDITING;
    }

    public async selectClientOperation(): Promise<ClientControllerState> {
        let selectedIndex = await this.inputHandler.getNumberInput("Selecione um Cliente: ");
        let parsedClientIndex = selectedIndex - 1;
        if (parsedClientIndex >= 0 
            && parsedClientIndex < this.dataManager.getClients().length) {
            console.log(`>>> Cliente ${selectedIndex} selecionado`);
            this.dataManager.setEditedClient(parsedClientIndex);
            let selectedClient = this.dataManager.getEditedClient();
            if (selectedClient instanceof Cliente) {
                this.clientInEditing = selectedClient;
                return ClientControllerState.CLIENT_EDITING;
            } else {
                console.log(">>> Não foi possível encontrar o Cliente selecionado");
                return ClientControllerState.CLIENT_MENU;
            }
            
        } else {
            console.log(">>> Cliente inválido");
            return ClientControllerState.CLIENT_MENU;
        }
    }

    public async editClientCpfOperation(): Promise<ClientControllerState> {
        console.log("\n>>> Editando CPF do Cliente");
        console.log(`CPF atual: ${this.clientInEditing.cpf}`);
        let newCPF = await this.inputHandler.getStringInput("Insira o novo CPF do Cliente: ");
        this.clientInEditing.cpf = newCPF;
        console.log(">>> CPF atualizado com sucesso");
        return ClientControllerState.CLIENT_EDITING;
    }

    public async editClientVipOperation(): Promise<ClientControllerState> {
        console.log("\n>>> Editando estado VIP do Cliente");
        console.log(`Estado VIP atual: ${this.clientInEditing.vip ? "VIP" : "Normal"}`);
        let newVIP = await this.inputHandler.getBooleanInput(`${this.clientInEditing.vip ? "O Cliente continua VIP? (s/n): " : "O Cliente se torna VIP? (s/n): "}`);
        this.clientInEditing.vip = newVIP;
        console.log(">>> Estado VIP atualizado com sucesso");
        return ClientControllerState.CLIENT_EDITING;
    }

    public async editClientPhoneOperation(): Promise<ClientControllerState> {
        console.log("\n>>> Editando Telefone do Cliente");
        console.log(`Telefone atual: ${this.clientInEditing.telefone}`);
        let newPhone = await this.inputHandler.getStringInput("Insira o novo Telefone do Cliente: ");
        this.clientInEditing.telefone = newPhone;
        console.log(">>> Telefone atualizado com sucesso");
        return ClientControllerState.CLIENT_EDITING;
    }

    public async editClientNameOperation(): Promise<ClientControllerState> {
        console.log("\n>>> Editando Nome do Cliente");
        console.log(`Nome atual: ${this.clientInEditing.nome}`);
        let newName = await this.inputHandler.getStringInput("Insira o novo Nome do Cliente: ");
        this.clientInEditing.nome = newName;
        console.log(">>> Nome atualizado com sucesso");
        return ClientControllerState.CLIENT_EDITING;
    }

    public async createClientAddressOperation(): Promise<ClientControllerState> {
        try {
            console.log("\n>>> Iniciando criação de novo Endereço");
            let newAddress = await this.createAddressOperation();
            
            this.dataManager.addAddressToEditedClient(newAddress);

            console.log(">>> Endereço adicionado com sucesso");
        } catch (error) {
            console.log(`Falha na criação do Endereço. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
        }

        return ClientControllerState.CLIENT_ADDRESS_MENU;
    }

    public async createClientAccountOperation(): Promise<ClientControllerState> {
        try {
            console.log("\n>>> Iniciando criação de nova Conta");
            let newAccount = await this.createAccountOperation();

            this.dataManager.addAccountToEditedClient(newAccount);

            console.log(">>> Conta adicionada com sucesso");
        } catch (error) {
            console.log(`Falha na criação da Conta. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
        }

        return ClientControllerState.CLIENT_ACCOUNT_MENU;
    }

    public async removeClientAccountOperation(): Promise<ClientControllerState> {
        
        if (this.clientInEditing.contas.length === 1) {
            console.log("\n>>> O Cliente possui apenas uma Conta, portanto não é possível remover Contas");
            console.log(">>> Voltando para o Menu de Editar Contas");

            return ClientControllerState.CLIENT_ACCOUNT_MENU;
        } else {
            console.log("\n>>> Listando Contas do Cliente");
            let clientAccounts = this.dataManager.listEditedClientAccounts();

            if (clientAccounts === "") {
                console.log(">>> ERRO FATAL: O Cliente não possui nenhuma Conta");
                console.log(">>> O programa será encerrado");
                return ClientControllerState.SHUTDOWN;
            } else {
                console.log(clientAccounts);
                let selectedAccount = await this.inputHandler.getNumberInput("Insira o índice da Conta a remover: ");
                let parsedAccountIndex = selectedAccount-1;

                try {
                    this.dataManager.removeEditedClientAccount(parsedAccountIndex);

                    console.log(">>> Conta removida com sucesso");
                } catch (error) {
                    console.log(`>>> Falha na remoção da Conta. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
                }

                return ClientControllerState.CLIENT_ACCOUNT_MENU;
            }
        }
    }

    public async removeClientAddressOperation(): Promise<ClientControllerState> {
        
        if (this.clientInEditing.enderecos.length === 1) {
            console.log("\n>>> O Cliente possui apenas um Endereço, portanto não é possível remover Endereços");
            console.log(">>> Voltando para o Menu de Editar Endereços");

            return ClientControllerState.CLIENT_ADDRESS_MENU;
        } else {
            console.log("\n>>> Listando Endereços do Cliente");
            let clientAddresses = this.dataManager.listEditedClientAddresses();

            if (clientAddresses === "") {
                console.log(">>> ERRO FATAL: O Cliente não possui nenhum Endereço");
                console.log(">>> O programa será encerrado");
                return ClientControllerState.SHUTDOWN;
            } else {
                console.log(clientAddresses);
                let selectedAddress = await this.inputHandler.getNumberInput("Insira o índice do Endereço a remover: ");
                let parsedAddressIndex = selectedAddress-1;

                try {
                    this.dataManager.removeEditedClientAddress(parsedAddressIndex);

                    console.log(">>> Endereço removido com sucesso");
                } catch (error) {
                    console.log(`>>> Falha na remoção do Endereço. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
                }

                return ClientControllerState.CLIENT_ADDRESS_MENU;
            }
        }
    }

    public listClientAddressesOperation(): ClientControllerState {
        console.log("\n>>> Listando Endereços do Cliente");
        console.log(this.dataManager.listEditedClientAddresses());
        return ClientControllerState.CLIENT_ADDRESS_MENU;
    }

    public listClientAccountsOperation(): ClientControllerState {
        console.log("\n>>> Listando Contas do Cliente");
        console.log(this.dataManager.listEditedClientAccounts());
        return ClientControllerState.CLIENT_ACCOUNT_MENU;
    }

    public async makeAccountDepositOperation(): Promise<ClientControllerState> {
        console.log("\n>>> Iniciando depósito");
        let accountDepositNumber = await this.inputHandler.getStringInput("Insira o número da Conta recebedora do depósito: ");

        try {
            let depositAccount = this.dataManager.getEditedClientAccount(accountDepositNumber);

            if (depositAccount instanceof Conta) {
                let depositValue = await this.inputHandler.getNumberInput("Insira o valor do depósito: ");

                depositAccount.depositar(depositValue);

                console.log(">>> Depósito realizado com sucesso");
            } else {
                console.log(">>> Não foi possível encontrar uma Conta com o número inserido");
            }
        } catch (error) {
            console.log(`>>> Falha na operação de depósito. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
        }

        return ClientControllerState.CLIENT_ACCOUNT_MENU;
    }

    public async makeAccountWithdrawOperation(): Promise<ClientControllerState> {
        console.log("\n>>> Iniciando saque");
        let accountWithdrawNumber = await this.inputHandler.getStringInput("Insira o número da Conta para fazer o saque: ");

        try {
            let withdrawAccount = this.dataManager.getEditedClientAccount(accountWithdrawNumber);

            if (withdrawAccount instanceof Conta) {
                let withdrawValue = await this.inputHandler.getNumberInput("Insira o valor do saque: ");
                try {
                    if (withdrawAccount instanceof ContaCorrente) {
                        withdrawAccount.fazerSaque(withdrawValue);
                    } else if (withdrawAccount instanceof ContaPoupanca) {
                        withdrawAccount.fazerSaque(withdrawValue);
                    }
                    console.log(">>> Saque realizado com sucesso");
                } catch (error) {
                    console.log(`>>> Falha na operação de saque. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
                }
            } else {
                console.log(">>> Não foi possível encontrar uma Conta com o número inserido");
            }
        } catch (error) {
            console.log(`>>> Falha na operação de saque. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
        }

        return ClientControllerState.CLIENT_ACCOUNT_MENU;
    }

    public async makeAccountBalanceOperation(): Promise<ClientControllerState> {
        console.log("\n>>> Iniciando cálculo de saldo");
        let accountBalanceNumber = await this.inputHandler.getStringInput("Insira o número da Conta para calcular o saldo: ");

        try {
            let balanceAccount = this.dataManager.getEditedClientAccount(accountBalanceNumber);

            if (balanceAccount instanceof Conta) {
                console.log(`>>> O saldo da conta é $${balanceAccount?.calcularSaldo()}`);
            } else {
                console.log(">>> Não foi possível encontrar uma Conta com o número inserido");
            }
        } catch (error) {
            console.log(`>>> Falha na operação de saldo. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
        }

        return ClientControllerState.CLIENT_ACCOUNT_MENU;
    }

    public async makeAccountTransferOperation(): Promise<ClientControllerState> {
        console.log("\n>>> Iniciando transferência");
        let originAccountNumber = await this.inputHandler.getStringInput("Insira o número da Conta de origem da transferência: ");

        try {
            let originAccount = this.dataManager.getEditedClientAccount(originAccountNumber);

            if (originAccount instanceof ContaCorrente) {
                let targetAccountNumber = await this.inputHandler.getStringInput("Insira o número da Conta de destino da transferência: ");
                let targetAccount = this.dataManager.getTargetAccountForTransfer(targetAccountNumber);
                if (targetAccount instanceof Conta) {
    
                    let transferValue = await this.inputHandler.getNumberInput("Insira o valor a ser transferido: ");
    
                    try {
                        originAccount.transferir(targetAccount, transferValue);
                        console.log(">>> Transferência realizada com sucesso");
                    } catch (error) {
                        console.log(`>>> Não foi possível concluir a transferência. ${error instanceof Error ? error.message : ""}`);
                    }
                } else {
                    console.log(`>>> Não foi possível encontrar uma Conta de destino com número ${targetAccountNumber}`);
                }
            } else {
                console.log(">>> Não é possível fazer transferências a partir de uma Conta Poupança");
            }
        } catch (error) {
            console.log(`>>> Falha na operação de transfer. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
        }
        
        return ClientControllerState.CLIENT_ACCOUNT_MENU;
    }

}

export default ClientOperator;