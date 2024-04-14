
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
        this.employeeInEditing = new Funcionario(new Cargo(""), "", "", "", NaN);
    }

    public async createEmployeeOperation(): Promise<EmployeeControllerState> {
        console.log("\n>>> Iniciando criação de Funcionário");

        let employeeName: string = await this.inputHandler.getStringInput("Insira o nome do Funcionário: ");
        let cpf: string = await this.inputHandler.getStringInput("Insira o CPF do Funcionário: ");
        let phone: string = await this.inputHandler.getStringInput("Insira o telefone do Funcionário: ");
        let salary: number = await this.inputHandler.getNumberInput("Insira o salário do Funcionário: ");
        let roleName: string = await this.inputHandler.getStringInput("Insira o cargo inicial do Funcionário: ");

        let numberOfRoles: number = await this.inputHandler.getNumberInput("Insira o número de Cargos adicionais do Funcionário: ");

        let additionalRoles: Array<string> = [];
        for (let i = 0; i < numberOfRoles; i++) {
            let newRoleName = await this.inputHandler.getStringInput(`Insira o nome do Cargo adicional ${i+1}/${numberOfRoles}: `);

            additionalRoles.push(newRoleName);
        }

        this.dataManager.addEmployee(roleName, cpf, employeeName, phone, salary, additionalRoles);
        return EmployeeControllerState.EMPLOYEE_MENU;
    }

    public listEmployeesOperation(): EmployeeControllerState {
        console.log("\n>>> Listando Funcionários");
        console.log(this.dataManager.listEmployees());
        if (this.dataManager.getEmployees().length === 0) {
            console.log(">>> Voltando ao Menu de Funcionários");
            return EmployeeControllerState.EMPLOYEE_MENU;
        } else {
            return EmployeeControllerState.EMPLOYEE_SELECTION;
        }
    }

    public listEmployeeInfoOperation(): EmployeeControllerState {
        console.log("\n>>> Listando informações do Funcionário");
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
                return EmployeeControllerState.EMPLOYEE_EDITING;
            } else {
                console.log(">>> Não foi possível encontrar o Funcionário selecionado");
                return EmployeeControllerState.EMPLOYEE_MENU;
            }
        } else {
            console.log(">>> Funcionário inválido");
            return EmployeeControllerState.EMPLOYEE_MENU;
        }
    }

    public async removeEmployeeRoleOperation(): Promise<EmployeeControllerState> {
        if (this.employeeInEditing.cargos.length == 1) {
            console.log("\n>>> O Funcionário possui apenas um Cargo, portanto não é possível remover Cargos");
            console.log(">>> Voltando para o Menu de Editar Cargos do Funcionário");
            return EmployeeControllerState.EMPLOYEE_ROLES_MENU;
        } else {
            let employeeRoles = this.dataManager.listEditedEmployeeRoles(this.employeeInEditing);
            
            if (employeeRoles === "") {
                console.log("\n>>> ERRO FATAL: O Funcionário não possui nenhum Cargo");
                console.log(">>> O programa será encerrado");
                return EmployeeControllerState.SHUTDOWN;
            } else {
                console.log(`O Funcionário possui os seguintes Cargos: ${employeeRoles}`);
                let removedRoleName = await this.inputHandler.getStringInput("Insira o nome do Cargo a remover: ");

                try {
                    this.dataManager.removeEditedEmployeeRole(removedRoleName);

                    console.log(">>> Cargo removido com sucesso");
                } catch (error) {
                    console.log(`>>> Falha na remoção do Cargo. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
                }

                return EmployeeControllerState.EMPLOYEE_ROLES_MENU;
            }
        }
    }

    public async createEmployeeRoleOperation(): Promise<EmployeeControllerState> {
        console.log("\n>>> Iniciando adição de novo Cargo");
        let employeeRoles = this.dataManager.listEditedEmployeeRoles(this.employeeInEditing);
        console.log(`O Funcionário possui os seguintes Cargos: ${employeeRoles}`);

        let newRoleName = await this.inputHandler.getStringInput("Insira o nome do Cargo a adicionar: ");

        try {
            this.dataManager.addRoleToEditedEmployee(newRoleName);

            console.log(">>> Cargo adicionado com sucesso");
        } catch (error) {
            console.log(`Falha na adição de Cargo ao Funcionário. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
        }
        
        return EmployeeControllerState.EMPLOYEE_ROLES_MENU;
    }

    public async editEmployeeCpfOperation(): Promise<EmployeeControllerState> {
        console.log("\n>>> Editando CPF do Funcionário");
        console.log(`CPF atual: ${this.employeeInEditing.cpf}`);
        let newCPF = await this.inputHandler.getStringInput("Insira o novo CPF do Funcionário: ");
        this.employeeInEditing.cpf = newCPF;
        console.log(">>> CPF atualizado com sucesso");
        return EmployeeControllerState.EMPLOYEE_EDITING;
    }

    public async editEmployeeSalaryOperation(): Promise<EmployeeControllerState> {
        console.log("\n>>> Editando Salário do Funcionário");
        console.log(`Salário atual: ${this.employeeInEditing.salario}`);
        let newSalary = await this.inputHandler.getNumberInput("Insira o novo Salário do Funcionário: ");
        this.employeeInEditing.salario = newSalary;
        console.log(">>> Salário atualizado com sucesso");
        return EmployeeControllerState.EMPLOYEE_EDITING;
    }

    public async editEmployeePhoneOperation(): Promise<EmployeeControllerState> {
        console.log("\n>>> Editando Telefone do Funcionário");
        console.log(`Telefone atual: ${this.employeeInEditing.telefone}`);
        let newPhone = await this.inputHandler.getStringInput("Insira o novo Telefone do Funcionário: ");
        this.employeeInEditing.telefone = newPhone;
        console.log(">>> Telefone atualizado com sucesso");
        return EmployeeControllerState.EMPLOYEE_EDITING;
    }

    public async editEmployeeNameOperation(): Promise<EmployeeControllerState> {
        console.log("\n>>> Editando Nome do Funcionário");
        console.log(`Nome atual: ${this.employeeInEditing.nome}`);
        let newName = await this.inputHandler.getStringInput("Insira o novo Nome do Funcionário: ");
        this.employeeInEditing.nome = newName;
        console.log(">>> Nome atualizado com sucesso");
        return EmployeeControllerState.EMPLOYEE_EDITING;
    }

}

export default EmployeeOperator;