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
const Cargo_1 = __importDefault(require("../../objects/classes/Cargo"));
const Funcionario_1 = __importDefault(require("../../objects/classes/Funcionario"));
const EmployeeControllerState_1 = __importDefault(require("./EmployeeControllerState"));
const InputHandler_1 = __importDefault(require("../Commons/InputHandler"));
class EmployeeOperator {
    constructor(dataManager) {
        this.inputHandler = new InputHandler_1.default();
        this.dataManager = dataManager;
        this.employeeInEditing = new Funcionario_1.default(new Cargo_1.default(""), "", "", "", NaN);
    }
    createEmployeeOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n>>> Iniciando criação de Funcionário");
            let employeeName = yield this.inputHandler.getStringInput("Insira o nome do Funcionário: ");
            let cpf = yield this.inputHandler.getStringInput("Insira o CPF do Funcionário: ");
            let phone = yield this.inputHandler.getStringInput("Insira o telefone do Funcionário: ");
            let salary = yield this.inputHandler.getNumberInput("Insira o salário do Funcionário: ");
            let roleName = yield this.inputHandler.getStringInput("Insira o cargo inicial do Funcionário: ");
            let numberOfRoles = yield this.inputHandler.getNumberInput("Insira o número de Cargos adicionais do Funcionário: ");
            let additionalRoles = [];
            for (let i = 0; i < numberOfRoles; i++) {
                let newRoleName = yield this.inputHandler.getStringInput(`Insira o nome do Cargo adicional ${i + 1}/${numberOfRoles}: `);
                additionalRoles.push(newRoleName);
            }
            this.dataManager.createEmployee(roleName, cpf, employeeName, phone, salary, additionalRoles);
            return EmployeeControllerState_1.default.EMPLOYEE_MENU;
        });
    }
    listEmployeesOperation() {
        console.log("\n>>> Listando Funcionários");
        console.log(this.dataManager.listEmployees());
        if (this.dataManager.getEmployees().length === 0) {
            console.log(">>> Voltando ao Menu de Funcionários");
            return EmployeeControllerState_1.default.EMPLOYEE_MENU;
        }
        else {
            return EmployeeControllerState_1.default.EMPLOYEE_SELECTION;
        }
    }
    listEmployeeInfoOperation() {
        console.log("\n>>> Listando informações do Funcionário");
        console.log(this.dataManager.listEditedEmployeeInfo());
        return EmployeeControllerState_1.default.EMPLOYEE_EDITING;
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
                    return EmployeeControllerState_1.default.EMPLOYEE_EDITING;
                }
                else {
                    console.log(">>> Não foi possível encontrar o Funcionário selecionado");
                    return EmployeeControllerState_1.default.EMPLOYEE_MENU;
                }
            }
            else {
                console.log(">>> Funcionário inválido");
                return EmployeeControllerState_1.default.EMPLOYEE_MENU;
            }
        });
    }
    removeEmployeeRoleOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.employeeInEditing.cargos.length == 1) {
                console.log("\n>>> O Funcionário possui apenas um Cargo, portanto não é possível remover Cargos");
                console.log(">>> Voltando para o Menu de Editar Cargos do Funcionário");
                return EmployeeControllerState_1.default.EMPLOYEE_ROLES_MENU;
            }
            else {
                let employeeRoles = this.dataManager.listEditedEmployeeRoles(this.employeeInEditing);
                if (employeeRoles === "") {
                    console.log("\n>>> ERRO FATAL: O Funcionário não possui nenhum Cargo");
                    console.log(">>> O programa será encerrado");
                    return EmployeeControllerState_1.default.SHUTDOWN;
                }
                else {
                    console.log(`O Funcionário possui os seguintes Cargos: ${employeeRoles}`);
                    let removedRoleName = yield this.inputHandler.getStringInput("Insira o nome do Cargo a remover: ");
                    try {
                        this.dataManager.removeEditedEmployeeRole(removedRoleName);
                        console.log(">>> Cargo removido com sucesso");
                    }
                    catch (error) {
                        console.log(`>>> Falha na remoção do Cargo. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
                    }
                    return EmployeeControllerState_1.default.EMPLOYEE_ROLES_MENU;
                }
            }
        });
    }
    createEmployeeRoleOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n>>> Iniciando adição de novo Cargo");
            let employeeRoles = this.dataManager.listEditedEmployeeRoles(this.employeeInEditing);
            console.log(`O Funcionário possui os seguintes Cargos: ${employeeRoles}`);
            let newRoleName = yield this.inputHandler.getStringInput("Insira o nome do Cargo a adicionar: ");
            try {
                this.dataManager.addRoleToEditedEmployee(newRoleName);
                console.log(">>> Cargo adicionado com sucesso");
            }
            catch (error) {
                console.log(`Falha na adição de Cargo ao Funcionário. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
            }
            return EmployeeControllerState_1.default.EMPLOYEE_ROLES_MENU;
        });
    }
    editEmployeeCpfOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n>>> Editando CPF do Funcionário");
            console.log(`CPF atual: ${this.employeeInEditing.cpf}`);
            let newCPF = yield this.inputHandler.getStringInput("Insira o novo CPF do Funcionário: ");
            this.employeeInEditing.cpf = newCPF;
            console.log(">>> CPF atualizado com sucesso");
            return EmployeeControllerState_1.default.EMPLOYEE_EDITING;
        });
    }
    editEmployeeSalaryOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n>>> Editando Salário do Funcionário");
            console.log(`Salário atual: ${this.employeeInEditing.salario}`);
            let newSalary = yield this.inputHandler.getNumberInput("Insira o novo Salário do Funcionário: ");
            this.employeeInEditing.salario = newSalary;
            console.log(">>> Salário atualizado com sucesso");
            return EmployeeControllerState_1.default.EMPLOYEE_EDITING;
        });
    }
    editEmployeePhoneOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n>>> Editando Telefone do Funcionário");
            console.log(`Telefone atual: ${this.employeeInEditing.telefone}`);
            let newPhone = yield this.inputHandler.getStringInput("Insira o novo Telefone do Funcionário: ");
            this.employeeInEditing.telefone = newPhone;
            console.log(">>> Telefone atualizado com sucesso");
            return EmployeeControllerState_1.default.EMPLOYEE_EDITING;
        });
    }
    editEmployeeNameOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n>>> Editando Nome do Funcionário");
            console.log(`Nome atual: ${this.employeeInEditing.nome}`);
            let newName = yield this.inputHandler.getStringInput("Insira o novo Nome do Funcionário: ");
            this.employeeInEditing.nome = newName;
            console.log(">>> Nome atualizado com sucesso");
            return EmployeeControllerState_1.default.EMPLOYEE_EDITING;
        });
    }
}
exports.default = EmployeeOperator;
