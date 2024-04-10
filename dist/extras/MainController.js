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
const Cargo_1 = __importDefault(require("../objects/classes/Cargo"));
const ControllerState_1 = __importDefault(require("./ControllerState"));
const DataManager_1 = __importDefault(require("./DataManager"));
const InputHandler_1 = __importDefault(require("./InputHandler"));
const MenuRenderer_1 = __importDefault(require("./MenuRenderer"));
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
                    this.startCommandInput("Insira comando: ");
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
            this.currentState = this.parseInputForState(receivedInput);
            this.runControlLoop();
        });
    }
    parseInputForState(input) {
        switch (this.currentState) {
            case ControllerState_1.default.MAIN_MENU:
                switch (input) {
                    case ControllerState_1.default.EMPLOYEE_MENU:
                        return ControllerState_1.default.EMPLOYEE_MENU;
                    case ControllerState_1.default.CLIENT_MENU:
                        return ControllerState_1.default.CLIENT_MENU;
                    case ControllerState_1.default.SHUTDOWN:
                        return ControllerState_1.default.SHUTDOWN;
                    default:
                        console.log(">>> Comando desconhecido");
                        return ControllerState_1.default.RESET;
                }
            case ControllerState_1.default.EMPLOYEE_MENU:
                switch (input) {
                    case ControllerState_1.default.EMPLOYEE_CREATION:
                        return ControllerState_1.default.EMPLOYEE_CREATION;
                    case ControllerState_1.default.EMPLOYEE_LISTING:
                        return ControllerState_1.default.EMPLOYEE_LISTING;
                    case ControllerState_1.default.MAIN_MENU:
                        return ControllerState_1.default.MAIN_MENU;
                    case ControllerState_1.default.SHUTDOWN:
                        return ControllerState_1.default.SHUTDOWN;
                    default:
                        console.log(">>> Comando desconhecido");
                        return ControllerState_1.default.RESET;
                }
            case ControllerState_1.default.EMPLOYEE_EDITING:
                switch (input) {
                    case ControllerState_1.default.EMPLOYEE_EDIT_LIST:
                        return ControllerState_1.default.EMPLOYEE_EDIT_LIST;
                    case ControllerState_1.default.EMPLOYEE_EDIT_NAME:
                        return ControllerState_1.default.EMPLOYEE_EDIT_NAME;
                    case ControllerState_1.default.EMPLOYEE_EDIT_PHONE:
                        return ControllerState_1.default.EMPLOYEE_EDIT_PHONE;
                    case ControllerState_1.default.EMPLOYEE_EDIT_SALARY:
                        return ControllerState_1.default.EMPLOYEE_EDIT_SALARY;
                    case ControllerState_1.default.EMPLOYEE_EDIT_CPF:
                        return ControllerState_1.default.EMPLOYEE_EDIT_CPF;
                    case ControllerState_1.default.EMPLOYEE_ROLES_MENU:
                        return ControllerState_1.default.EMPLOYEE_ROLES_MENU;
                    case ControllerState_1.default.MAIN_MENU:
                        return ControllerState_1.default.MAIN_MENU;
                    case ControllerState_1.default.SHUTDOWN:
                        return ControllerState_1.default.SHUTDOWN;
                    default:
                        console.log(">>> Comando desconhecido");
                        return ControllerState_1.default.RESET;
                }
            case ControllerState_1.default.CLIENT_MENU:
                switch (input) {
                    case ControllerState_1.default.CLIENT_CREATION:
                        return ControllerState_1.default.CLIENT_CREATION;
                    case ControllerState_1.default.CLIENT_LISTING:
                        return ControllerState_1.default.CLIENT_LISTING;
                    case ControllerState_1.default.MAIN_MENU:
                        return ControllerState_1.default.MAIN_MENU;
                    case ControllerState_1.default.SHUTDOWN:
                        return ControllerState_1.default.SHUTDOWN;
                    default:
                        console.log(">>> Comando desconhecido");
                        return ControllerState_1.default.RESET;
                }
            case ControllerState_1.default.EMPLOYEE_ROLES_MENU:
                switch (input) {
                    case ControllerState_1.default.EMPLOYEE_ROLES_CREATION:
                        return ControllerState_1.default.EMPLOYEE_ROLES_CREATION;
                    case ControllerState_1.default.EMPLOYEE_ROLES_REMOVAL:
                        return ControllerState_1.default.EMPLOYEE_ROLES_REMOVAL;
                    case ControllerState_1.default.EMPLOYEE_EDITING:
                        return ControllerState_1.default.EMPLOYEE_EDITING;
                    case ControllerState_1.default.MAIN_MENU:
                        return ControllerState_1.default.MAIN_MENU;
                    case ControllerState_1.default.SHUTDOWN:
                        return ControllerState_1.default.SHUTDOWN;
                    default:
                        console.log(">>> Comando desconhecido");
                        return ControllerState_1.default.RESET;
                }
            default:
                console.log(">>> Comando desconhecido");
                return ControllerState_1.default.RESET;
        }
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
                case ControllerState_1.default.EMPLOYEE_EDIT_NAME:
                    let editEmployeeName = this.dataManager.getEditedEmployee();
                    if (editEmployeeName instanceof Funcionario_1.default) {
                        console.log(`Nome atual do Funcionário: ${editEmployeeName.nome}`);
                        let newName = yield this.inputHandler.getStringInput("Insira o novo Nome do Funcionário: ");
                        editEmployeeName.nome = newName;
                        console.log(">>> Nome atualizado com sucesso");
                        this.currentState = ControllerState_1.default.EMPLOYEE_EDITING;
                    }
                    else {
                        console.log(">>> Não foi possível encontrar o Funcionário");
                        this.currentState = ControllerState_1.default.RESET;
                    }
                    this.runControlLoop();
                    break;
                case ControllerState_1.default.EMPLOYEE_EDIT_PHONE:
                    let editEmployeePhone = this.dataManager.getEditedEmployee();
                    if (editEmployeePhone instanceof Funcionario_1.default) {
                        console.log(`Telefone atual do Funcionário: ${editEmployeePhone.telefone}`);
                        let newPhone = yield this.inputHandler.getStringInput("Insira o novo Telefone do Funcionário: ");
                        editEmployeePhone.telefone = newPhone;
                        console.log(">>> Telefone atualizado com sucesso");
                        this.currentState = ControllerState_1.default.EMPLOYEE_EDITING;
                    }
                    else {
                        console.log(">>> Não foi possível encontrar o Funcionário");
                        this.currentState = ControllerState_1.default.RESET;
                    }
                    this.runControlLoop();
                    break;
                case ControllerState_1.default.EMPLOYEE_EDIT_SALARY:
                    let editEmployeeSalary = this.dataManager.getEditedEmployee();
                    if (editEmployeeSalary instanceof Funcionario_1.default) {
                        console.log(`Salário atual do Funcionário: ${editEmployeeSalary.salario}`);
                        let newSalary = yield this.inputHandler.getNumberInput("Insira o novo Salário do Funcionário: ");
                        editEmployeeSalary.salario = newSalary;
                        console.log(">>> Salário atualizado com sucesso");
                        this.currentState = ControllerState_1.default.EMPLOYEE_EDITING;
                    }
                    else {
                        console.log(">>> Não foi possível encontrar o Funcionário");
                        this.currentState = ControllerState_1.default.RESET;
                    }
                    this.runControlLoop();
                    break;
                case ControllerState_1.default.EMPLOYEE_EDIT_CPF:
                    let editEmployeeCPF = this.dataManager.getEditedEmployee();
                    if (editEmployeeCPF instanceof Funcionario_1.default) {
                        console.log(`CPF atual do Funcionário: ${editEmployeeCPF.cpf}`);
                        let newCPF = yield this.inputHandler.getStringInput("Insira o novo CPF do Funcionário: ");
                        editEmployeeCPF.cpf = newCPF;
                        console.log(">>> CPF atualizado com sucesso");
                        this.currentState = ControllerState_1.default.EMPLOYEE_EDITING;
                    }
                    else {
                        console.log(">>> Não foi possível encontrar o Funcionário");
                        this.currentState = ControllerState_1.default.RESET;
                    }
                    this.runControlLoop();
                    break;
                case ControllerState_1.default.EMPLOYEE_EDIT_LIST:
                    console.log(this.dataManager.listEditedEmployeeInfo());
                    this.currentState = ControllerState_1.default.EMPLOYEE_EDITING;
                    this.runControlLoop();
                    break;
                case ControllerState_1.default.EMPLOYEE_ROLES_CREATION:
                    console.log(">>> Iniciando adição de novo Cargo");
                    let addRoleEmployee = this.dataManager.getEditedEmployee();
                    let employeeRoles = this.dataManager.listEditedEmployeeRoles(addRoleEmployee);
                    if (employeeRoles === "") {
                        console.log(">>> ERRO FATAL: O Funcionário não possui nenhum Cargo");
                        console.log(">>> O programa será encerrado");
                        this.currentState = ControllerState_1.default.SHUTDOWN;
                        this.runControlLoop();
                    }
                    else {
                        console.log(`O Funcionário possui os seguintes Cargos: ${employeeRoles}`);
                        let newRoleName = yield this.inputHandler.getStringInput("Insira o nome do Cargo a adicionar: ");
                        let newRole = new Cargo_1.default(newRoleName);
                        addRoleEmployee === null || addRoleEmployee === void 0 ? void 0 : addRoleEmployee.cargos.push(newRole);
                        console.log(">>> Cargo adicionado com sucesso");
                        this.currentState = ControllerState_1.default.EMPLOYEE_ROLES_MENU;
                        this.runControlLoop();
                    }
                    break;
                case ControllerState_1.default.EMPLOYEE_ROLES_REMOVAL:
                    let removeRoleEmployee = this.dataManager.getEditedEmployee();
                    if ((removeRoleEmployee === null || removeRoleEmployee === void 0 ? void 0 : removeRoleEmployee.cargos.length) == 1) {
                        console.log(">>> O Funcionário possui apenas um Cargo, portanto não é possível remover Cargos");
                        console.log(">>> Voltando para o Menu de Editar Cargos do Funcionário");
                        this.currentState = ControllerState_1.default.EMPLOYEE_ROLES_MENU;
                        this.runControlLoop();
                    }
                    else {
                        let employeeRoles = this.dataManager.listEditedEmployeeRoles(removeRoleEmployee);
                        if (employeeRoles === "") {
                            console.log(">>> ERRO FATAL: O Funcionário não possui nenhum Cargo");
                            console.log(">>> O programa será encerrado");
                            this.currentState = ControllerState_1.default.SHUTDOWN;
                            this.runControlLoop();
                        }
                        else {
                            console.log(`O Funcionário possui os seguintes Cargos: ${employeeRoles}`);
                            let removedRoleName = yield this.inputHandler.getStringInput("Insira o nome do Cargo a remover: ");
                            let removedRole = this.dataManager.removeEditedEmployeeRole(removedRoleName);
                            if (removedRole) {
                                console.log(">>> Cargo removido com sucesso");
                                this.currentState = ControllerState_1.default.EMPLOYEE_ROLES_MENU;
                            }
                            else {
                                console.log(">>> O Funcionário não possui o Cargo escolhido");
                            }
                            this.runControlLoop();
                        }
                    }
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
