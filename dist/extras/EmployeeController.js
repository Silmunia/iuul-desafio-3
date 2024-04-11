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
const Cargo_1 = __importDefault(require("../objects/classes/Cargo"));
const ControllerState_1 = __importDefault(require("./ControllerState"));
const InputHandler_1 = __importDefault(require("./InputHandler"));
class EmployeeController {
    constructor(initialState, editedEmployee, dataManager) {
        this.inputHandler = new InputHandler_1.default();
        this.currentState = initialState;
        this.employeeInEditing = editedEmployee;
        this.dataManager = dataManager;
    }
    runEmployeeCommands() {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this.currentState) {
                case ControllerState_1.default.EMPLOYEE_EDIT_NAME:
                    console.log(`Nome atual do Funcionário: ${this.employeeInEditing.nome}`);
                    let newName = yield this.inputHandler.getStringInput("Insira o novo Nome do Funcionário: ");
                    this.employeeInEditing.nome = newName;
                    console.log(">>> Nome atualizado com sucesso");
                    return ControllerState_1.default.EMPLOYEE_EDITING;
                case ControllerState_1.default.EMPLOYEE_EDIT_PHONE:
                    console.log(`Telefone atual do Funcionário: ${this.employeeInEditing.telefone}`);
                    let newPhone = yield this.inputHandler.getStringInput("Insira o novo Telefone do Funcionário: ");
                    this.employeeInEditing.telefone = newPhone;
                    console.log(">>> Telefone atualizado com sucesso");
                    return ControllerState_1.default.EMPLOYEE_EDITING;
                case ControllerState_1.default.EMPLOYEE_EDIT_SALARY:
                    console.log(`Salário atual do Funcionário: ${this.employeeInEditing.salario}`);
                    let newSalary = yield this.inputHandler.getNumberInput("Insira o novo Salário do Funcionário: ");
                    this.employeeInEditing.salario = newSalary;
                    console.log(">>> Salário atualizado com sucesso");
                    return ControllerState_1.default.EMPLOYEE_EDITING;
                case ControllerState_1.default.EMPLOYEE_EDIT_CPF:
                    console.log(`CPF atual do Funcionário: ${this.employeeInEditing.cpf}`);
                    let newCPF = yield this.inputHandler.getStringInput("Insira o novo CPF do Funcionário: ");
                    this.employeeInEditing.cpf = newCPF;
                    console.log(">>> CPF atualizado com sucesso");
                    return ControllerState_1.default.EMPLOYEE_EDITING;
                case ControllerState_1.default.EMPLOYEE_EDIT_LIST:
                    console.log(this.dataManager.listEditedEmployeeInfo());
                    return ControllerState_1.default.EMPLOYEE_EDITING;
                case ControllerState_1.default.EMPLOYEE_ROLES_CREATION:
                    console.log(">>> Iniciando adição de novo Cargo");
                    let employeeRoles = this.dataManager.listEditedEmployeeRoles(this.employeeInEditing);
                    console.log(`O Funcionário possui os seguintes Cargos: ${employeeRoles}`);
                    let newRoleName = yield this.inputHandler.getStringInput("Insira o nome do Cargo a adicionar: ");
                    let newRole = new Cargo_1.default(newRoleName);
                    this.employeeInEditing.cargos.push(newRole);
                    console.log(">>> Cargo adicionado com sucesso");
                    return ControllerState_1.default.EMPLOYEE_ROLES_MENU;
                case ControllerState_1.default.EMPLOYEE_ROLES_REMOVAL:
                    if (this.employeeInEditing.cargos.length == 1) {
                        console.log(">>> O Funcionário possui apenas um Cargo, portanto não é possível remover Cargos");
                        console.log(">>> Voltando para o Menu de Editar Cargos do Funcionário");
                        return ControllerState_1.default.EMPLOYEE_ROLES_MENU;
                    }
                    else {
                        let employeeRoles = this.dataManager.listEditedEmployeeRoles(this.employeeInEditing);
                        if (employeeRoles === "") {
                            console.log(">>> ERRO FATAL: O Funcionário não possui nenhum Cargo");
                            console.log(">>> O programa será encerrado");
                            return ControllerState_1.default.SHUTDOWN;
                        }
                        else {
                            console.log(`O Funcionário possui os seguintes Cargos: ${employeeRoles}`);
                            let removedRoleName = yield this.inputHandler.getStringInput("Insira o nome do Cargo a remover: ");
                            let removedRole = this.dataManager.removeEditedEmployeeRole(removedRoleName);
                            if (removedRole) {
                                console.log(">>> Cargo removido com sucesso");
                                return ControllerState_1.default.EMPLOYEE_ROLES_MENU;
                            }
                            else {
                                console.log(">>> O Funcionário não possui o Cargo escolhido");
                                return this.runEmployeeCommands();
                            }
                        }
                    }
                default:
                    console.log(">>> Comando desconhecido");
                    return ControllerState_1.default.RESET;
            }
        });
    }
}
exports.default = EmployeeController;
