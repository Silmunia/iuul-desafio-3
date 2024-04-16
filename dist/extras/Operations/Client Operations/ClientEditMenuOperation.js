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
const MainMenuOperation_1 = __importDefault(require("../MainMenuOperation"));
const MenuRenderer_1 = __importDefault(require("../../Commons/MenuRenderer"));
const Operation_1 = __importDefault(require("../Abstract Operation/Operation"));
const EditClientNameOperation_1 = __importDefault(require("./EditClientNameOperation"));
const ListClientInfoOperation_1 = __importDefault(require("./ListClientInfoOperation"));
const EditClientPhoneOperation_1 = __importDefault(require("./EditClientPhoneOperation"));
const EditClientCpfOperation_1 = __importDefault(require("./EditClientCpfOperation"));
const EditClientVipOperation_1 = __importDefault(require("./EditClientVipOperation"));
const ClientAddressesMenuOperation_1 = __importDefault(require("./Address Operations/ClientAddressesMenuOperation"));
const ClientAccountsMenuOperation_1 = __importDefault(require("./Account Operations/ClientAccountsMenuOperation"));
class ClientEditMenuOperation extends Operation_1.default {
    constructor(dataManager, editedClient) {
        super(dataManager);
        this._inputHandler = new InputHandler_1.default();
        this._menuRenderer = new MenuRenderer_1.default();
        this._expectedInputs = [1, 2, 3, 4, 5, 6, 7, 8, 999];
        this._editedClient = editedClient;
    }
    runOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            this._menuRenderer.renderEditClientMenu(this._expectedInputs);
            return yield this.startCommandInput("Insira um comando: ");
        });
    }
    startCommandInput(prompt) {
        return __awaiter(this, void 0, void 0, function* () {
            let receivedInput = yield this._inputHandler.getNumberInput(prompt);
            switch (receivedInput) {
                case this._expectedInputs[0]:
                    return new ListClientInfoOperation_1.default(this._dataManager, this._editedClient);
                case this._expectedInputs[1]:
                    return new EditClientNameOperation_1.default(this._dataManager, this._editedClient);
                case this._expectedInputs[2]:
                    return new EditClientPhoneOperation_1.default(this._dataManager, this._editedClient);
                case this._expectedInputs[3]:
                    return new EditClientCpfOperation_1.default(this._dataManager, this._editedClient);
                case this._expectedInputs[4]:
                    return new EditClientVipOperation_1.default(this._dataManager, this._editedClient);
                case this._expectedInputs[5]:
                    return new ClientAddressesMenuOperation_1.default(this._dataManager, this._editedClient);
                case this._expectedInputs[6]:
                    return new ClientAccountsMenuOperation_1.default(this._dataManager, this._editedClient);
                case this._expectedInputs[7]:
                    return new MainMenuOperation_1.default(this._dataManager);
                case this._expectedInputs[8]:
                    let termination = new MainMenuOperation_1.default(this._dataManager);
                    termination.maintainExecution = false;
                    return termination;
                default:
                    console.log(">>> Comando inválido");
                    return this;
            }
        });
    }
}
exports.default = ClientEditMenuOperation;
