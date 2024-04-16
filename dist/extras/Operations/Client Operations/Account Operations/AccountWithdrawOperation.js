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
class AccountWithdrawOperation extends Operation_1.default {
    constructor(dataManager, editedClient) {
        super(dataManager);
        this._inputHandler = new InputHandler_1.default();
        this._editedClient = editedClient;
    }
    runOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n>>> Iniciando saque");
            let accountWithdrawNumber = yield this._inputHandler.getStringInput("Insira o número da Conta para fazer o saque: ");
            try {
                let withdrawAccount = this._dataManager.getClientAccount(this._editedClient, accountWithdrawNumber);
                let withdrawValue = yield this._inputHandler.getNumberInput("Insira o valor do saque: ");
                try {
                    withdrawAccount.fazerSaque(withdrawValue);
                    console.log(">>> Saque realizado com sucesso");
                }
                catch (error) {
                    console.log(`>>> Falha na operação de saque. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
                }
            }
            catch (error) {
                console.log(`>>> Falha na operação de saque. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
            }
            return new ClientAccountsMenuOperation_1.default(this._dataManager, this._editedClient);
        });
    }
}
exports.default = AccountWithdrawOperation;
