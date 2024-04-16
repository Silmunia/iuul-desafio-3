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
const InputHandler_1 = __importDefault(require("../../Commons/InputHandler"));
const Operation_1 = __importDefault(require("../Abstract Operation/Operation"));
const ClientMenuOperation_1 = __importDefault(require("./ClientMenuOperation"));
class CreateClientOperation extends Operation_1.default {
    constructor() {
        super(...arguments);
        this._inputHandler = new InputHandler_1.default();
    }
    runOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n>>> Iniciando criação de Cliente");
            let clientName = yield this._inputHandler.getStringInput("Insira o nome do Cliente: ");
            let cpf = yield this._inputHandler.getStringInput("Insira o CPF do Cliente: ");
            let phone = yield this._inputHandler.getStringInput("Insira o telefone do Cliente: ");
            let isVIP = yield this._inputHandler.getBooleanInput("O Cliente é VIP? (s/n) ");
            console.log("\n>>> Criando Endereço inicial de Cliente");
            let initialAddress = yield this.createAddress();
            console.log(">>> Endereço inicial criado com sucesso");
            let numberOfAddresses = yield this._inputHandler.getNumberInput("Insira o número de Endereços adicionais do Cliente: ");
            let additionalAddresses = [];
            for (let i = 0; i < numberOfAddresses; i++) {
                console.log(`\n>>> Criando Endereço adicional ${i + 1}/${numberOfAddresses}`);
                let newAddress = yield this.createAddress();
                additionalAddresses.push(newAddress);
                console.log(`>>> Endereço ${i + 1}/${numberOfAddresses} criado com sucesso`);
            }
            console.log("\n>>> Criando Conta inicial do Cliente");
            let initialAccount = yield this.createAccount();
            console.log(">>> Conta inicial criada com sucesso");
            let numberOfAccounts = yield this._inputHandler.getNumberInput("Insira o número de Contas adicionais do Cliente: ");
            let additionalAccounts = [];
            for (let i = 0; i < numberOfAccounts; i++) {
                console.log(`\n>>> Criando Conta adicional ${i + 1}/${numberOfAccounts}`);
                let newAccount = yield this.createAccount();
                additionalAccounts.push(newAccount);
                console.log(`>>> Conta ${i + 1}/${numberOfAccounts} criada com sucesso`);
            }
            this._dataManager.createClient(cpf, clientName, phone, isVIP, initialAddress, initialAccount, additionalAccounts, additionalAddresses);
            console.log(">>> Cliente criado com sucesso");
            return new ClientMenuOperation_1.default(this._dataManager);
        });
    }
    createAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            let state = yield this._inputHandler.getStringInput("Insira a Unidade Federativa do Endereço: ");
            let city = yield this._inputHandler.getStringInput("Insira a cidade do Endereço: ");
            let street = yield this._inputHandler.getStringInput("Insira o logradouro do Endereço: ");
            let number = yield this._inputHandler.getStringInput("Insira o número do Endereço: ");
            let extraInfo = yield this._inputHandler.getStringInput("Insira o complemento do Endereço: ");
            let zipCode = yield this._inputHandler.getStringInput("Insira o CEP do Endereço: ");
            return this._dataManager.createAddress(zipCode, street, number, extraInfo, city, state);
        });
    }
    createAccount() {
        return __awaiter(this, void 0, void 0, function* () {
            let accountInput = yield this._inputHandler.getNumberInput("Escolha um tipo de conta para criar\n1. Conta Corrente\n2. Conta Poupança\nInsira um comando: ");
            if (accountInput == 1) {
                let number = yield this._inputHandler.getStringInput("Insira o número da Conta: ");
                let limit = yield this._inputHandler.getNumberInput("Insira o limite da Conta: ");
                return this._dataManager.createCheckingAccount(number, limit);
            }
            else if (accountInput == 2) {
                let number = yield this._inputHandler.getStringInput("Insira o número da Conta: ");
                return this._dataManager.createSavingsAccount(number);
            }
            else {
                console.log(">>> Comando inválido. Insira 1 ou 2");
                return this.createAccount();
            }
        });
    }
}
exports.default = CreateClientOperation;
