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
const Funcionario_1 = __importDefault(require("../objects/classes/Funcionario"));
const ControllerState_1 = __importDefault(require("./ControllerState"));
const DataManager_1 = __importDefault(require("./DataManager"));
const InputHandler_1 = __importDefault(require("./InputHandler"));
const MenuRenderer_1 = __importDefault(require("./MenuRenderer"));
const EmployeeController_1 = __importDefault(require("./EmployeeController"));
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
                case ControllerState_1.default.EMPLOYEE_MENU:
                case ControllerState_1.default.CLIENT_MENU:
                case ControllerState_1.default.EMPLOYEE_EDITING:
                case ControllerState_1.default.EMPLOYEE_ROLES_MENU:
                    this.displayMenu();
                    yield this.startCommandInput("Insira comando: ");
                    break;
                case ControllerState_1.default.EMPLOYEE_CREATION:
                case ControllerState_1.default.EMPLOYEE_LISTING:
                case ControllerState_1.default.EMPLOYEE_SELECTION:
                case ControllerState_1.default.EMPLOYEE_EDIT_LIST:
                case ControllerState_1.default.EMPLOYEE_EDIT_NAME:
                case ControllerState_1.default.EMPLOYEE_EDIT_PHONE:
                case ControllerState_1.default.EMPLOYEE_EDIT_SALARY:
                case ControllerState_1.default.EMPLOYEE_EDIT_CPF:
                case ControllerState_1.default.EMPLOYEE_ROLES_CREATION:
                case ControllerState_1.default.EMPLOYEE_ROLES_REMOVAL:
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
                            this.currentState = ControllerState_1.default.EMPLOYEE_MENU;
                            break;
                        case ControllerState_1.default.CLIENT_MENU:
                            this.currentState = ControllerState_1.default.CLIENT_MENU;
                            break;
                        case ControllerState_1.default.SHUTDOWN:
                            this.currentState = ControllerState_1.default.SHUTDOWN;
                            break;
                        default:
                            console.log(">>> Comando desconhecido");
                            this.currentState = ControllerState_1.default.RESET;
                    }
                    break;
                case ControllerState_1.default.EMPLOYEE_MENU:
                    switch (input) {
                        case ControllerState_1.default.EMPLOYEE_CREATION:
                            this.currentState = ControllerState_1.default.EMPLOYEE_CREATION;
                            break;
                        case ControllerState_1.default.EMPLOYEE_LISTING:
                            this.currentState = ControllerState_1.default.EMPLOYEE_LISTING;
                            break;
                        case ControllerState_1.default.MAIN_MENU:
                            this.currentState = ControllerState_1.default.MAIN_MENU;
                            break;
                        case ControllerState_1.default.SHUTDOWN:
                            this.currentState = ControllerState_1.default.SHUTDOWN;
                            break;
                        default:
                            console.log(">>> Comando desconhecido");
                            this.currentState = ControllerState_1.default.RESET;
                    }
                    break;
                case ControllerState_1.default.EMPLOYEE_EDITING:
                    switch (input) {
                        case ControllerState_1.default.EMPLOYEE_EDIT_LIST:
                        case ControllerState_1.default.EMPLOYEE_EDIT_NAME:
                        case ControllerState_1.default.EMPLOYEE_EDIT_PHONE:
                        case ControllerState_1.default.EMPLOYEE_EDIT_SALARY:
                        case ControllerState_1.default.EMPLOYEE_EDIT_CPF:
                            this.currentState = yield this.delegateEmployeeEditing(input);
                            break;
                        case ControllerState_1.default.EMPLOYEE_ROLES_MENU:
                            this.currentState = ControllerState_1.default.EMPLOYEE_ROLES_MENU;
                            break;
                        case ControllerState_1.default.MAIN_MENU:
                            this.currentState = ControllerState_1.default.MAIN_MENU;
                            break;
                        case ControllerState_1.default.SHUTDOWN:
                            this.currentState = ControllerState_1.default.SHUTDOWN;
                            break;
                        default:
                            console.log(">>> Comando desconhecido");
                            this.currentState = ControllerState_1.default.RESET;
                    }
                    break;
                case ControllerState_1.default.CLIENT_MENU:
                    switch (input) {
                        case ControllerState_1.default.CLIENT_CREATION:
                            this.currentState = ControllerState_1.default.CLIENT_CREATION;
                            break;
                        case ControllerState_1.default.CLIENT_LISTING:
                            this.currentState = ControllerState_1.default.CLIENT_LISTING;
                            break;
                        case ControllerState_1.default.MAIN_MENU:
                            this.currentState = ControllerState_1.default.MAIN_MENU;
                            break;
                        case ControllerState_1.default.SHUTDOWN:
                            this.currentState = ControllerState_1.default.SHUTDOWN;
                            break;
                        default:
                            console.log(">>> Comando desconhecido");
                            this.currentState = ControllerState_1.default.RESET;
                    }
                    break;
                case ControllerState_1.default.EMPLOYEE_ROLES_MENU:
                    switch (input) {
                        case ControllerState_1.default.EMPLOYEE_ROLES_CREATION:
                        case ControllerState_1.default.EMPLOYEE_ROLES_REMOVAL:
                        case ControllerState_1.default.EMPLOYEE_EDITING:
                            this.currentState = yield this.delegateEmployeeEditing(input);
                            break;
                        case ControllerState_1.default.MAIN_MENU:
                            this.currentState = ControllerState_1.default.MAIN_MENU;
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
    delegateEmployeeEditing(initialState) {
        return __awaiter(this, void 0, void 0, function* () {
            let editedEmployee = this.dataManager.getEditedEmployee();
            if (editedEmployee instanceof Funcionario_1.default) {
                this.employeeController = new EmployeeController_1.default(initialState, editedEmployee, this.dataManager);
                return yield this.employeeController.runEmployeeCommands();
            }
            else {
                console.log(">>> Não foi possível encontrar o Funcionário");
                return ControllerState_1.default.RESET;
            }
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
                    yield this.dataManager.addEmployee();
                    this.currentState = ControllerState_1.default.EMPLOYEE_MENU;
                    this.runControlLoop();
                    break;
                case ControllerState_1.default.EMPLOYEE_LISTING:
                    this.dataManager.listEmployees();
                    if (this.dataManager.getEmployees().length === 0) {
                        console.log(">>> Voltando ao Menu de Funcionários");
                        this.currentState = ControllerState_1.default.EMPLOYEE_MENU;
                    }
                    else {
                        this.currentState = ControllerState_1.default.EMPLOYEE_SELECTION;
                    }
                    this.runControlLoop();
                    break;
                case ControllerState_1.default.EMPLOYEE_SELECTION:
                    let selectedIndex = yield this.inputHandler.getNumberInput("Selecione um Funcionário: ");
                    let parsedIndex = selectedIndex - 1;
                    if (parsedIndex >= 0
                        && parsedIndex < this.dataManager.getEmployees().length) {
                        console.log(`>>> Funcionário ${selectedIndex} selecionado`);
                        this.dataManager.setEditedEmployee(parsedIndex);
                        this.currentState = ControllerState_1.default.EMPLOYEE_EDITING;
                    }
                    else {
                        console.log(">>> Funcionário inválido");
                    }
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
                    yield this.dataManager.addClient();
                    this.currentState = ControllerState_1.default.CLIENT_MENU;
                    this.runControlLoop();
                    break;
                case ControllerState_1.default.CLIENT_LISTING:
                    this.dataManager.listClients();
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
