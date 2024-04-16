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
const ClientEditMenuOperation_1 = __importDefault(require("./ClientEditMenuOperation"));
const ClientMenuOperation_1 = __importDefault(require("./ClientMenuOperation"));
class SelectClientOperation extends Operation_1.default {
    constructor() {
        super(...arguments);
        this._inputHandler = new InputHandler_1.default();
    }
    runOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n>>> Listando Funcionários");
            try {
                let listResult = this._dataManager.listClients();
                console.log(listResult);
            }
            catch (error) {
                console.log(`>>> Não foi possível listar os Clientes. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
                console.log(">>> Voltando ao Menu de Clientes");
                return new ClientMenuOperation_1.default(this._dataManager);
            }
            let selectedIndex = yield this._inputHandler.getNumberInput("Selecione um Cliente: ");
            let parsedIndex = selectedIndex - 1;
            console.log(`>>> Cliente ${selectedIndex} selecionado`);
            try {
                let selectedClient = this._dataManager.getClientFromRepository(parsedIndex);
                return new ClientEditMenuOperation_1.default(this._dataManager, selectedClient);
            }
            catch (error) {
                console.log(`>>> Falha em selecionar Cliente. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
                return new ClientMenuOperation_1.default(this._dataManager);
            }
        });
    }
}
exports.default = SelectClientOperation;
