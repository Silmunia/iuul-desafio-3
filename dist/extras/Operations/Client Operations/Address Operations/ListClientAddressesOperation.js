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
const Operation_1 = __importDefault(require("../../Abstract Operation/Operation"));
const MainMenuOperation_1 = __importDefault(require("../../MainMenuOperation"));
const ClientAddressesMenuOperation_1 = __importDefault(require("./ClientAddressesMenuOperation"));
class ListClientAddressesOperation extends Operation_1.default {
    constructor(dataManager, editedClient) {
        super(dataManager);
        this._editedClient = editedClient;
    }
    runOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n>>> Listando Endereços do Cliente");
            try {
                let result = this._dataManager.listClientAddresses(this._editedClient);
                console.log(result);
                return new ClientAddressesMenuOperation_1.default(this._dataManager, this._editedClient);
            }
            catch (error) {
                console.log(`${error instanceof Error ? error.message : ">>> ERRO FATAL DESCONHECIDO"}`);
                console.log(">>> O programa será encerrado");
                let termination = new MainMenuOperation_1.default(this._dataManager);
                termination.maintainExecution = false;
                return termination;
            }
        });
    }
}
exports.default = ListClientAddressesOperation;
