
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
        await this.dataManager.addClient();
        return ClientControllerState.CLIENT_MENU;
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
            await this.dataManager.addAddressToEditedClient();

            console.log(">>> Endereço adicionado com sucesso");
        } catch (error) {
            console.log(`Falha na criação do Endereço. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
        }

        return ClientControllerState.CLIENT_ADDRESS_MENU;
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
                    console.log(`>>> Não foi possível concluir o saque. ${error instanceof Error ? error.message : ""}`);
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
            console.log(`>>> Falha na operação de saldo. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
        }
        
        return ClientControllerState.CLIENT_ACCOUNT_MENU;
    }

}

export default ClientOperator;