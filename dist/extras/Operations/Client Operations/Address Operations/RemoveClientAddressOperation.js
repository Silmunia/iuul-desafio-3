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
const ClientAddressesMenuOperation_1 = __importDefault(require("./ClientAddressesMenuOperation"));
class RemoveClientAddressOperation extends Operation_1.default {
    constructor(dataManager, editedClient) {
        super(dataManager);
        this._inputHandler = new InputHandler_1.default();
        this._editedClient = editedClient;
    }
    runOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._editedClient.enderecos.length === 1) {
                console.log("\n>>> O Cliente possui apenas um Endereço, portanto não é possível remover Endereços");
                console.log(">>> Voltando para o Menu de Editar Endereços");
                return new ClientAddressesMenuOperation_1.default(this._dataManager, this._editedClient);
            }
            else {
                console.log("\n>>> Listando Endereços do Cliente");
                let clientAddresses = this._dataManager.listClientAddresses(this._editedClient);
                if (clientAddresses === "") {
                    console.log(">>> ERRO FATAL: O Cliente não possui nenhum Endereço");
                    console.log(">>> O programa será encerrado");
                    let termination = new MainMenuOperation_1.default(this._dataManager);
                    termination.maintainExecution = false;
                    return termination;
                }
                else {
                    console.log(clientAddresses);
                    let selectedAddress = yield this._inputHandler.getNumberInput("Insira o índice do Endereço a remover: ");
                    let parsedAddressIndex = selectedAddress - 1;
                    try {
                        this._dataManager.removeClientAddress(this._editedClient, parsedAddressIndex);
                        console.log(">>> Endereço removido com sucesso");
                    }
                    catch (error) {
                        console.log(`>>> Falha na remoção do Endereço. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
                    }
                    return new ClientAddressesMenuOperation_1.default(this._dataManager, this._editedClient);
                }
            }
        });
    }
}
exports.default = RemoveClientAddressOperation;
