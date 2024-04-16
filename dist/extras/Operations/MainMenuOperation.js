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
const ClientMenuOperation_1 = __importDefault(require("./Client Operations/ClientMenuOperation"));
const EmployeeMenuOperation_1 = __importDefault(require("./Employee Operations/EmployeeMenuOperation"));
const InputHandler_1 = __importDefault(require("../Commons/InputHandler"));
const Operation_1 = __importDefault(require("./Abstract Operation/Operation"));
const MainMenuRenderer_1 = __importDefault(require("../Menu Renderer/MainMenuRenderer"));
class MainMenuOperation extends Operation_1.default {
    constructor(dataManager) {
        super(dataManager);
        this._inputHandler = new InputHandler_1.default();
        this._menuRenderer = new MainMenuRenderer_1.default();
        this._expectedInputs = [1, 2, 999];
    }
    runOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            this._menuRenderer.renderMenu(this._expectedInputs);
            return yield this.startCommandInput("Insira um comando: ");
        });
    }
    startCommandInput(prompt) {
        return __awaiter(this, void 0, void 0, function* () {
            let receivedInput = yield this._inputHandler.getNumberInput(prompt);
            switch (receivedInput) {
                case this._expectedInputs[0]:
                    return new EmployeeMenuOperation_1.default(this._dataManager);
                case this._expectedInputs[1]:
                    return new ClientMenuOperation_1.default(this._dataManager);
                case this._expectedInputs[2]:
                    this.maintainExecution = false;
                    return this;
                default:
                    console.log(">>> Comando inválido");
                    return this;
            }
        });
    }
}
exports.default = MainMenuOperation;
