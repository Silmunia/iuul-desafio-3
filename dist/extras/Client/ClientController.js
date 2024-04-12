"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cliente_1 = __importDefault(require("../../objects/classes/Cliente"));
const MenuRenderer_1 = __importDefault(require("../Commons/MenuRenderer"));
const ControllerState_1 = __importDefault(require("../Main/ControllerState"));
const InputHandler_1 = __importDefault(require("../Commons/InputHandler"));
const Endereco_1 = __importDefault(require("../../objects/classes/Endereco"));
const ContaCorrente_1 = __importDefault(require("../../objects/classes/ContaCorrente"));
const ContaPoupanca_1 = __importDefault(require("../../objects/classes/ContaPoupanca"));
const Conta_1 = __importDefault(require("../../objects/abstract classes/Conta"));
const ClientControllerState_1 = __importDefault(require("./ClientControllerState"));
const ClientControlParser_1 = __importDefault(require("./ClientControlParser"));
class ClientController {
    constructor(dataManager) {
        this.currentState = ClientControllerState_1.default.CLIENT_MENU;
        this.inputHandler = new InputHandler_1.default();
        this.menuRenderer = new MenuRenderer_1.default();
        this.controlParser = new ClientControlParser_1.default();
        this.dataManager = dataManager;
        let nilAddress = new Endereco_1.default("", "", "", "", "", "");
        let nilAccount = new ContaPoupanca_1.default("");
        this.clientInEditing = new Cliente_1.default("", "", "", false, nilAddress, nilAccount);
    }
    runClientCommands() {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this.currentState) {
                case ClientControllerState_1.default.RETURN_TO_MAIN:
                    return ControllerState_1.default.MAIN_MENU;
                case ClientControllerState_1.default.SHUTDOWN:
                    return ControllerState_1.default.SHUTDOWN;
                case ClientControllerState_1.default.RESET:
                    console.log(">>> Voltando ao Menu de Clientes");
                    this.currentState = ClientControllerState_1.default.CLIENT_MENU;
                    return this.runClientCommands();
                case ClientControllerState_1.default.CLIENT_MENU:
                case ClientControllerState_1.default.CLIENT_EDITING:
                case ClientControllerState_1.default.CLIENT_ADDRESS_MENU:
                case ClientControllerState_1.default.CLIENT_ACCOUNT_MENU:
                    this.displayMenu();
                    yield this.startCommandInput("Insira comando: ");
                    return this.runClientCommands();
                case ClientControllerState_1.default.CLIENT_LISTING:
                    this.dataManager.listClients();
                    if (this.dataManager.getClients().length === 0) {
                        console.log(">>> Voltando ao Menu de Clientes");
                        this.currentState = ClientControllerState_1.default.CLIENT_MENU;
                        return this.runClientCommands();
                    }
                    else {
                        this.currentState = ClientControllerState_1.default.CLIENT_SELECTION;
                        return this.runClientCommands();
                    }
                case ClientControllerState_1.default.CLIENT_SELECTION:
                    let selectedIndex = yield this.inputHandler.getNumberInput("Selecione um Cliente: ");
                    let parsedClientIndex = selectedIndex - 1;
                    if (parsedClientIndex >= 0
                        && parsedClientIndex < this.dataManager.getClients().length) {
                        console.log(`>>> Cliente ${selectedIndex} selecionado`);
                        this.dataManager.setEditedClient(parsedClientIndex);
                        let selectedClient = this.dataManager.getEditedClient();
                        if (selectedClient instanceof Cliente_1.default) {
                            this.clientInEditing = selectedClient;
                        }
                        else {
                            console.log(">>> Não foi possível encontrar o Cliente selecionado");
                        }
                        this.currentState = ClientControllerState_1.default.CLIENT_EDITING;
                    }
                    else {
                        console.log(">>> Cliente inválido");
                    }
                    return this.runClientCommands();
                case ClientControllerState_1.default.CLIENT_CREATION:
                    yield this.dataManager.addClient();
                    this.currentState = ClientControllerState_1.default.CLIENT_MENU;
                    return this.runClientCommands();
                case ClientControllerState_1.default.CLIENT_LISTING:
                    this.dataManager.listClients();
                    this.currentState = ClientControllerState_1.default.CLIENT_MENU;
                    return this.runClientCommands();
                case ClientControllerState_1.default.CLIENT_EDIT_LIST:
                    console.log(this.dataManager.listEditedClientInfo());
                    this.currentState = ClientControllerState_1.default.CLIENT_EDITING;
                    return this.runClientCommands();
                case ClientControllerState_1.default.CLIENT_EDIT_NAME:
                    console.log(`Nome atual do Cliente: ${this.clientInEditing.nome}`);
                    let newName = yield this.inputHandler.getStringInput("Insira o novo Nome do Cliente: ");
                    this.clientInEditing.nome = newName;
                    console.log(">>> Nome atualizado com sucesso");
                    this.currentState = ClientControllerState_1.default.CLIENT_EDITING;
                    return this.runClientCommands();
                case ClientControllerState_1.default.CLIENT_EDIT_PHONE:
                    console.log(`Telefone atual do Cliente: ${this.clientInEditing.telefone}`);
                    let newPhone = yield this.inputHandler.getStringInput("Insira o novo Telefone do Cliente: ");
                    this.clientInEditing.telefone = newPhone;
                    console.log(">>> Telefone atualizado com sucesso");
                    this.currentState = ClientControllerState_1.default.CLIENT_EDITING;
                    return this.runClientCommands();
                case ClientControllerState_1.default.CLIENT_EDIT_CPF:
                    console.log(`CPF atual do Cliente: ${this.clientInEditing.cpf}`);
                    let newCPF = yield this.inputHandler.getStringInput("Insira o novo CPF do Cliente: ");
                    this.clientInEditing.cpf = newCPF;
                    console.log(">>> CPF atualizado com sucesso");
                    this.currentState = ClientControllerState_1.default.CLIENT_EDITING;
                    return this.runClientCommands();
                case ClientControllerState_1.default.CLIENT_EDIT_VIP:
                    console.log(`Estado VIP atual do Cliente: ${this.clientInEditing.vip ? "VIP" : "Normal"}`);
                    let newVIP = yield this.inputHandler.getBooleanInput(`${this.clientInEditing.vip ? "O Cliente continua VIP? (s/n): " : "O Cliente se torna VIP? (s/n): "}`);
                    this.clientInEditing.vip = newVIP;
                    console.log(">>> Estado VIP atualizado com sucesso");
                    this.currentState = ClientControllerState_1.default.CLIENT_EDITING;
                    return this.runClientCommands();
                case ClientControllerState_1.default.CLIENT_ADDRESS_CREATION:
                    let addressCreationResult = yield this.dataManager.addAddressToEditedClient();
                    if (addressCreationResult) {
                        console.log(">>> Endereço adicionado com sucesso");
                    }
                    else {
                        console.log(">>> Não foi possível adicionar o novo Endereço ao Cliente selecionado");
                    }
                    this.currentState = ClientControllerState_1.default.CLIENT_ADDRESS_MENU;
                    return this.runClientCommands();
                case ClientControllerState_1.default.CLIENT_ADDRESS_REMOVAL:
                    console.log(">>> Listando Endereços do Cliente");
                    console.log(this.dataManager.listEditedClientAddresses());
                    let selectedAddress = yield this.inputHandler.getNumberInput("Insira o índice do Endereço a remover: ");
                    let parsedAddressIndex = selectedAddress - 1;
                    let addressRemovalResult = this.dataManager.removeEditedClientAddress(parsedAddressIndex);
                    if (addressRemovalResult) {
                        console.log(">>> Endereço removido com sucesso");
                    }
                    else {
                        console.log(">>> Não foi possível remover o Endereço selecionado");
                    }
                    this.currentState = ClientControllerState_1.default.CLIENT_ADDRESS_MENU;
                    return this.runClientCommands();
                case ClientControllerState_1.default.CLIENT_ADDRESS_LIST:
                    console.log(">>> Listando Endereços do Cliente");
                    console.log(this.dataManager.listEditedClientAddresses());
                    this.currentState = ClientControllerState_1.default.CLIENT_ADDRESS_MENU;
                    return this.runClientCommands();
                case ClientControllerState_1.default.CLIENT_ACCOUNT_LIST:
                    console.log(">>> Listando Contas do Cliente");
                    console.log(this.dataManager.listEditedClientAccounts());
                    this.currentState = ClientControllerState_1.default.CLIENT_ACCOUNT_MENU;
                    return this.runClientCommands();
                case ClientControllerState_1.default.CLIENT_ACCOUNT_DEPOSIT:
                    let accountDepositNumber = yield this.inputHandler.getStringInput("Insira o número da Conta recebedora do depósito: ");
                    let depositAccount = this.dataManager.getEditedClientAccount(accountDepositNumber);
                    if (depositAccount instanceof Conta_1.default) {
                        let depositValue = yield this.inputHandler.getNumberInput("Insira o valor do depósito: ");
                        depositAccount.depositar(depositValue);
                        console.log(">> Depósito realizado com sucesso");
                    }
                    else {
                        console.log(">>> Não foi possível encontrar uma Conta com o número inserido");
                    }
                    this.currentState = ClientControllerState_1.default.CLIENT_ACCOUNT_MENU;
                    return this.runClientCommands();
                case ClientControllerState_1.default.CLIENT_ACCOUNT_WITHDRAW:
                    let accountWithdrawNumber = yield this.inputHandler.getStringInput("Insira o número da Conta para fazer o saque: ");
                    let withdrawAccount = this.dataManager.getEditedClientAccount(accountWithdrawNumber);
                    if (withdrawAccount instanceof Conta_1.default) {
                        let withdrawValue = yield this.inputHandler.getNumberInput("Insira o valor do saque: ");
                        try {
                            if (withdrawAccount instanceof ContaCorrente_1.default) {
                                withdrawAccount.fazerSaque(withdrawValue);
                            }
                            else if (withdrawAccount instanceof ContaPoupanca_1.default) {
                                withdrawAccount.fazerSaque(withdrawValue);
                            }
                            console.log(">>> Saque realizado com sucesso");
                        }
                        catch (error) {
                            console.log(`>>> Não foi possível concluir o saque. ${error instanceof Error ? error.message : ""}`);
                        }
                    }
                    else {
                        console.log(">>> Não foi possível encontrar uma Conta com o número inserido");
                    }
                    this.currentState = ClientControllerState_1.default.CLIENT_ACCOUNT_MENU;
                    return this.runClientCommands();
                case ClientControllerState_1.default.CLIENT_ACCOUNT_BALANCE:
                    let accountBalanceNumber = yield this.inputHandler.getStringInput("Insira o número da Conta para calcular o saldo: ");
                    let balanceAccount = this.dataManager.getEditedClientAccount(accountBalanceNumber);
                    if (balanceAccount instanceof Conta_1.default) {
                        console.log(`>>> O saldo da conta é $${balanceAccount === null || balanceAccount === void 0 ? void 0 : balanceAccount.calcularSaldo()}`);
                    }
                    else {
                        console.log(">>> Não foi possível encontrar uma Conta com o número inserido");
                    }
                    this.currentState = ClientControllerState_1.default.CLIENT_ACCOUNT_MENU;
                    return this.runClientCommands();
                case ClientControllerState_1.default.CLIENT_ACCOUNT_TRANSFER:
                    let originAccountNumber = yield this.inputHandler.getStringInput("Insira o número da Conta de origem da transferência: ");
                    let originAccount = this.dataManager.getEditedClientAccount(originAccountNumber);
                    if (originAccount instanceof ContaCorrente_1.default) {
                        let targetAccountNumber = yield this.inputHandler.getStringInput("Insira o número da Conta de destino da transferência: ");
                        let targetAccount = this.dataManager.getTargetAccountForTransfer(targetAccountNumber);
                        if (targetAccount instanceof Conta_1.default) {
                            let transferValue = yield this.inputHandler.getNumberInput("Insira o valor a ser transferido: ");
                            try {
                                originAccount.transferir(targetAccount, transferValue);
                                console.log(">>> Transferência realizada com sucesso");
                            }
                            catch (error) {
                                console.log(`>>> Não foi possível concluir a transferência. ${error instanceof Error ? error.message : ""}`);
                            }
                        }
                        else {
                            console.log(`>>> Não foi possível encontrar uma Conta de destino com número ${targetAccountNumber}`);
                        }
                    }
                    else {
                        console.log(">>> Não é possível fazer transferências a partir de uma Conta Poupança");
                    }
                    this.currentState = ClientControllerState_1.default.CLIENT_ACCOUNT_MENU;
                    return this.runClientCommands();
                default:
                    console.log(">>> Comando desconhecido");
                    this.currentState = ClientControllerState_1.default.RESET;
                    return this.runClientCommands();
            }
        });
    }
    displayMenu() {
        let renderResult = this.menuRenderer.renderClientMenus(this.currentState);
        if (!renderResult) {
            console.log(">>> Menu desconhecido");
            console.log(">>> Voltando para o Menu de Clintes");
            this.currentState = ClientControllerState_1.default.CLIENT_MENU;
        }
    }
    startCommandInput(prompt) {
        return __awaiter(this, void 0, void 0, function* () {
            let receivedInput = yield this.inputHandler.getNumberInput(prompt);
            this.currentState = yield this.controlParser.parseInputForState(this.currentState, receivedInput);
        });
    }
}
exports.default = ClientController;
