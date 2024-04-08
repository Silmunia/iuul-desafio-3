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
const InputHandler_1 = __importDefault(require("./InputHandler"));
var ControllerState;
(function (ControllerState) {
    ControllerState[ControllerState["MAIN_MENU"] = 0] = "MAIN_MENU";
    ControllerState[ControllerState["EMPLOYEE_MENU"] = 1] = "EMPLOYEE_MENU";
    ControllerState[ControllerState["SHUTDOWN"] = 999] = "SHUTDOWN";
    ControllerState[ControllerState["RESET"] = 1000] = "RESET";
})(ControllerState || (ControllerState = {}));
class Controller {
    constructor() {
        this.currentState = ControllerState.MAIN_MENU;
        this.inputHandler = new InputHandler_1.default();
    }
    startProgram() {
        this.inputLoop();
    }
    inputLoop() {
        switch (this.currentState) {
            case ControllerState.MAIN_MENU:
            case ControllerState.EMPLOYEE_MENU:
                this.displayMenu();
                this.startUserInput();
                break;
            case ControllerState.SHUTDOWN:
                console.log(">>> Encerrando programa");
                return;
            case ControllerState.RESET:
                console.log(">>> Voltando para o Menu principal");
                this.currentState = ControllerState.MAIN_MENU;
                this.inputLoop();
                break;
            default:
                console.log(">>> Comando desconhecido");
                this.currentState = ControllerState.RESET;
                this.inputLoop();
        }
    }
    displayMenu() {
        switch (this.currentState) {
            case ControllerState.MAIN_MENU:
                console.log("***Menu Principal***");
                console.log(`${ControllerState.EMPLOYEE_MENU}. Gerenciar Funcionários`);
                console.log(`${ControllerState.SHUTDOWN}. Encerrar`);
                break;
            case ControllerState.EMPLOYEE_MENU:
                console.log("***Menu: Gerenciar Funcionários***");
                console.log("1. Criar Funcionários");
                console.log(`${ControllerState.MAIN_MENU}. Voltar para Menu Principal`);
                console.log(`${ControllerState.SHUTDOWN}. Encerrar`);
                break;
            default:
                console.log(">>> Menu desconhecido");
                console.log(">>> Voltando para o Menu Principal");
                this.currentState = ControllerState.MAIN_MENU;
        }
    }
    startUserInput() {
        return __awaiter(this, void 0, void 0, function* () {
            this.parseUserInput(yield this.inputHandler.getInput());
        });
    }
    parseUserInput(input) {
        if (typeof input === 'string') {
            let parsedInput = parseInt(input);
            this.currentState = parsedInput;
            this.inputLoop();
        }
        else {
            this.currentState = ControllerState.RESET;
            this.inputLoop();
        }
    }
}
exports.default = Controller;
