
import Cargo from "../../objects/classes/Cargo";
import Funcionario from "../../objects/classes/Funcionario";

import DataManager from "../Commons/DataManager";
import EmployeeControllerState from "./EmployeeControllerState";
import InputHandler from "../Commons/InputHandler";

class EmployeeOperator {

    private employeeInEditing: Funcionario;
    private dataManager: DataManager;
    private inputHandler: InputHandler = new InputHandler();

    constructor(dataManager: DataManager) {
        this.dataManager = dataManager;
        this.employeeInEditing = new Funcionario("", "", "", "", NaN);
    }

    public async createEmployeeOperation(): Promise<EmployeeControllerState> {
        await this.dataManager.addEmployee();
        return EmployeeControllerState.EMPLOYEE_MENU;
    }

    public listEmployeesOperation(): EmployeeControllerState {
        this.dataManager.listEmployees();
        if (this.dataManager.getEmployees().length === 0) {
            console.log(">>> Voltando ao Menu de Funcionários");
            return EmployeeControllerState.EMPLOYEE_MENU;
        } else {
            return EmployeeControllerState.EMPLOYEE_SELECTION;
        }
    }

    public listEmployeeInfoOperation(): EmployeeControllerState {
        console.log(this.dataManager.listEditedEmployeeInfo());
        return EmployeeControllerState.EMPLOYEE_EDITING;
    }

    public async selectEmployeeOperation(): Promise<EmployeeControllerState> {
        let selectedIndex = await this.inputHandler.getNumberInput("Selecione um Funcionário: ");
        let parsedIndex = selectedIndex - 1;
        if (parsedIndex >= 0 
            && parsedIndex < this.dataManager.getEmployees().length) {
            console.log(`>>> Funcionário ${selectedIndex} selecionado`);
            this.dataManager.setEditedEmployee(parsedIndex);
            let selectedEmployee = this.dataManager.getEditedEmployee();
            if (selectedEmployee instanceof Funcionario) {
                this.employeeInEditing = selectedEmployee;
            } else {
                console.log(">>> Não foi possível encontrar o Funcionário selecionado");
            }
            return EmployeeControllerState.EMPLOYEE_EDITING;
        } else {
            console.log(">>> Funcionário inválido");
            return EmployeeControllerState.EMPLOYEE_MENU;
        }
    }

    public async removeEmployeeRoleOperation(): Promise<EmployeeControllerState> {
        if (this.employeeInEditing.cargos.length == 1) {
            console.log(">>> O Funcionário possui apenas um Cargo, portanto não é possível remover Cargos");
            console.log(">>> Voltando para o Menu de Editar Cargos do Funcionário");
            return EmployeeControllerState.EMPLOYEE_ROLES_MENU;
        } else {
            let employeeRoles = this.dataManager.listEditedEmployeeRoles(this.employeeInEditing);
            if (employeeRoles === "") {
                console.log(">>> ERRO FATAL: O Funcionário não possui nenhum Cargo");
                console.log(">>> O programa será encerrado");
                return EmployeeControllerState.SHUTDOWN;
            } else {
                console.log(`O Funcionário possui os seguintes Cargos: ${employeeRoles}`);
                let removedRoleName = await this.inputHandler.getStringInput("Insira o nome do Cargo a remover: ");

                let removedRole = this.dataManager.removeEditedEmployeeRole(removedRoleName);

                if (removedRole) {
                    console.log(">>> Cargo removido com sucesso");
                } else {
                    console.log(">>> O Funcionário não possui o Cargo escolhido");
                }

                return EmployeeControllerState.EMPLOYEE_ROLES_MENU;
            }
        }
    }

    public async createEmployeeRoleOperation(): Promise<EmployeeControllerState> {
        console.log(">>> Iniciando adição de novo Cargo");
        let employeeRoles = this.dataManager.listEditedEmployeeRoles(this.employeeInEditing);
        console.log(`O Funcionário possui os seguintes Cargos: ${employeeRoles}`);
        let newRoleName = await this.inputHandler.getStringInput("Insira o nome do Cargo a adicionar: ");
        let newRole = new Cargo(newRoleName);
        this.employeeInEditing.cargos.push(newRole);
        console.log(">>> Cargo adicionado com sucesso")
        return EmployeeControllerState.EMPLOYEE_ROLES_MENU;
    }

    public async editEmployeeCpfOperation(): Promise<EmployeeControllerState> {
        console.log(`CPF atual do Funcionário: ${this.employeeInEditing.cpf}`);
        let newCPF = await this.inputHandler.getStringInput("Insira o novo CPF do Funcionário: ");
        this.employeeInEditing.cpf = newCPF;
        console.log(">>> CPF atualizado com sucesso");
        return EmployeeControllerState.EMPLOYEE_EDITING;
    }

    public async editEmployeeSalaryOperation(): Promise<EmployeeControllerState> {
        console.log(`Salário atual do Funcionário: ${this.employeeInEditing.salario}`);
        let newSalary = await this.inputHandler.getNumberInput("Insira o novo Salário do Funcionário: ");
        this.employeeInEditing.salario = newSalary;
        console.log(">>> Salário atualizado com sucesso");
        return EmployeeControllerState.EMPLOYEE_EDITING;
    }

    public async editEmployeePhoneOperation(): Promise<EmployeeControllerState> {
        console.log(`Telefone atual do Funcionário: ${this.employeeInEditing.telefone}`);
        let newPhone = await this.inputHandler.getStringInput("Insira o novo Telefone do Funcionário: ");
        this.employeeInEditing.telefone = newPhone;
        console.log(">>> Telefone atualizado com sucesso");
        return EmployeeControllerState.EMPLOYEE_EDITING;
    }

    public async editEmployeeNameOperation(): Promise<EmployeeControllerState> {
        console.log(`Nome atual do Funcionário: ${this.employeeInEditing.nome}`);
        let newName = await this.inputHandler.getStringInput("Insira o novo Nome do Funcionário: ");
        this.employeeInEditing.nome = newName;
        console.log(">>> Nome atualizado com sucesso");
        return EmployeeControllerState.EMPLOYEE_EDITING;
    }

}

export default EmployeeOperator;