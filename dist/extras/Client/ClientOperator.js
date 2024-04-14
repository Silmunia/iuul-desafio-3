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
            console.log("\n>>> Iniciando criação de Cliente");
            let clientName = yield this.inputHandler.getStringInput("Insira o nome do Cliente: ");
            let cpf = yield this.inputHandler.getStringInput("Insira o CPF do Cliente: ");
            let phone = yield this.inputHandler.getStringInput("Insira o telefone do Cliente: ");
            let isVIP = yield this.inputHandler.getBooleanInput("O Cliente é VIP? (s/n) ");
            console.log("\n>>> Criando Endereço inicial de Cliente");
            let initialAddress = yield this.createAddressOperation();
            console.log(">>> Endereço inicial criado com sucesso");
            let numberOfAddresses = yield this.inputHandler.getNumberInput("Insira o número de Endereços adicionais do Cliente: ");
            let additionalAddresses = [];
            for (let i = 0; i < numberOfAddresses; i++) {
                console.log(`\n>>> Criando Endereço adicional ${i + 1}/${numberOfAddresses}`);
                let newAddress = yield this.createAddressOperation();
                additionalAddresses.push(newAddress);
                console.log(`>>> Endereço ${i + 1}/${numberOfAddresses} criado com sucesso`);
            }
            console.log("\n>>> Criando Conta inicial do Cliente");
            let initialAccount = yield this.createAccountOperation();
            console.log(">>> Conta inicial criada com sucesso");
            let numberOfAccounts = yield this.inputHandler.getNumberInput("Insira o número de Contas adicionais do Cliente: ");
            let additionalAccounts = [];
            for (let i = 0; i < numberOfAccounts; i++) {
                console.log(`\n>>> Criando Conta adicional ${i + 1}/${numberOfAccounts}`);
                let newAccount = yield this.createAccountOperation();
                additionalAccounts.push(newAccount);
                console.log(`>>> Conta ${i + 1}/${numberOfAccounts} criada com sucesso`);
            }
            this.dataManager.createClient(cpf, clientName, phone, isVIP, initialAddress, initialAccount, additionalAccounts, additionalAddresses);
            console.log(">>> Cliente criado com sucesso");
            return ClientControllerState_1.default.CLIENT_MENU;
        });
    }
    createAddressOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            let state = yield this.inputHandler.getStringInput("Insira a Unidade Federativa do Endereço: ");
            let city = yield this.inputHandler.getStringInput("Insira a cidade do Endereço: ");
            let street = yield this.inputHandler.getStringInput("Insira o logradouro do Endereço: ");
            let number = yield this.inputHandler.getStringInput("Insira o número do Endereço: ");
            let extraInfo = yield this.inputHandler.getStringInput("Insira o complemento do Endereço: ");
            let zipCode = yield this.inputHandler.getStringInput("Insira o CEP do Endereço: ");
            return this.dataManager.createAddress(zipCode, street, number, extraInfo, city, state);
        });
    }
    createAccountOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            let accountInput = yield this.inputHandler.getNumberInput("Escolha um tipo de conta para criar\n1. Conta Corrente\n2. Conta Poupança\nInsira um comando: ");
            let number = yield this.inputHandler.getStringInput("Insira o número da Conta: ");
            if (accountInput == 1) {
                let limit = yield this.inputHandler.getNumberInput("Insira o limite da Conta: ");
                return this.dataManager.createCheckingAccount(number, limit);
            }
            else if (accountInput == 2) {
                return this.dataManager.createSavingsAccount(number);
            }
            else {
                console.log(">>> Comando inválido. Insira 1 ou 2");
                return this.createAccountOperation();
            }
        });
    }
    listClientsOperation() {
        console.log("\n>>> Listando Clientes");
        console.log(this.dataManager.listClients());
        if (this.dataManager.getClients().length === 0) {
            console.log(">>> Voltando ao Menu de Clientes");
            return ClientControllerState_1.default.CLIENT_MENU;
        }
        else {
            return ClientControllerState_1.default.CLIENT_SELECTION;
        }
    }
    listClientInfoOperation() {
        console.log("\n>>> Listando informações do Cliente");
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
            console.log("\n>>> Editando CPF do Cliente");
            console.log(`CPF atual: ${this.clientInEditing.cpf}`);
            let newCPF = yield this.inputHandler.getStringInput("Insira o novo CPF do Cliente: ");
            this.clientInEditing.cpf = newCPF;
            console.log(">>> CPF atualizado com sucesso");
            return ClientControllerState_1.default.CLIENT_EDITING;
        });
    }
    editClientVipOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n>>> Editando estado VIP do Cliente");
            console.log(`Estado VIP atual: ${this.clientInEditing.vip ? "VIP" : "Normal"}`);
            let newVIP = yield this.inputHandler.getBooleanInput(`${this.clientInEditing.vip ? "O Cliente continua VIP? (s/n): " : "O Cliente se torna VIP? (s/n): "}`);
            this.clientInEditing.vip = newVIP;
            console.log(">>> Estado VIP atualizado com sucesso");
            return ClientControllerState_1.default.CLIENT_EDITING;
        });
    }
    editClientPhoneOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n>>> Editando Telefone do Cliente");
            console.log(`Telefone atual: ${this.clientInEditing.telefone}`);
            let newPhone = yield this.inputHandler.getStringInput("Insira o novo Telefone do Cliente: ");
            this.clientInEditing.telefone = newPhone;
            console.log(">>> Telefone atualizado com sucesso");
            return ClientControllerState_1.default.CLIENT_EDITING;
        });
    }
    editClientNameOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n>>> Editando Nome do Cliente");
            console.log(`Nome atual: ${this.clientInEditing.nome}`);
            let newName = yield this.inputHandler.getStringInput("Insira o novo Nome do Cliente: ");
            this.clientInEditing.nome = newName;
            console.log(">>> Nome atualizado com sucesso");
            return ClientControllerState_1.default.CLIENT_EDITING;
        });
    }
    createClientAddressOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("\n>>> Iniciando criação de novo Endereço");
                let newAddress = yield this.createAddressOperation();
                this.dataManager.addAddressToEditedClient(newAddress);
                console.log(">>> Endereço adicionado com sucesso");
            }
            catch (error) {
                console.log(`Falha na criação do Endereço. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
            }
            return ClientControllerState_1.default.CLIENT_ADDRESS_MENU;
        });
    }
    createClientAccountOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("\n>>> Iniciando criação de nova Conta");
                let newAccount = yield this.createAccountOperation();
                this.dataManager.addAccountToEditedClient(newAccount);
                console.log(">>> Conta adicionada com sucesso");
            }
            catch (error) {
                console.log(`Falha na criação da Conta. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
            }
            return ClientControllerState_1.default.CLIENT_ACCOUNT_MENU;
        });
    }
    removeClientAccountOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.clientInEditing.contas.length === 1) {
                console.log("\n>>> O Cliente possui apenas uma Conta, portanto não é possível remover Contas");
                console.log(">>> Voltando para o Menu de Editar Contas");
                return ClientControllerState_1.default.CLIENT_ACCOUNT_MENU;
            }
            else {
                console.log("\n>>> Listando Contas do Cliente");
                let clientAccounts = this.dataManager.listEditedClientAccounts();
                if (clientAccounts === "") {
                    console.log(">>> ERRO FATAL: O Cliente não possui nenhuma Conta");
                    console.log(">>> O programa será encerrado");
                    return ClientControllerState_1.default.SHUTDOWN;
                }
                else {
                    console.log(clientAccounts);
                    let selectedAccount = yield this.inputHandler.getNumberInput("Insira o índice da Conta a remover: ");
                    let parsedAccountIndex = selectedAccount - 1;
                    try {
                        this.dataManager.removeEditedClientAccount(parsedAccountIndex);
                        console.log(">>> Conta removida com sucesso");
                    }
                    catch (error) {
                        console.log(`>>> Falha na remoção da Conta. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
                    }
                    return ClientControllerState_1.default.CLIENT_ACCOUNT_MENU;
                }
            }
        });
    }
    removeClientAddressOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.clientInEditing.enderecos.length === 1) {
                console.log("\n>>> O Cliente possui apenas um Endereço, portanto não é possível remover Endereços");
                console.log(">>> Voltando para o Menu de Editar Endereços");
                return ClientControllerState_1.default.CLIENT_ADDRESS_MENU;
            }
            else {
                console.log("\n>>> Listando Endereços do Cliente");
                let clientAddresses = this.dataManager.listEditedClientAddresses();
                if (clientAddresses === "") {
                    console.log(">>> ERRO FATAL: O Cliente não possui nenhum Endereço");
                    console.log(">>> O programa será encerrado");
                    return ClientControllerState_1.default.SHUTDOWN;
                }
                else {
                    console.log(clientAddresses);
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
                }
            }
        });
    }
    listClientAddressesOperation() {
        console.log("\n>>> Listando Endereços do Cliente");
        console.log(this.dataManager.listEditedClientAddresses());
        return ClientControllerState_1.default.CLIENT_ADDRESS_MENU;
    }
    listClientAccountsOperation() {
        console.log("\n>>> Listando Contas do Cliente");
        console.log(this.dataManager.listEditedClientAccounts());
        return ClientControllerState_1.default.CLIENT_ACCOUNT_MENU;
    }
    makeAccountDepositOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n>>> Iniciando depósito");
            let accountDepositNumber = yield this.inputHandler.getStringInput("Insira o número da Conta recebedora do depósito: ");
            try {
                let depositAccount = this.dataManager.getEditedClientAccount(accountDepositNumber);
                if (depositAccount instanceof Conta_1.default) {
                    let depositValue = yield this.inputHandler.getNumberInput("Insira o valor do depósito: ");
                    depositAccount.depositar(depositValue);
                    console.log(">>> Depósito realizado com sucesso");
                }
                else {
                    console.log(">>> Não foi possível encontrar uma Conta com o número inserido");
                }
            }
            catch (error) {
                console.log(`>>> Falha na operação de depósito. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
            }
            return ClientControllerState_1.default.CLIENT_ACCOUNT_MENU;
        });
    }
    makeAccountWithdrawOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n>>> Iniciando saque");
            let accountWithdrawNumber = yield this.inputHandler.getStringInput("Insira o número da Conta para fazer o saque: ");
            try {
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
                        console.log(`>>> Falha na operação de saque. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
                    }
                }
                else {
                    console.log(">>> Não foi possível encontrar uma Conta com o número inserido");
                }
            }
            catch (error) {
                console.log(`>>> Falha na operação de saque. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
            }
            return ClientControllerState_1.default.CLIENT_ACCOUNT_MENU;
        });
    }
    makeAccountBalanceOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n>>> Iniciando cálculo de saldo");
            let accountBalanceNumber = yield this.inputHandler.getStringInput("Insira o número da Conta para calcular o saldo: ");
            try {
                let balanceAccount = this.dataManager.getEditedClientAccount(accountBalanceNumber);
                if (balanceAccount instanceof Conta_1.default) {
                    console.log(`>>> O saldo da conta é $${balanceAccount === null || balanceAccount === void 0 ? void 0 : balanceAccount.calcularSaldo()}`);
                }
                else {
                    console.log(">>> Não foi possível encontrar uma Conta com o número inserido");
                }
            }
            catch (error) {
                console.log(`>>> Falha na operação de saldo. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
            }
            return ClientControllerState_1.default.CLIENT_ACCOUNT_MENU;
        });
    }
    makeAccountTransferOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n>>> Iniciando transferência");
            let originAccountNumber = yield this.inputHandler.getStringInput("Insira o número da Conta de origem da transferência: ");
            try {
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
            }
            catch (error) {
                console.log(`>>> Falha na operação de transfer. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
            }
            return ClientControllerState_1.default.CLIENT_ACCOUNT_MENU;
        });
    }
}
exports.default = ClientOperator;
