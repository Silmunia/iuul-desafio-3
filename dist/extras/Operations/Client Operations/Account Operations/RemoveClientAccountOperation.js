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
const MainMenuOperation_1 = __importDefault(require("../../MainMenuOperation"));
const ClientAccountsMenuOperation_1 = __importDefault(require("./ClientAccountsMenuOperation"));
class RemoveClientAccountOperation extends Operation_1.default {
    constructor(dataManager, editedClient) {
        super(dataManager);
        this._inputHandler = new InputHandler_1.default();
        this._editedClient = editedClient;
    }
    runOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._editedClient.contas.length === 1) {
                console.log("\n>>> O Cliente possui apenas uma Conta, portanto não é possível remover Endereços");
                console.log(">>> Voltando para o Menu de Editar Contas");
                return new ClientAccountsMenuOperation_1.default(this._dataManager, this._editedClient);
            }
            else {
                console.log("\n>>> Listando Contas do Cliente");
                let clientAccounts = this._dataManager.listClientAccounts(this._editedClient);
                if (clientAccounts === "") {
                    console.log(">>> ERRO FATAL: O Cliente não possui nenhuma Conta");
                    console.log(">>> O programa será encerrado");
                    let termination = new MainMenuOperation_1.default(this._dataManager);
                    termination.maintainExecution = false;
                    return termination;
                }
                else {
                    console.log(clientAccounts);
                    let selectedAccount = yield this._inputHandler.getNumberInput("Insira o índice da Conta a remover: ");
                    let parsedAccountIndex = selectedAccount - 1;
                    try {
                        this._dataManager.removeClientAccount(this._editedClient, parsedAccountIndex);
                        console.log(">>> Conta removido com sucesso");
                    }
                    catch (error) {
                        console.log(`>>> Falha na remoção da Conta. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
                    }
                    return new ClientAccountsMenuOperation_1.default(this._dataManager, this._editedClient);
                }
            }
        });
    }
}
exports.default = RemoveClientAccountOperation;
