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
const ContaCorrente_1 = __importDefault(require("../../../../objects/classes/ContaCorrente"));
const InputHandler_1 = __importDefault(require("../../../Commons/InputHandler"));
const Operation_1 = __importDefault(require("../../Abstract Operation/Operation"));
const ClientAccountsMenuOperation_1 = __importDefault(require("./ClientAccountsMenuOperation"));
class AccountTransferOperation extends Operation_1.default {
    constructor(dataManager, editedClient) {
        super(dataManager);
        this._inputHandler = new InputHandler_1.default();
        this._editedClient = editedClient;
    }
    runOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n>>> Iniciando transferência");
            let originAccountNumber = yield this._inputHandler.getStringInput("Insira o número da Conta de origem da transferência: ");
            try {
                let originAccount = this._dataManager.getClientAccount(this._editedClient, originAccountNumber);
                if (originAccount instanceof ContaCorrente_1.default) {
                    let targetAccountNumber = yield this._inputHandler.getStringInput("Insira o número da Conta de destino da transferência: ");
                    try {
                        let targetAccount = this._dataManager.getTargetAccountForTransfer(targetAccountNumber);
                        let transferValue = yield this._inputHandler.getNumberInput("Insira o valor a ser transferido: ");
                        try {
                            originAccount.transferir(targetAccount, transferValue);
                            console.log(">>> Transferência realizada com sucesso");
                        }
                        catch (error) {
                            console.log(`>>> Não foi possível concluir a transferência. ${error instanceof Error ? error.message : ""}`);
                        }
                    }
                    catch (error) {
                        console.log(`>>> Não foi possível concluir a transferência. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
                    }
                }
                else {
                    console.log(">>> Não é possível fazer transferências a partir de uma Conta Poupança");
                }
            }
            catch (error) {
                console.log(`>>> Não foi possível concluir a transferência. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
            }
            return new ClientAccountsMenuOperation_1.default(this._dataManager, this._editedClient);
        });
    }
}
exports.default = AccountTransferOperation;
