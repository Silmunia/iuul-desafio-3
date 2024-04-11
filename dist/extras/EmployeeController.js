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
const MenuRenderer_1 = __importDefault(require("./MenuRenderer"));
const ControllerState_1 = __importDefault(require("./ControllerState"));
const InputHandler_1 = __importDefault(require("./InputHandler"));
class EmployeeController {
    constructor(initialState, editedEmployee, dataManager) {
        this.inputHandler = new InputHandler_1.default();
        this.menuRenderer = new MenuRenderer_1.default();
        this.currentState = initialState;
        this.dataManager = dataManager;
        if (editedEmployee instanceof Funcionario_1.default) {
            this.employeeInEditing = editedEmployee;
        }
        else {
            this.employeeInEditing = new Funcionario_1.default("", "", "", "", NaN);
        }
    }
    runEmployeeCommands() {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this.currentState) {
                case ControllerState_1.default.MAIN_MENU:
                    return ControllerState_1.default.MAIN_MENU;
                case ControllerState_1.default.SHUTDOWN:
                    return ControllerState_1.default.SHUTDOWN;
                case ControllerState_1.default.RESET:
                    console.log(">>> Voltando ao Menu de Funcionários");
                    this.currentState = ControllerState_1.default.EMPLOYEE_MENU;
                    return this.runEmployeeCommands();
                case ControllerState_1.default.EMPLOYEE_MENU:
                case ControllerState_1.default.EMPLOYEE_EDITING:
                case ControllerState_1.default.EMPLOYEE_ROLES_MENU:
                    this.displayMenu();
                    yield this.startCommandInput("Insira comando: ");
                    return this.runEmployeeCommands();
                case ControllerState_1.default.EMPLOYEE_LISTING:
                    this.dataManager.listEmployees();
                    if (this.dataManager.getEmployees().length === 0) {
                        console.log(">>> Voltando ao Menu de Funcionários");
                        this.currentState = ControllerState_1.default.EMPLOYEE_MENU;
                        return this.runEmployeeCommands();
                    }
                    else {
                        this.currentState = ControllerState_1.default.EMPLOYEE_SELECTION;
                        return this.runEmployeeCommands();
                    }
                case ControllerState_1.default.EMPLOYEE_SELECTION:
                    let selectedIndex = yield this.inputHandler.getNumberInput("Selecione um Funcionário: ");
                    let parsedIndex = selectedIndex - 1;
                    if (parsedIndex >= 0
                        && parsedIndex < this.dataManager.getEmployees().length) {
                        console.log(`>>> Funcionário ${selectedIndex} selecionado`);
                        this.dataManager.setEditedEmployee(parsedIndex);
                        let selectedEmployee = this.dataManager.getEditedEmployee();
                        if (selectedEmployee instanceof Funcionario_1.default) {
                            this.employeeInEditing = selectedEmployee;
                        }
                        else {
                            console.log(">>> Não foi possível encontrar o Funcionário selecionado");
                        }
                        this.currentState = ControllerState_1.default.EMPLOYEE_EDITING;
                    }
                    else {
                        console.log(">>> Funcionário inválido");
                    }
                    return this.runEmployeeCommands();
                case ControllerState_1.default.EMPLOYEE_CREATION:
                    yield this.dataManager.addEmployee();
                    this.currentState = ControllerState_1.default.EMPLOYEE_MENU;
                    return this.runEmployeeCommands();
                case ControllerState_1.default.EMPLOYEE_LISTING:
                    this.dataManager.listEmployees();
                    if (this.dataManager.getEmployees().length === 0) {
                        console.log(">>> Voltando ao Menu de Funcionários");
                        this.currentState = ControllerState_1.default.EMPLOYEE_MENU;
                        return this.runEmployeeCommands();
                    }
                    else {
                        this.currentState = ControllerState_1.default.EMPLOYEE_SELECTION;
                        return this.runEmployeeCommands();
                    }
                case ControllerState_1.default.EMPLOYEE_EDIT_NAME:
                    console.log(`Nome atual do Funcionário: ${this.employeeInEditing.nome}`);
                    let newName = yield this.inputHandler.getStringInput("Insira o novo Nome do Funcionário: ");
                    this.employeeInEditing.nome = newName;
                    console.log(">>> Nome atualizado com sucesso");
                    this.currentState = ControllerState_1.default.EMPLOYEE_EDITING;
                    return this.runEmployeeCommands();
                case ControllerState_1.default.EMPLOYEE_EDIT_PHONE:
                    console.log(`Telefone atual do Funcionário: ${this.employeeInEditing.telefone}`);
                    let newPhone = yield this.inputHandler.getStringInput("Insira o novo Telefone do Funcionário: ");
                    this.employeeInEditing.telefone = newPhone;
                    console.log(">>> Telefone atualizado com sucesso");
                    this.currentState = ControllerState_1.default.EMPLOYEE_EDITING;
                    return this.runEmployeeCommands();
                case ControllerState_1.default.EMPLOYEE_EDIT_SALARY:
                    console.log(`Salário atual do Funcionário: ${this.employeeInEditing.salario}`);
                    let newSalary = yield this.inputHandler.getNumberInput("Insira o novo Salário do Funcionário: ");
                    this.employeeInEditing.salario = newSalary;
                    console.log(">>> Salário atualizado com sucesso");
                    this.currentState = ControllerState_1.default.EMPLOYEE_EDITING;
                    return this.runEmployeeCommands();
                case ControllerState_1.default.EMPLOYEE_EDIT_CPF:
                    console.log(`CPF atual do Funcionário: ${this.employeeInEditing.cpf}`);
                    let newCPF = yield this.inputHandler.getStringInput("Insira o novo CPF do Funcionário: ");
                    this.employeeInEditing.cpf = newCPF;
                    console.log(">>> CPF atualizado com sucesso");
                    this.currentState = ControllerState_1.default.EMPLOYEE_EDITING;
                    return this.runEmployeeCommands();
                case ControllerState_1.default.EMPLOYEE_EDIT_LIST:
                    console.log(this.dataManager.listEditedEmployeeInfo());
                    this.currentState = ControllerState_1.default.EMPLOYEE_EDITING;
                    return this.runEmployeeCommands();
                case ControllerState_1.default.EMPLOYEE_ROLES_CREATION:
                    console.log(">>> Iniciando adição de novo Cargo");
                    let employeeRoles = this.dataManager.listEditedEmployeeRoles(this.employeeInEditing);
                    console.log(`O Funcionário possui os seguintes Cargos: ${employeeRoles}`);
                    let newRoleName = yield this.inputHandler.getStringInput("Insira o nome do Cargo a adicionar: ");
                    let newRole = new Cargo_1.default(newRoleName);
                    this.employeeInEditing.cargos.push(newRole);
                    console.log(">>> Cargo adicionado com sucesso");
                    this.currentState = ControllerState_1.default.EMPLOYEE_ROLES_MENU;
                    return this.runEmployeeCommands();
                case ControllerState_1.default.EMPLOYEE_ROLES_REMOVAL:
                    if (this.employeeInEditing.cargos.length == 1) {
                        console.log(">>> O Funcionário possui apenas um Cargo, portanto não é possível remover Cargos");
                        console.log(">>> Voltando para o Menu de Editar Cargos do Funcionário");
                        this.currentState = ControllerState_1.default.EMPLOYEE_ROLES_MENU;
                        return this.runEmployeeCommands();
                    }
                    else {
                        let employeeRoles = this.dataManager.listEditedEmployeeRoles(this.employeeInEditing);
                        if (employeeRoles === "") {
                            console.log(">>> ERRO FATAL: O Funcionário não possui nenhum Cargo");
                            console.log(">>> O programa será encerrado");
                            this.currentState = ControllerState_1.default.SHUTDOWN;
                            return this.runEmployeeCommands();
                        }
                        else {
                            console.log(`O Funcionário possui os seguintes Cargos: ${employeeRoles}`);
                            let removedRoleName = yield this.inputHandler.getStringInput("Insira o nome do Cargo a remover: ");
                            let removedRole = this.dataManager.removeEditedEmployeeRole(removedRoleName);
                            if (removedRole) {
                                console.log(">>> Cargo removido com sucesso");
                                this.currentState = ControllerState_1.default.EMPLOYEE_ROLES_MENU;
                                return this.runEmployeeCommands();
                            }
                            else {
                                console.log(">>> O Funcionário não possui o Cargo escolhido");
                                return this.runEmployeeCommands();
                            }
                        }
                    }
                default:
                    console.log(">>> Comando desconhecido");
                    this.currentState = ControllerState_1.default.RESET;
                    return this.runEmployeeCommands();
            }
        });
    }
    displayMenu() {
        let renderResult = this.menuRenderer.renderMenu(this.currentState);
        if (!renderResult) {
            console.log(">>> Menu desconhecido");
            console.log(">>> Voltando para o Menu de Editar Funcionário");
            this.currentState = ControllerState_1.default.EMPLOYEE_EDITING;
        }
    }
    startCommandInput(prompt) {
        return __awaiter(this, void 0, void 0, function* () {
            let receivedInput = yield this.inputHandler.getNumberInput(prompt);
            yield this.parseInputForState(receivedInput);
        });
    }
    parseInputForState(input) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this.currentState) {
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
                            this.currentState = ControllerState_1.default.EMPLOYEE_EDIT_LIST;
                            break;
                        case ControllerState_1.default.EMPLOYEE_EDIT_NAME:
                            this.currentState = ControllerState_1.default.EMPLOYEE_EDIT_NAME;
                            break;
                        case ControllerState_1.default.EMPLOYEE_EDIT_PHONE:
                            this.currentState = ControllerState_1.default.EMPLOYEE_EDIT_PHONE;
                            break;
                        case ControllerState_1.default.EMPLOYEE_EDIT_SALARY:
                            this.currentState = ControllerState_1.default.EMPLOYEE_EDIT_SALARY;
                            break;
                        case ControllerState_1.default.EMPLOYEE_EDIT_CPF:
                            this.currentState = ControllerState_1.default.EMPLOYEE_EDIT_CPF;
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
                case ControllerState_1.default.EMPLOYEE_ROLES_MENU:
                    switch (input) {
                        case ControllerState_1.default.EMPLOYEE_ROLES_CREATION:
                            this.currentState = ControllerState_1.default.EMPLOYEE_ROLES_CREATION;
                            break;
                        case ControllerState_1.default.EMPLOYEE_ROLES_REMOVAL:
                            this.currentState = ControllerState_1.default.EMPLOYEE_ROLES_REMOVAL;
                            break;
                        case ControllerState_1.default.EMPLOYEE_EDITING:
                            this.currentState = ControllerState_1.default.EMPLOYEE_EDITING;
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
}
exports.default = EmployeeController;
