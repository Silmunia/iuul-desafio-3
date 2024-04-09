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
const DataRepository_1 = __importDefault(require("./DataRepository"));
const FactoryRepository_1 = __importDefault(require("./FactoryRepository"));
const InputHandler_1 = __importDefault(require("./InputHandler"));
const MenuRenderer_1 = __importDefault(require("./MenuRenderer"));
class MainController {
    constructor() {
        this.currentState = ControllerState_1.default.MAIN_MENU;
        this.inputHandler = new InputHandler_1.default();
        this.menuRenderer = new MenuRenderer_1.default();
        this.objFactory = new FactoryRepository_1.default();
        this.appData = new DataRepository_1.default();
        this.dataManager = new DataManager_1.default();
    }
    startProgram() {
        this.runControlLoop();
    }
    runControlLoop() {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this.currentState) {
                case ControllerState_1.default.MAIN_MENU:
                case ControllerState_1.default.EMPLOYEE_MENU:
                case ControllerState_1.default.CLIENT_MENU:
                    this.displayMenu();
                    this.startCommandInput("Insira comando: ");
                    break;
                case ControllerState_1.default.EMPLOYEE_CREATION:
                case ControllerState_1.default.EMPLOYEE_LISTING:
                    yield this.runEmployeeCommands();
                    break;
                case ControllerState_1.default.CLIENT_CREATION:
                case ControllerState_1.default.CLIENT_LISTING:
                    yield this.runClientCommands();
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
            this.currentState = yield this.inputHandler.getNumberInput(prompt);
            this.runControlLoop();
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
    runEmployeeCommands() {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this.currentState) {
                case ControllerState_1.default.EMPLOYEE_CREATION:
                    console.log(">>> Iniciando criação de Funcionário");
                    yield this.dataManager.addEmployee();
                    this.currentState = ControllerState_1.default.EMPLOYEE_MENU;
                    this.runControlLoop();
                    break;
                case ControllerState_1.default.EMPLOYEE_LISTING:
                    this.dataManager.listEmployees();
                    this.currentState = ControllerState_1.default.EMPLOYEE_MENU;
                    this.runControlLoop();
                    break;
                default:
                    console.log(">>> Comando desconhecido");
                    this.currentState = ControllerState_1.default.RESET;
                    this.runControlLoop();
            }
        });
    }
    runClientCommands() {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this.currentState) {
                case ControllerState_1.default.CLIENT_CREATION:
                    console.log(">>> Iniciando criação de Cliente");
                    this.appData.addClient(yield this.objFactory.startClientCreation());
                    this.currentState = ControllerState_1.default.CLIENT_MENU;
                    this.runControlLoop();
                    break;
                case ControllerState_1.default.CLIENT_LISTING:
                    console.log(">>> Listando Clientes");
                    console.log(this.appData.listClients());
                    this.currentState = ControllerState_1.default.CLIENT_MENU;
                    this.runControlLoop();
                    break;
                default:
                    console.log(">>> Comando desconhecido");
                    this.currentState = ControllerState_1.default.RESET;
                    this.runControlLoop();
            }
        });
    }
}
exports.default = MainController;
