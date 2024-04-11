
import Cliente from "../objects/classes/Cliente";
import MenuRenderer from "./MenuRenderer";
import ControllerState from "./ControllerState";
import InputHandler from "./InputHandler";
import DataManager from "./DataManager";
import Endereco from "../objects/classes/Endereco";
import ContaCorrente from "../objects/classes/ContaCorrente";
import ContaPoupanca from "../objects/classes/ContaPoupanca";
import Conta from "../objects/abstract classes/Conta";

class ClientController {
    private clientInEditing: Cliente;
    private dataManager: DataManager;
    private currentState: ControllerState;
    private inputHandler: InputHandler = new InputHandler();
    private menuRenderer: MenuRenderer = new MenuRenderer();

    constructor(initialState: ControllerState, dataManager: DataManager) {
        this.currentState = initialState
        this.dataManager = dataManager;

        let nilAddress = new Endereco("", "", "", "", "", "");
        let nilAccount = new ContaPoupanca("");
        this.clientInEditing = new Cliente("", "", "", false, nilAddress, nilAccount);
    }

    public async runClientCommands(): Promise<ControllerState> {
        switch(this.currentState) {
            case ControllerState.MAIN_MENU:
            case ControllerState.SHUTDOWN:
                return this.currentState;
            case ControllerState.RESET:
                console.log(">>> Voltando ao Menu de Clientes");
                this.currentState = ControllerState.CLIENT_MENU;
                return this.runClientCommands();
            case ControllerState.CLIENT_MENU:
            case ControllerState.CLIENT_EDITING:
            case ControllerState.CLIENT_ADDRESS_MENU:
            case ControllerState.CLIENT_ACCOUNT_MENU:
                this.displayMenu();
                await this.startCommandInput("Insira comando: ");
                return this.runClientCommands();
            case ControllerState.CLIENT_LISTING:
                this.dataManager.listClients();
                if (this.dataManager.getClients().length === 0) {
                    console.log(">>> Voltando ao Menu de Clientes");
                    this.currentState = ControllerState.CLIENT_MENU;
                    return this.runClientCommands();
                } else {
                    this.currentState = ControllerState.CLIENT_SELECTION;
                    return this.runClientCommands();
                }
            case ControllerState.CLIENT_SELECTION:
                let selectedIndex = await this.inputHandler.getNumberInput("Selecione um Cliente: ");
                let parsedClientIndex = selectedIndex - 1;
                if (parsedClientIndex >= 0 
                    && parsedClientIndex < this.dataManager.getClients().length) {
                    console.log(`>>> Cliente ${selectedIndex} selecionado`);
                    this.dataManager.setEditedClient(parsedClientIndex);
                    let selectedClient = this.dataManager.getEditedClient();
                    if (selectedClient instanceof Cliente) {
                        this.clientInEditing = selectedClient;
                    } else {
                        console.log(">>> Não foi possível encontrar o Cliente selecionado");
                    }
                    this.currentState = ControllerState.CLIENT_EDITING;
                } else {
                    console.log(">>> Cliente inválido");
                }
                return this.runClientCommands();
            case ControllerState.CLIENT_CREATION:
                await this.dataManager.addClient();
                this.currentState = ControllerState.CLIENT_MENU;
                return this.runClientCommands();
            case ControllerState.CLIENT_LISTING:
                this.dataManager.listClients();
                this.currentState = ControllerState.CLIENT_MENU;
                return this.runClientCommands();
            case ControllerState.CLIENT_EDIT_LIST:
                console.log(this.dataManager.listEditedClientInfo());
                this.currentState = ControllerState.CLIENT_EDITING;
                return this.runClientCommands();
            case ControllerState.CLIENT_EDIT_NAME:
                console.log(`Nome atual do Cliente: ${this.clientInEditing.nome}`);
                let newName = await this.inputHandler.getStringInput("Insira o novo Nome do Cliente: ");
                this.clientInEditing.nome = newName;
                console.log(">>> Nome atualizado com sucesso");
                this.currentState = ControllerState.CLIENT_EDITING;
                return this.runClientCommands();
            case ControllerState.CLIENT_EDIT_PHONE:
                console.log(`Telefone atual do Cliente: ${this.clientInEditing.telefone}`);
                let newPhone = await this.inputHandler.getStringInput("Insira o novo Telefone do Cliente: ");
                this.clientInEditing.telefone = newPhone;
                console.log(">>> Telefone atualizado com sucesso");
                this.currentState = ControllerState.CLIENT_EDITING;
                return this.runClientCommands();
            case ControllerState.CLIENT_EDIT_CPF:
                console.log(`CPF atual do Cliente: ${this.clientInEditing.cpf}`);
                let newCPF = await this.inputHandler.getStringInput("Insira o novo CPF do Cliente: ");
                this.clientInEditing.cpf = newCPF;
                console.log(">>> CPF atualizado com sucesso");
                this.currentState = ControllerState.CLIENT_EDITING;
                return this.runClientCommands();
            case ControllerState.CLIENT_EDIT_VIP:
                console.log(`Estado VIP atual do Cliente: ${this.clientInEditing.vip ? "VIP" : "Normal"}`);
                let newVIP = await this.inputHandler.getBooleanInput(`${this.clientInEditing.vip ? "O Cliente continua VIP? (s/n): " : "O Cliente se torna VIP? (s/n): "}`);
                this.clientInEditing.vip = newVIP;
                console.log(">>> Estado VIP atualizado com sucesso");
                this.currentState = ControllerState.CLIENT_EDITING;
                return this.runClientCommands();
            case ControllerState.CLIENT_ADDRESS_CREATION:
                let addressCreationResult = await this.dataManager.addAddressToEditedClient();
                if (addressCreationResult) {
                    console.log(">>> Endereço adicionado com sucesso");
                } else {
                    console.log(">>> Não foi possível adicionar o novo Endereço ao Cliente selecionado");
                }
                this.currentState = ControllerState.CLIENT_ADDRESS_MENU;
                return this.runClientCommands();
            case ControllerState.CLIENT_ADDRESS_REMOVAL:
                console.log(">>> Listando Endereços do Cliente");
                console.log(this.dataManager.listEditedClientAddresses());
                let selectedAddress = await this.inputHandler.getNumberInput("Insira o índice do Endereço a remover: ");
                let parsedAddressIndex = selectedAddress-1;
                let addressRemovalResult = this.dataManager.removeEditedClientAddress(parsedAddressIndex);
                if (addressRemovalResult) {
                    console.log(">>> Endereço removido com sucesso");
                } else {
                    console.log(">>> Não foi possível remover o Endereço selecionado");
                }
                this.currentState = ControllerState.CLIENT_ADDRESS_MENU;
                return this.runClientCommands();
            case ControllerState.CLIENT_ADDRESS_LIST:
                console.log(">>> Listando Endereços do Cliente");
                console.log(this.dataManager.listEditedClientAddresses());
                this.currentState = ControllerState.CLIENT_ADDRESS_MENU;
                return this.runClientCommands();
            case ControllerState.CLIENT_ACCOUNT_LIST:
                console.log(">>> Listando Contas do Cliente");
                console.log(this.dataManager.listEditedClientAccounts());
                this.currentState = ControllerState.CLIENT_ACCOUNT_MENU;
                return this.runClientCommands();
            case ControllerState.CLIENT_ACCOUNT_DEPOSIT:
                let accountDepositNumber = await this.inputHandler.getStringInput("Insira o número da Conta recebedora do depósito: ");
                let depositAccount = this.dataManager.getEditedClientAccount(accountDepositNumber);
                if (depositAccount instanceof Conta) {
                    let depositValue = await this.inputHandler.getNumberInput("Insira o valor do depósito: ");
                    depositAccount.depositar(depositValue);
                    console.log(">> Depósito realizado com sucesso");
                } else {
                    console.log(">>> Não foi possível encontrar uma Conta com o número inserido");
                }
                this.currentState = ControllerState.CLIENT_ACCOUNT_MENU;
                return this.runClientCommands();
            case ControllerState.CLIENT_ACCOUNT_WITHDRAW:
                let accountWithdrawNumber = await this.inputHandler.getStringInput("Insira o número da Conta para fazer o saque: ");
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
                this.currentState = ControllerState.CLIENT_ACCOUNT_MENU;
                return this.runClientCommands();
            case ControllerState.CLIENT_ACCOUNT_BALANCE:
                let accountBalanceNumber = await this.inputHandler.getStringInput("Insira o número da Conta para calcular o saldo: ");
                let balanceAccount = this.dataManager.getEditedClientAccount(accountBalanceNumber);
                if (balanceAccount instanceof Conta) {
                    console.log(`>>> O saldo da conta é $${balanceAccount?.calcularSaldo()}`);
                } else {
                    console.log(">>> Não foi possível encontrar uma Conta com o número inserido");
                }
                this.currentState = ControllerState.CLIENT_ACCOUNT_MENU;
                return this.runClientCommands();
            case ControllerState.CLIENT_ACCOUNT_TRANSFER:
                let originAccountNumber = await this.inputHandler.getStringInput("Insira o número da Conta de origem da transferência: ");
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
                this.currentState = ControllerState.CLIENT_ACCOUNT_MENU;
                return this.runClientCommands();
            default:
                console.log(">>> Comando desconhecido");
                this.currentState = ControllerState.RESET;
                return this.runClientCommands();
        }
    }

    private displayMenu() {
        let renderResult = this.menuRenderer.renderClientMenus(this.currentState);

        if (!renderResult) {
            console.log(">>> Menu desconhecido");
            console.log(">>> Voltando para o Menu de Clintes");
            this.currentState = ControllerState.CLIENT_MENU;
        }
    }

    private async startCommandInput(prompt: string) {
        let receivedInput = await this.inputHandler.getNumberInput(prompt);
        await this.parseInputForState(receivedInput);
    }

    private async parseInputForState(input: number) {
        switch(this.currentState) {
            case ControllerState.CLIENT_MENU:
                switch(input) {
                    case ControllerState.CLIENT_CREATION:
                        this.currentState = ControllerState.CLIENT_CREATION;
                        break;
                    case ControllerState.CLIENT_LISTING:
                        this.currentState = ControllerState.CLIENT_LISTING;
                        break;
                    case ControllerState.MAIN_MENU:
                        this.currentState = ControllerState.MAIN_MENU;
                        break;
                    case ControllerState.SHUTDOWN:
                        this.currentState = ControllerState.SHUTDOWN;
                        break;
                    default:
                        console.log(">>> Comando desconhecido");
                }
                break;
            case ControllerState.CLIENT_EDITING:
                switch (input) {
                    case ControllerState.CLIENT_EDIT_LIST:
                        this.currentState = ControllerState.CLIENT_EDIT_LIST;
                        break;
                    case ControllerState.CLIENT_EDIT_NAME:
                        this.currentState = ControllerState.CLIENT_EDIT_NAME;
                        break;
                    case ControllerState.CLIENT_EDIT_PHONE:
                        this.currentState = ControllerState.CLIENT_EDIT_PHONE;
                        break;
                    case ControllerState.CLIENT_EDIT_CPF:
                        this.currentState = ControllerState.CLIENT_EDIT_CPF;
                        break;
                    case ControllerState.CLIENT_EDIT_VIP:
                        this.currentState = ControllerState.CLIENT_EDIT_VIP;
                        break;
                    case ControllerState.CLIENT_ADDRESS_MENU:
                        this.currentState = ControllerState.CLIENT_ADDRESS_MENU;
                        break;
                    case ControllerState.CLIENT_ACCOUNT_MENU:
                        this.currentState = ControllerState.CLIENT_ACCOUNT_MENU;
                        break;
                    case ControllerState.MAIN_MENU:
                        this.currentState = ControllerState.MAIN_MENU;
                        break;
                    case ControllerState.SHUTDOWN:
                        this.currentState = ControllerState.SHUTDOWN;
                        break;
                    default:
                        console.log(">>> Comando desconhecido");
                }
                break;
            case ControllerState.CLIENT_ADDRESS_MENU:
                switch (input) {
                    case ControllerState.CLIENT_ADDRESS_CREATION:
                        this.currentState = ControllerState.CLIENT_ADDRESS_CREATION;
                        break;
                    case ControllerState.CLIENT_ADDRESS_REMOVAL:
                        this.currentState = ControllerState.CLIENT_ADDRESS_REMOVAL;
                        break;
                    case ControllerState.CLIENT_ADDRESS_LIST:
                        this.currentState = ControllerState.CLIENT_ADDRESS_LIST;
                        break;
                    case ControllerState.CLIENT_EDITING:
                        this.currentState = ControllerState.CLIENT_EDITING;
                        break;
                    case ControllerState.MAIN_MENU:
                        this.currentState = ControllerState.MAIN_MENU;
                        break;
                    case ControllerState.SHUTDOWN:
                        this.currentState = ControllerState.SHUTDOWN;
                        break;
                    default:
                        console.log(">>> Comando desconhecido");
                }
                break;
            case ControllerState.CLIENT_ACCOUNT_MENU:
                switch(input) {
                    case ControllerState.CLIENT_ACCOUNT_LIST:
                        this.currentState = ControllerState.CLIENT_ACCOUNT_LIST;
                        break;
                    case ControllerState.CLIENT_ACCOUNT_WITHDRAW:
                        this.currentState = ControllerState.CLIENT_ACCOUNT_WITHDRAW;
                        break;
                    case ControllerState.CLIENT_ACCOUNT_TRANSFER:
                        this.currentState = ControllerState.CLIENT_ACCOUNT_TRANSFER;
                        break;
                    case ControllerState.CLIENT_ACCOUNT_DEPOSIT:
                        this.currentState = ControllerState.CLIENT_ACCOUNT_DEPOSIT;
                        break;
                    case ControllerState.CLIENT_ACCOUNT_BALANCE:
                        this.currentState = ControllerState.CLIENT_ACCOUNT_BALANCE;
                        break;
                    case ControllerState.CLIENT_EDITING:
                        this.currentState = ControllerState.CLIENT_EDITING;
                        break;
                    case ControllerState.MAIN_MENU:
                        this.currentState = ControllerState.MAIN_MENU;
                        break;
                    case ControllerState.SHUTDOWN:
                        this.currentState = ControllerState.SHUTDOWN;
                        break;
                    default:
                        console.log(">>> Comando desconhecido");
                }
                break;
            default:
                console.log(">>> Comando desconhecido");
                this.currentState = ControllerState.RESET;
        }
    }
}

export default ClientController;