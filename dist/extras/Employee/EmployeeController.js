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
const Funcionario_1 = __importDefault(require("../../objects/classes/Funcionario"));
const Cargo_1 = __importDefault(require("../../objects/classes/Cargo"));
const MenuRenderer_1 = __importDefault(require("../Commons/MenuRenderer"));
const ControllerState_1 = __importDefault(require("../Main/ControllerState"));
const InputHandler_1 = __importDefault(require("../Commons/InputHandler"));
const EmployeeControllerState_1 = __importDefault(require("./EmployeeControllerState"));
const EmployeeControlParser_1 = __importDefault(require("./EmployeeControlParser"));
class EmployeeController {
    constructor(dataManager) {
        this.currentState = EmployeeControllerState_1.default.EMPLOYEE_MENU;
        this.inputHandler = new InputHandler_1.default();
        this.menuRenderer = new MenuRenderer_1.default();
        this.controlParser = new EmployeeControlParser_1.default();
        this.dataManager = dataManager;
        this.employeeInEditing = new Funcionario_1.default("", "", "", "", NaN);
    }
    listEmployeesOperation() {
        this.dataManager.listEmployees();
        if (this.dataManager.getEmployees().length === 0) {
            console.log(">>> Voltando ao Menu de Funcionários");
            this.currentState = EmployeeControllerState_1.default.EMPLOYEE_MENU;
            return this.runEmployeeCommands();
        }
        else {
            this.currentState = EmployeeControllerState_1.default.EMPLOYEE_SELECTION;
            return this.runEmployeeCommands();
        }
    }
    selectEmployeeOperation() {
        return __awaiter(this, void 0, void 0, function* () {
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
                this.currentState = EmployeeControllerState_1.default.EMPLOYEE_EDITING;
            }
            else {
                console.log(">>> Funcionário inválido");
            }
            return this.runEmployeeCommands();
        });
    }
    removeEmployeeRoleOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.employeeInEditing.cargos.length == 1) {
                console.log(">>> O Funcionário possui apenas um Cargo, portanto não é possível remover Cargos");
                console.log(">>> Voltando para o Menu de Editar Cargos do Funcionário");
                this.currentState = EmployeeControllerState_1.default.EMPLOYEE_ROLES_MENU;
                return this.runEmployeeCommands();
            }
            else {
                let employeeRoles = this.dataManager.listEditedEmployeeRoles(this.employeeInEditing);
                if (employeeRoles === "") {
                    console.log(">>> ERRO FATAL: O Funcionário não possui nenhum Cargo");
                    console.log(">>> O programa será encerrado");
                    this.currentState = EmployeeControllerState_1.default.SHUTDOWN;
                    return this.runEmployeeCommands();
                }
                else {
                    console.log(`O Funcionário possui os seguintes Cargos: ${employeeRoles}`);
                    let removedRoleName = yield this.inputHandler.getStringInput("Insira o nome do Cargo a remover: ");
                    let removedRole = this.dataManager.removeEditedEmployeeRole(removedRoleName);
                    if (removedRole) {
                        console.log(">>> Cargo removido com sucesso");
                        this.currentState = EmployeeControllerState_1.default.EMPLOYEE_ROLES_MENU;
                        return this.runEmployeeCommands();
                    }
                    else {
                        console.log(">>> O Funcionário não possui o Cargo escolhido");
                        return this.runEmployeeCommands();
                    }
                }
            }
        });
    }
    createEmployeeRoleOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(">>> Iniciando adição de novo Cargo");
            let employeeRoles = this.dataManager.listEditedEmployeeRoles(this.employeeInEditing);
            console.log(`O Funcionário possui os seguintes Cargos: ${employeeRoles}`);
            let newRoleName = yield this.inputHandler.getStringInput("Insira o nome do Cargo a adicionar: ");
            let newRole = new Cargo_1.default(newRoleName);
            this.employeeInEditing.cargos.push(newRole);
            console.log(">>> Cargo adicionado com sucesso");
            this.currentState = EmployeeControllerState_1.default.EMPLOYEE_ROLES_MENU;
            return this.runEmployeeCommands();
        });
    }
    editEmployeeCpfOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`CPF atual do Funcionário: ${this.employeeInEditing.cpf}`);
            let newCPF = yield this.inputHandler.getStringInput("Insira o novo CPF do Funcionário: ");
            this.employeeInEditing.cpf = newCPF;
            console.log(">>> CPF atualizado com sucesso");
            this.currentState = EmployeeControllerState_1.default.EMPLOYEE_EDITING;
            return this.runEmployeeCommands();
        });
    }
    editEmployeeSalaryOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Salário atual do Funcionário: ${this.employeeInEditing.salario}`);
            let newSalary = yield this.inputHandler.getNumberInput("Insira o novo Salário do Funcionário: ");
            this.employeeInEditing.salario = newSalary;
            console.log(">>> Salário atualizado com sucesso");
            this.currentState = EmployeeControllerState_1.default.EMPLOYEE_EDITING;
            return this.runEmployeeCommands();
        });
    }
    editEmployeePhoneOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Telefone atual do Funcionário: ${this.employeeInEditing.telefone}`);
            let newPhone = yield this.inputHandler.getStringInput("Insira o novo Telefone do Funcionário: ");
            this.employeeInEditing.telefone = newPhone;
            console.log(">>> Telefone atualizado com sucesso");
            this.currentState = EmployeeControllerState_1.default.EMPLOYEE_EDITING;
            return this.runEmployeeCommands();
        });
    }
    editEmployeeNameOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Nome atual do Funcionário: ${this.employeeInEditing.nome}`);
            let newName = yield this.inputHandler.getStringInput("Insira o novo Nome do Funcionário: ");
            this.employeeInEditing.nome = newName;
            console.log(">>> Nome atualizado com sucesso");
            this.currentState = EmployeeControllerState_1.default.EMPLOYEE_EDITING;
            return this.runEmployeeCommands();
        });
    }
    runEmployeeCommands() {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this.currentState) {
                case EmployeeControllerState_1.default.RETURN_TO_MAIN:
                    return ControllerState_1.default.MAIN_MENU;
                case EmployeeControllerState_1.default.SHUTDOWN:
                    return ControllerState_1.default.SHUTDOWN;
                case EmployeeControllerState_1.default.RESET:
                    console.log(">>> Voltando ao Menu de Funcionários");
                    this.currentState = EmployeeControllerState_1.default.EMPLOYEE_MENU;
                    return this.runEmployeeCommands();
                case EmployeeControllerState_1.default.EMPLOYEE_MENU:
                case EmployeeControllerState_1.default.EMPLOYEE_EDITING:
                case EmployeeControllerState_1.default.EMPLOYEE_ROLES_MENU:
                    this.displayMenu();
                    yield this.startCommandInput("Insira comando: ");
                    return this.runEmployeeCommands();
                case EmployeeControllerState_1.default.EMPLOYEE_LISTING:
                    return this.listEmployeesOperation();
                case EmployeeControllerState_1.default.EMPLOYEE_SELECTION:
                    return yield this.selectEmployeeOperation();
                case EmployeeControllerState_1.default.EMPLOYEE_CREATION:
                    yield this.dataManager.addEmployee();
                    this.currentState = EmployeeControllerState_1.default.EMPLOYEE_MENU;
                    return this.runEmployeeCommands();
                case EmployeeControllerState_1.default.EMPLOYEE_EDIT_NAME:
                    return yield this.editEmployeeNameOperation();
                case EmployeeControllerState_1.default.EMPLOYEE_EDIT_PHONE:
                    return yield this.editEmployeePhoneOperation();
                case EmployeeControllerState_1.default.EMPLOYEE_EDIT_SALARY:
                    return yield this.editEmployeeSalaryOperation();
                case EmployeeControllerState_1.default.EMPLOYEE_EDIT_CPF:
                    return yield this.editEmployeeCpfOperation();
                case EmployeeControllerState_1.default.EMPLOYEE_EDIT_LIST:
                    console.log(this.dataManager.listEditedEmployeeInfo());
                    this.currentState = EmployeeControllerState_1.default.EMPLOYEE_EDITING;
                    return this.runEmployeeCommands();
                case EmployeeControllerState_1.default.EMPLOYEE_ROLES_CREATION:
                    return yield this.createEmployeeRoleOperation();
                case EmployeeControllerState_1.default.EMPLOYEE_ROLES_REMOVAL:
                    return yield this.removeEmployeeRoleOperation();
                default:
                    console.log(">>> Comando desconhecido");
                    this.currentState = EmployeeControllerState_1.default.RESET;
                    return this.runEmployeeCommands();
            }
        });
    }
    displayMenu() {
        let renderResult = this.menuRenderer.renderEmployeeMenus(this.currentState);
        if (!renderResult) {
            console.log(">>> Menu desconhecido");
            console.log(">>> Voltando para o Menu de Editar Funcionário");
            this.currentState = EmployeeControllerState_1.default.EMPLOYEE_EDITING;
        }
    }
    startCommandInput(prompt) {
        return __awaiter(this, void 0, void 0, function* () {
            let receivedInput = yield this.inputHandler.getNumberInput(prompt);
            this.currentState = yield this.controlParser.parseInputForState(this.currentState, receivedInput);
        });
    }
}
exports.default = EmployeeController;
