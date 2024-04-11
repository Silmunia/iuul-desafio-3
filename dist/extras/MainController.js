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
const ControllerState_1 = __importDefault(require("./ControllerState"));
const DataManager_1 = __importDefault(require("./DataManager"));
const InputHandler_1 = __importDefault(require("./InputHandler"));
const MenuRenderer_1 = __importDefault(require("./MenuRenderer"));
const EmployeeController_1 = __importDefault(require("./EmployeeController"));
const ClientController_1 = __importDefault(require("./ClientController"));
class MainController {
    constructor() {
        this.currentState = ControllerState_1.default.MAIN_MENU;
        this.inputHandler = new InputHandler_1.default();
        this.menuRenderer = new MenuRenderer_1.default();
        this.dataManager = new DataManager_1.default();
    }
    startProgram() {
        this.runControlLoop();
    }
    runControlLoop() {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this.currentState) {
                case ControllerState_1.default.MAIN_MENU:
                    this.displayMenu();
                    yield this.startCommandInput("Insira comando: ");
                    break;
                case ControllerState_1.default.SHUTDOWN:
                    console.log(">>> Encerrando programa");
                    return;
                case ControllerState_1.default.RESET:
                    console.log(">>> Voltando para o Menu principal");
                    this.currentState = ControllerState_1.default.MAIN_MENU;
                    this.runControlLoop();
                    break;
                default:
                    console.log(">>> Comando desconhecido");
                    this.currentState = ControllerState_1.default.RESET;
                    this.runControlLoop();
            }
        });
    }
    startCommandInput(prompt) {
        return __awaiter(this, void 0, void 0, function* () {
            let receivedInput = yield this.inputHandler.getNumberInput(prompt);
            yield this.parseInputForState(receivedInput);
            this.runControlLoop();
        });
    }
    parseInputForState(input) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this.currentState) {
                case ControllerState_1.default.MAIN_MENU:
                    switch (input) {
                        case ControllerState_1.default.EMPLOYEE_MENU:
                            this.currentState = yield this.delegateEmployeeControl(input);
                            break;
                        case ControllerState_1.default.CLIENT_MENU:
                            this.currentState = yield this.delegateClientControl(input);
                            break;
                        case ControllerState_1.default.SHUTDOWN:
                            this.currentState = ControllerState_1.default.SHUTDOWN;
                            break;
                        default:
                            console.log(">>> Comando desconhecido");
                            this.currentState = ControllerState_1.default.RESET;
                    }
                    break;
                default:
                    console.log(">>> Comando desconhecido");
                    this.currentState = ControllerState_1.default.RESET;
            }
        });
    }
    delegateEmployeeControl(initialState) {
        return __awaiter(this, void 0, void 0, function* () {
            let editedEmployee = this.dataManager.getEditedEmployee();
            this.employeeController = new EmployeeController_1.default(initialState, editedEmployee, this.dataManager);
            return yield this.employeeController.runEmployeeCommands();
        });
    }
    delegateClientControl(initialState) {
        return __awaiter(this, void 0, void 0, function* () {
            let editedClient = this.dataManager.getEditedClient();
            this.clientController = new ClientController_1.default(initialState, editedClient, this.dataManager);
            return yield this.clientController.runClientCommands();
        });
    }
    displayMenu() {
        let renderResult = this.menuRenderer.renderMenu(this.currentState);
        if (!renderResult) {
            console.log(">>> Menu desconhecido");
            console.log(">>> Voltando para o Menu Principal");
            this.currentState = ControllerState_1.default.MAIN_MENU;
            this.runControlLoop();
        }
    }
}
exports.default = MainController;
