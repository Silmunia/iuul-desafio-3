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
const Conta_1 = __importDefault(require("../../objects/abstract classes/Conta"));
const ContaCorrente_1 = __importDefault(require("../../objects/classes/ContaCorrente"));
const ContaPoupanca_1 = __importDefault(require("../../objects/classes/ContaPoupanca"));
const Endereco_1 = __importDefault(require("../../objects/classes/Endereco"));
const ClientControllerState_1 = __importDefault(require("./ClientControllerState"));
const InputHandler_1 = __importDefault(require("../Commons/InputHandler"));
class ClientOperator {
    constructor(dataManager) {
        this.inputHandler = new InputHandler_1.default();
        this.dataManager = dataManager;
        let nilAddress = new Endereco_1.default("", "", "", "", "", "");
        let nilAccount = new ContaPoupanca_1.default("");
        this.clientInEditing = new Cliente_1.default("", "", "", false, nilAddress, nilAccount);
    }
    createClientOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dataManager.addClient();
            return ClientControllerState_1.default.CLIENT_MENU;
        });
    }
    listClientsOperation() {
        this.dataManager.listClients();
        if (this.dataManager.getClients().length === 0) {
            console.log(">>> Voltando ao Menu de Clientes");
            return ClientControllerState_1.default.CLIENT_MENU;
        }
        else {
            return ClientControllerState_1.default.CLIENT_SELECTION;
        }
    }
    listClientInfoOperation() {
        console.log(this.dataManager.listEditedClientInfo());
        return ClientControllerState_1.default.CLIENT_EDITING;
    }
    selectClientOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            let selectedIndex = yield this.inputHandler.getNumberInput("Selecione um Cliente: ");
            let parsedClientIndex = selectedIndex - 1;
            if (parsedClientIndex >= 0
                && parsedClientIndex < this.dataManager.getClients().length) {
                console.log(`>>> Cliente ${selectedIndex} selecionado`);
                this.dataManager.setEditedClient(parsedClientIndex);
                let selectedClient = this.dataManager.getEditedClient();
                if (selectedClient instanceof Cliente_1.default) {
                    this.clientInEditing = selectedClient;
                    return ClientControllerState_1.default.CLIENT_EDITING;
                }
                else {
                    console.log(">>> Não foi possível encontrar o Cliente selecionado");
                    return ClientControllerState_1.default.CLIENT_MENU;
                }
            }
            else {
                console.log(">>> Cliente inválido");
                return ClientControllerState_1.default.CLIENT_MENU;
            }
        });
    }
    editClientCpfOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`CPF atual do Cliente: ${this.clientInEditing.cpf}`);
            let newCPF = yield this.inputHandler.getStringInput("Insira o novo CPF do Cliente: ");
            this.clientInEditing.cpf = newCPF;
            console.log(">>> CPF atualizado com sucesso");
            return ClientControllerState_1.default.CLIENT_EDITING;
        });
    }
    editClientVipOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Estado VIP atual do Cliente: ${this.clientInEditing.vip ? "VIP" : "Normal"}`);
            let newVIP = yield this.inputHandler.getBooleanInput(`${this.clientInEditing.vip ? "O Cliente continua VIP? (s/n): " : "O Cliente se torna VIP? (s/n): "}`);
            this.clientInEditing.vip = newVIP;
            console.log(">>> Estado VIP atualizado com sucesso");
            return ClientControllerState_1.default.CLIENT_EDITING;
        });
    }
    editClientPhoneOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Telefone atual do Cliente: ${this.clientInEditing.telefone}`);
            let newPhone = yield this.inputHandler.getStringInput("Insira o novo Telefone do Cliente: ");
            this.clientInEditing.telefone = newPhone;
            console.log(">>> Telefone atualizado com sucesso");
            return ClientControllerState_1.default.CLIENT_EDITING;
        });
    }
    editClientNameOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Nome atual do Cliente: ${this.clientInEditing.nome}`);
            let newName = yield this.inputHandler.getStringInput("Insira o novo Nome do Cliente: ");
            this.clientInEditing.nome = newName;
            console.log(">>> Nome atualizado com sucesso");
            return ClientControllerState_1.default.CLIENT_EDITING;
        });
    }
    createClientAddressOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.dataManager.addAddressToEditedClient();
                console.log(">>> Endereço adicionado com sucesso");
            }
            catch (error) {
                console.log(`Falha na criação do Endereço. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
            }
            return ClientControllerState_1.default.CLIENT_ADDRESS_MENU;
        });
    }
    removeClientAddressOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(">>> Listando Endereços do Cliente");
            console.log(this.dataManager.listEditedClientAddresses());
            let selectedAddress = yield this.inputHandler.getNumberInput("Insira o índice do Endereço a remover: ");
            let parsedAddressIndex = selectedAddress - 1;
            try {
                this.dataManager.removeEditedClientAddress(parsedAddressIndex);
                console.log(">>> Endereço removido com sucesso");
            }
            catch (error) {
                console.log(`>>> Falha na remoção do Endereço. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
            }
            return ClientControllerState_1.default.CLIENT_ADDRESS_MENU;
        });
    }
    listClientAddressesOperation() {
        console.log(">>> Listando Endereços do Cliente");
        console.log(this.dataManager.listEditedClientAddresses());
        return ClientControllerState_1.default.CLIENT_ADDRESS_MENU;
    }
    listClientAccountsOperation() {
        console.log(">>> Listando Contas do Cliente");
        console.log(this.dataManager.listEditedClientAccounts());
        return ClientControllerState_1.default.CLIENT_ACCOUNT_MENU;
    }
    makeAccountDepositOperation() {
        return __awaiter(this, void 0, void 0, function* () {
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
            return ClientControllerState_1.default.CLIENT_ACCOUNT_MENU;
        });
    }
    makeAccountWithdrawOperation() {
        return __awaiter(this, void 0, void 0, function* () {
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
            return ClientControllerState_1.default.CLIENT_ACCOUNT_MENU;
        });
    }
    makeAccountBalanceOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            let accountBalanceNumber = yield this.inputHandler.getStringInput("Insira o número da Conta para calcular o saldo: ");
            let balanceAccount = this.dataManager.getEditedClientAccount(accountBalanceNumber);
            if (balanceAccount instanceof Conta_1.default) {
                console.log(`>>> O saldo da conta é $${balanceAccount === null || balanceAccount === void 0 ? void 0 : balanceAccount.calcularSaldo()}`);
            }
            else {
                console.log(">>> Não foi possível encontrar uma Conta com o número inserido");
            }
            return ClientControllerState_1.default.CLIENT_ACCOUNT_MENU;
        });
    }
    makeAccountTransferOperation() {
        return __awaiter(this, void 0, void 0, function* () {
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
            return ClientControllerState_1.default.CLIENT_ACCOUNT_MENU;
        });
    }
}
exports.default = ClientOperator;
