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
const InputHandler_1 = __importDefault(require("../Commons/InputHandler"));
const MainMenuOperation_1 = __importDefault(require("./MainMenuOperation"));
const MenuRenderer_1 = __importDefault(require("../Commons/MenuRenderer"));
const Operation_1 = __importDefault(require("./Abstract Operation/Operation"));
class ClientMenuOperation extends Operation_1.default {
    constructor() {
        super(...arguments);
        this._inputHandler = new InputHandler_1.default();
        this._menuRenderer = new MenuRenderer_1.default();
        this._expectedInputs = [1, 2, 3, 999];
    }
    runOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            this._menuRenderer.renderMainClientMenu(this._expectedInputs);
            return yield this.startCommandInput("Insira um comando: ");
        });
    }
    startCommandInput(prompt) {
        return __awaiter(this, void 0, void 0, function* () {
            let receivedInput = yield this._inputHandler.getNumberInput(prompt);
            switch (receivedInput) {
                case this._expectedInputs[0]:
                    return this;
                case this._expectedInputs[1]:
                    return this;
                case this._expectedInputs[2]:
                    return new MainMenuOperation_1.default(this._dataManager);
                case this._expectedInputs[3]:
                    let termination = new MainMenuOperation_1.default(this._dataManager);
                    termination.maintainExecution = false;
                    return termination;
                default:
                    return this;
            }
        });
    }
}
exports.default = ClientMenuOperation;
