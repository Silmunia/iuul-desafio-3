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
const DataManager_1 = __importDefault(require("../Commons/DataManager"));
const InputHandler_1 = __importDefault(require("../Commons/InputHandler"));
const MenuRenderer_1 = __importDefault(require("../Commons/MenuRenderer"));
const EmployeeController_1 = __importDefault(require("../Employee/EmployeeController"));
const ClientController_1 = __importDefault(require("../Client/ClientController"));
class MainController {
    constructor() {
        this._currentState = ControllerState_1.default.MAIN_MENU;
        this._inputHandler = new InputHandler_1.default();
        this._menuRenderer = new MenuRenderer_1.default();
        this._dataManager = new DataManager_1.default();
    }
    startProgram() {
        this.runControlLoop();
    }
    runControlLoop() {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this._currentState) {
                case ControllerState_1.default.MAIN_MENU:
                    this.displayMenu();
                    yield this.startCommandInput("Insira comando: ");
                    break;
                case ControllerState_1.default.SHUTDOWN:
                    console.log(">>> Encerrando programa");
                    return;
                case ControllerState_1.default.RESET:
                    console.log(">>> Voltando para o Menu principal");
                    this._currentState = ControllerState_1.default.MAIN_MENU;
                    this.runControlLoop();
                    break;
                default:
                    console.log(">>> Comando desconhecido");
                    this._currentState = ControllerState_1.default.RESET;
                    this.runControlLoop();
            }
        });
    }
    startCommandInput(prompt) {
        return __awaiter(this, void 0, void 0, function* () {
            let receivedInput = yield this._inputHandler.getNumberInput(prompt);
            yield this.parseInputForState(receivedInput);
            this.runControlLoop();
        });
    }
    parseInputForState(input) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this._currentState) {
                case ControllerState_1.default.MAIN_MENU:
                    switch (input) {
                        case ControllerState_1.default.EMPLOYEE_MENU:
                            this._currentState = yield this.delegateEmployeeControl();
                            break;
                        case ControllerState_1.default.CLIENT_MENU:
                            this._currentState = yield this.delegateClientControl();
                            break;
                        case ControllerState_1.default.SHUTDOWN:
                            this._currentState = ControllerState_1.default.SHUTDOWN;
                            break;
                        default:
                            console.log(">>> Comando desconhecido");
                            this._currentState = ControllerState_1.default.RESET;
                    }
                    break;
                default:
                    console.log(">>> Comando desconhecido");
                    this._currentState = ControllerState_1.default.RESET;
            }
        });
    }
    delegateEmployeeControl() {
        return __awaiter(this, void 0, void 0, function* () {
            this._employeeController = new EmployeeController_1.default(this._dataManager);
            return yield this._employeeController.runEmployeeCommands();
        });
    }
    delegateClientControl() {
        return __awaiter(this, void 0, void 0, function* () {
            this._clientController = new ClientController_1.default(this._dataManager);
            return yield this._clientController.runClientCommands();
        });
    }
    displayMenu() {
        let renderResult = this._menuRenderer.renderMainMenu(this._currentState);
        if (!renderResult) {
            console.log(">>> Menu desconhecido");
            console.log(">>> Voltando para o Menu Principal");
            this._currentState = ControllerState_1.default.MAIN_MENU;
            this.runControlLoop();
        }
    }
}
exports.default = MainController;
