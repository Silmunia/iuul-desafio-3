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
class AccountBalanceOperation extends Operation_1.default {
    constructor(dataManager, editedClient) {
        super(dataManager);
        this._inputHandler = new InputHandler_1.default();
        this._editedClient = editedClient;
    }
    runOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n>>> Iniciando cálculo de saldo");
            let accountBalanceNumber = yield this._inputHandler.getStringInput("Insira o número da Conta para calcular o saldo: ");
            try {
                let balanceAccount = this._dataManager.getClientAccount(this._editedClient, accountBalanceNumber);
                console.log(`>>> O saldo da conta é $${balanceAccount === null || balanceAccount === void 0 ? void 0 : balanceAccount.calcularSaldo()}`);
            }
            catch (error) {
                console.log(`>>> Falha na operação de saldo. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
            }
            return new ClientAccountsMenuOperation_1.default(this._dataManager, this._editedClient);
        });
    }
}
exports.default = AccountBalanceOperation;
