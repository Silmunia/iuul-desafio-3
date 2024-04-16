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
class EditClientVipOperation extends Operation_1.default {
    constructor(dataManager, editedClient) {
        super(dataManager);
        this._inputHandler = new InputHandler_1.default();
        this._editedClient = editedClient;
    }
    runOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n>>> Editando estado VIP do Cliente");
            console.log(`Estado VIP atual: ${this._editedClient.vip ? "VIP" : "Normal"}`);
            let newVIP = yield this._inputHandler.getBooleanInput(`${this._editedClient.vip ? "O Cliente continua VIP? (s/n): " : "O Cliente se torna VIP? (s/n): "}`);
            this._editedClient.vip = newVIP;
            console.log(">>> Estado VIP atualizado com sucesso");
            return new ClientEditMenuOperation_1.default(this._dataManager, this._editedClient);
        });
    }
}
exports.default = EditClientVipOperation;
