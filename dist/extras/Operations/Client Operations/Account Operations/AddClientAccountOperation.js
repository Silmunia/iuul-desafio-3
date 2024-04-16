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
const InputHandler_1 = __importDefault(require("../../../Commons/InputHandler"));
const Operation_1 = __importDefault(require("../../Abstract Operation/Operation"));
const ClientAccountsMenuOperation_1 = __importDefault(require("./ClientAccountsMenuOperation"));
class AddClientAccountOperation extends Operation_1.default {
    constructor(dataManager, editedClient) {
        super(dataManager);
        this._inputHandler = new InputHandler_1.default();
        this._editedClient = editedClient;
    }
    runOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("\n>>> Iniciando criação de nova Conta");
                let newAddress = yield this.createAccount();
                this._dataManager.addAccountToClient(this._editedClient, newAddress);
                console.log(">>> Conta adicionada com sucesso");
            }
            catch (error) {
                console.log(`Falha na criação da Conta. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
            }
            return new ClientAccountsMenuOperation_1.default(this._dataManager, this._editedClient);
        });
    }
    createAccount() {
        return __awaiter(this, void 0, void 0, function* () {
            let accountInput = yield this._inputHandler.getNumberInput("Escolha um tipo de conta para criar\n1. Conta Corrente\n2. Conta Poupança\nInsira um comando: ");
            let number = yield this._inputHandler.getStringInput("Insira o número da Conta: ");
            if (accountInput == 1) {
                let limit = yield this._inputHandler.getNumberInput("Insira o limite da Conta: ");
                return this._dataManager.createCheckingAccount(number, limit);
            }
            else if (accountInput == 2) {
                return this._dataManager.createSavingsAccount(number);
            }
            else {
                console.log(">>> Comando inválido. Insira 1 ou 2");
                return this.createAccount();
            }
        });
    }
}
exports.default = AddClientAccountOperation;
