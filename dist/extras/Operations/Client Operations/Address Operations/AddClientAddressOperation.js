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
const ClientAddressesMenuOperation_1 = __importDefault(require("./ClientAddressesMenuOperation"));
class AddClientAddressOperation extends Operation_1.default {
    constructor(dataManager, editedClient) {
        super(dataManager);
        this._inputHandler = new InputHandler_1.default();
        this._editedClient = editedClient;
    }
    runOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("\n>>> Iniciando criação de novo Endereço");
                let newAddress = yield this.createAddress();
                this._dataManager.addAddressToClient(this._editedClient, newAddress);
                console.log(">>> Endereço adicionado com sucesso");
            }
            catch (error) {
                console.log(`Falha na criação do Endereço. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
            }
            return new ClientAddressesMenuOperation_1.default(this._dataManager, this._editedClient);
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
}
exports.default = AddClientAddressOperation;
