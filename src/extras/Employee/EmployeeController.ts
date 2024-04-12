
import Funcionario from "../../objects/classes/Funcionario";
import Cargo from "../../objects/classes/Cargo";
import MenuRenderer from "../Commons/MenuRenderer";
import ControllerState from "../Main/ControllerState";
import InputHandler from "../Commons/InputHandler";
import DataManager from "../Commons/DataManager";
import EmployeeControllerState from "./EmployeeControllerState";
import EmployeeControlParser from "./EmployeeControlParser";

class EmployeeController {

    private employeeInEditing: Funcionario;
    private dataManager: DataManager;
    private currentState: EmployeeControllerState = EmployeeControllerState.EMPLOYEE_MENU;
    private inputHandler: InputHandler = new InputHandler();
    private menuRenderer: MenuRenderer = new MenuRenderer();
    private controlParser: EmployeeControlParser = new EmployeeControlParser();

    constructor(dataManager: DataManager) {
        this.dataManager = dataManager;
        this.employeeInEditing = new Funcionario("", "", "", "", NaN);
    }

    private listEmployeesOperation(): Promise<ControllerState> {
        this.dataManager.listEmployees();
        if (this.dataManager.getEmployees().length === 0) {
            console.log(">>> Voltando ao Menu de Funcionários");
            this.currentState = EmployeeControllerState.EMPLOYEE_MENU;
            return this.runEmployeeCommands();
        } else {
            this.currentState = EmployeeControllerState.EMPLOYEE_SELECTION;
            return this.runEmployeeCommands();
        }
    }

    private async selectEmployeeOperation(): Promise<ControllerState> {
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
            this.currentState = EmployeeControllerState.EMPLOYEE_EDITING;
        } else {
            console.log(">>> Funcionário inválido");
        }
        return this.runEmployeeCommands();
    }

    private async removeEmployeeRoleOperation(): Promise<ControllerState> {
        if (this.employeeInEditing.cargos.length == 1) {
            console.log(">>> O Funcionário possui apenas um Cargo, portanto não é possível remover Cargos");
            console.log(">>> Voltando para o Menu de Editar Cargos do Funcionário");
            this.currentState = EmployeeControllerState.EMPLOYEE_ROLES_MENU;
            return this.runEmployeeCommands();
        } else {
            let employeeRoles = this.dataManager.listEditedEmployeeRoles(this.employeeInEditing);
            if (employeeRoles === "") {
                console.log(">>> ERRO FATAL: O Funcionário não possui nenhum Cargo");
                console.log(">>> O programa será encerrado");
                this.currentState = EmployeeControllerState.SHUTDOWN;
                return this.runEmployeeCommands();
            } else {
                console.log(`O Funcionário possui os seguintes Cargos: ${employeeRoles}`);
                let removedRoleName = await this.inputHandler.getStringInput("Insira o nome do Cargo a remover: ");

                let removedRole = this.dataManager.removeEditedEmployeeRole(removedRoleName);

                if (removedRole) {
                    console.log(">>> Cargo removido com sucesso");
                    this.currentState = EmployeeControllerState.EMPLOYEE_ROLES_MENU;
                    return this.runEmployeeCommands();
                } else {
                    console.log(">>> O Funcionário não possui o Cargo escolhido");
                    return this.runEmployeeCommands();
                }
            }
        }
    }

    private async createEmployeeRoleOperation(): Promise<ControllerState> {
        console.log(">>> Iniciando adição de novo Cargo");
        let employeeRoles = this.dataManager.listEditedEmployeeRoles(this.employeeInEditing);
        console.log(`O Funcionário possui os seguintes Cargos: ${employeeRoles}`);
        let newRoleName = await this.inputHandler.getStringInput("Insira o nome do Cargo a adicionar: ");
        let newRole = new Cargo(newRoleName);
        this.employeeInEditing.cargos.push(newRole);
        console.log(">>> Cargo adicionado com sucesso")
        this.currentState = EmployeeControllerState.EMPLOYEE_ROLES_MENU;
        return this.runEmployeeCommands();
    }

    private async editEmployeeCpfOperation(): Promise<ControllerState> {
        console.log(`CPF atual do Funcionário: ${this.employeeInEditing.cpf}`);
        let newCPF = await this.inputHandler.getStringInput("Insira o novo CPF do Funcionário: ");
        this.employeeInEditing.cpf = newCPF;
        console.log(">>> CPF atualizado com sucesso");
        this.currentState = EmployeeControllerState.EMPLOYEE_EDITING;
        return this.runEmployeeCommands();
    }

    private async editEmployeeSalaryOperation(): Promise<ControllerState> {
        console.log(`Salário atual do Funcionário: ${this.employeeInEditing.salario}`);
        let newSalary = await this.inputHandler.getNumberInput("Insira o novo Salário do Funcionário: ");
        this.employeeInEditing.salario = newSalary;
        console.log(">>> Salário atualizado com sucesso");
        this.currentState = EmployeeControllerState.EMPLOYEE_EDITING;
        return this.runEmployeeCommands();
    }

    private async editEmployeePhoneOperation(): Promise<ControllerState> {
        console.log(`Telefone atual do Funcionário: ${this.employeeInEditing.telefone}`);
        let newPhone = await this.inputHandler.getStringInput("Insira o novo Telefone do Funcionário: ");
        this.employeeInEditing.telefone = newPhone;
        console.log(">>> Telefone atualizado com sucesso");
        this.currentState = EmployeeControllerState.EMPLOYEE_EDITING;
        return this.runEmployeeCommands();
    }

    private async editEmployeeNameOperation(): Promise<ControllerState> {
        console.log(`Nome atual do Funcionário: ${this.employeeInEditing.nome}`);
        let newName = await this.inputHandler.getStringInput("Insira o novo Nome do Funcionário: ");
        this.employeeInEditing.nome = newName;
        console.log(">>> Nome atualizado com sucesso");
        this.currentState = EmployeeControllerState.EMPLOYEE_EDITING;
        return this.runEmployeeCommands();
    }

    public async runEmployeeCommands(): Promise<ControllerState> {
        switch (this.currentState) {
            case EmployeeControllerState.RETURN_TO_MAIN:
                return ControllerState.MAIN_MENU;
            case EmployeeControllerState.SHUTDOWN:
                return ControllerState.SHUTDOWN;
            case EmployeeControllerState.RESET:
                console.log(">>> Voltando ao Menu de Funcionários");
                this.currentState = EmployeeControllerState.EMPLOYEE_MENU;
                return this.runEmployeeCommands();
            case EmployeeControllerState.EMPLOYEE_MENU:
            case EmployeeControllerState.EMPLOYEE_EDITING:
            case EmployeeControllerState.EMPLOYEE_ROLES_MENU:
                this.displayMenu();
                await this.startCommandInput("Insira comando: ");
                return this.runEmployeeCommands();
            case EmployeeControllerState.EMPLOYEE_LISTING:
                return this.listEmployeesOperation();
            case EmployeeControllerState.EMPLOYEE_SELECTION:
                return await this.selectEmployeeOperation();
            case EmployeeControllerState.EMPLOYEE_CREATION:
                await this.dataManager.addEmployee();
                this.currentState = EmployeeControllerState.EMPLOYEE_MENU;
                return this.runEmployeeCommands();
            case EmployeeControllerState.EMPLOYEE_EDIT_NAME:
                return await this.editEmployeeNameOperation();
            case EmployeeControllerState.EMPLOYEE_EDIT_PHONE:
                return await this.editEmployeePhoneOperation();
            case EmployeeControllerState.EMPLOYEE_EDIT_SALARY:
                return await this.editEmployeeSalaryOperation();
            case EmployeeControllerState.EMPLOYEE_EDIT_CPF:
                return await this.editEmployeeCpfOperation();
            case EmployeeControllerState.EMPLOYEE_EDIT_LIST:
                console.log(this.dataManager.listEditedEmployeeInfo());
                this.currentState = EmployeeControllerState.EMPLOYEE_EDITING;
                return this.runEmployeeCommands();
            case EmployeeControllerState.EMPLOYEE_ROLES_CREATION:
                return await this.createEmployeeRoleOperation();
            case EmployeeControllerState.EMPLOYEE_ROLES_REMOVAL:
                return await this.removeEmployeeRoleOperation();
            default:
                console.log(">>> Comando desconhecido");
                this.currentState = EmployeeControllerState.RESET;
                return this.runEmployeeCommands();
        }
    }

    private displayMenu() {
        let renderResult = this.menuRenderer.renderEmployeeMenus(this.currentState);

        if (!renderResult) {
            console.log(">>> Menu desconhecido");
            console.log(">>> Voltando para o Menu de Editar Funcionário");
            this.currentState = EmployeeControllerState.EMPLOYEE_EDITING;
        }
    }

    private async startCommandInput(prompt: string) {
        let receivedInput = await this.inputHandler.getNumberInput(prompt);
        this.currentState = await this.controlParser.parseInputForState(this.currentState, receivedInput);
    }
}

export default EmployeeController;