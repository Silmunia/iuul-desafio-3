import Funcionario from "../objects/classes/Funcionario";
import Cargo from "../objects/classes/Cargo";
import ControllerState from "./ControllerState";
import DataManager from "./DataManager";
import InputHandler from "./InputHandler";
import MenuRenderer from "./MenuRenderer";

class MainController {
    private currentState: ControllerState = ControllerState.MAIN_MENU;
    private inputHandler: InputHandler = new InputHandler();
    private menuRenderer: MenuRenderer = new MenuRenderer();
    private dataManager: DataManager = new DataManager();
    
    public startProgram() {
        this.runControlLoop();
    }

    private async runControlLoop() {
        switch (this.currentState) {
            case ControllerState.MAIN_MENU:
            case ControllerState.EMPLOYEE_MENU:
            case ControllerState.CLIENT_MENU:
            case ControllerState.EMPLOYEE_EDITING:
            case ControllerState.EMPLOYEE_ROLES_MENU:
                this.displayMenu();
                this.startCommandInput("Insira comando: ");
                break;
            case ControllerState.EMPLOYEE_CREATION:
            case ControllerState.EMPLOYEE_LISTING:
            case ControllerState.EMPLOYEE_SELECTION:
            case ControllerState.EMPLOYEE_EDIT_LIST:
            case ControllerState.EMPLOYEE_EDIT_NAME:
            case ControllerState.EMPLOYEE_EDIT_PHONE:
            case ControllerState.EMPLOYEE_EDIT_SALARY:
            case ControllerState.EMPLOYEE_EDIT_CPF:
            case ControllerState.EMPLOYEE_ROLES_CREATION:
                await this.runEmployeeCommands()
                break;
            case ControllerState.CLIENT_CREATION:
            case ControllerState.CLIENT_LISTING:
                await this.runClientCommands();
                break;
            case ControllerState.SHUTDOWN:
                console.log(">>> Encerrando programa");
                return;
            case ControllerState.RESET:
                console.log(">>> Voltando para o Menu principal");
                this.currentState = ControllerState.MAIN_MENU;
                this.runControlLoop();
                break;
            default:
                console.log(">>> Comando desconhecido");
                this.currentState = ControllerState.RESET;
                this.runControlLoop();
        }
    }

    private async startCommandInput(prompt: string) {
        let receivedInput = await this.inputHandler.getNumberInput(prompt);
        this.currentState = this.parseInputForState(receivedInput);
        this.runControlLoop();
    }

    private parseInputForState(input: number): ControllerState {
        switch(this.currentState) {
            case ControllerState.MAIN_MENU:
                switch (input) {
                    case ControllerState.EMPLOYEE_MENU:
                        return ControllerState.EMPLOYEE_MENU;
                    case ControllerState.CLIENT_MENU:
                        return ControllerState.CLIENT_MENU;
                    case ControllerState.SHUTDOWN:
                        return ControllerState.SHUTDOWN;
                    default:
                        console.log(">>> Comando desconhecido");
                        return ControllerState.RESET;
                }
            case ControllerState.EMPLOYEE_MENU:
                switch (input) {
                    case ControllerState.EMPLOYEE_CREATION:
                        return ControllerState.EMPLOYEE_CREATION;
                    case ControllerState.EMPLOYEE_LISTING:
                        return ControllerState.EMPLOYEE_LISTING;
                    case ControllerState.MAIN_MENU:
                        return ControllerState.MAIN_MENU;
                    case ControllerState.SHUTDOWN:
                        return ControllerState.SHUTDOWN;
                    default:
                        console.log(">>> Comando desconhecido");
                        return ControllerState.RESET;
                }
            case ControllerState.EMPLOYEE_EDITING:
                switch (input) {
                    case ControllerState.EMPLOYEE_EDIT_LIST:
                        return ControllerState.EMPLOYEE_EDIT_LIST;
                    case ControllerState.EMPLOYEE_EDIT_NAME:
                        return ControllerState.EMPLOYEE_EDIT_NAME;
                    case ControllerState.EMPLOYEE_EDIT_PHONE:
                        return ControllerState.EMPLOYEE_EDIT_PHONE;
                    case ControllerState.EMPLOYEE_EDIT_SALARY:
                        return ControllerState.EMPLOYEE_EDIT_SALARY;
                    case ControllerState.EMPLOYEE_EDIT_CPF:
                        return ControllerState.EMPLOYEE_EDIT_CPF;
                    case ControllerState.EMPLOYEE_ROLES_MENU:
                        return ControllerState.EMPLOYEE_ROLES_MENU;
                    case ControllerState.MAIN_MENU:
                        return ControllerState.MAIN_MENU;
                    case ControllerState.SHUTDOWN:
                        return ControllerState.SHUTDOWN;
                    default:
                        console.log(">>> Comando desconhecido");
                        return ControllerState.RESET;
                }
            case ControllerState.CLIENT_MENU:
                switch (input) {
                    case ControllerState.CLIENT_CREATION:
                        return ControllerState.CLIENT_CREATION;
                    case ControllerState.CLIENT_LISTING:
                        return ControllerState.CLIENT_LISTING;
                    case ControllerState.MAIN_MENU:
                        return ControllerState.MAIN_MENU;
                    case ControllerState.SHUTDOWN:
                        return ControllerState.SHUTDOWN;
                    default:
                        console.log(">>> Comando desconhecido");
                        return ControllerState.RESET;
                }
            case ControllerState.EMPLOYEE_ROLES_MENU:
                switch (input) {
                    case ControllerState.EMPLOYEE_ROLES_CREATION:
                        return ControllerState.EMPLOYEE_ROLES_CREATION;
                    case ControllerState.EMPLOYEE_EDITING:
                        return ControllerState.EMPLOYEE_EDITING;
                    case ControllerState.MAIN_MENU:
                        return ControllerState.MAIN_MENU;
                    case ControllerState.SHUTDOWN:
                        return ControllerState.SHUTDOWN;
                    default:
                        console.log(">>> Comando desconhecido");
                        return ControllerState.RESET;
                }
            default:
                console.log(">>> Comando desconhecido");
                return ControllerState.RESET;
        }
    }

    private displayMenu() {
        let renderResult = this.menuRenderer.renderMenu(this.currentState);

        if (!renderResult) {
            console.log(">>> Menu desconhecido");
            console.log(">>> Voltando para o Menu Principal");
            this.currentState = ControllerState.MAIN_MENU;
            this.runControlLoop();
        }
    }

    private async runEmployeeCommands() {
        switch (this.currentState) {
            case ControllerState.EMPLOYEE_CREATION:
                await this.dataManager.addEmployee();
                this.currentState = ControllerState.EMPLOYEE_MENU;
                this.runControlLoop();
                break;
            case ControllerState.EMPLOYEE_LISTING:
                this.dataManager.listEmployees();
                if (this.dataManager.getEmployees().length === 0) {
                    console.log(">>> Voltando ao Menu de Funcionários");
                    this.currentState = ControllerState.EMPLOYEE_MENU;
                } else {
                    this.currentState = ControllerState.EMPLOYEE_SELECTION;
                }
                this.runControlLoop();
                break;
            case ControllerState.EMPLOYEE_SELECTION:
                let selectedIndex = await this.inputHandler.getNumberInput("Selecione um Funcionário: ");
                let parsedIndex = selectedIndex - 1;
                if (parsedIndex >= 0 
                    && parsedIndex < this.dataManager.getEmployees().length) {
                    console.log(`>>> Funcionário ${selectedIndex} selecionado`);
                    this.dataManager.setEditedEmployee(parsedIndex);
                    this.currentState = ControllerState.EMPLOYEE_EDITING;
                } else {
                    console.log(">>> Funcionário inválido");
                }
                this.runControlLoop();
                break;
            case ControllerState.EMPLOYEE_EDIT_NAME:
                let editEmployeeName = this.dataManager.getEditedEmployee();
                if (editEmployeeName instanceof Funcionario) {
                    console.log(`Nome atual do Funcionário: ${editEmployeeName.nome}`);
                    let newName = await this.inputHandler.getStringInput("Insira o novo Nome do Funcionário: ");
                    editEmployeeName.nome = newName;
                    console.log(">>> Nome atualizado com sucesso");
                    this.currentState = ControllerState.EMPLOYEE_EDITING;
                } else {
                    console.log(">>> Não foi possível encontrar o Funcionário");
                    this.currentState = ControllerState.RESET;
                }
                this.runControlLoop();
                break;
            case ControllerState.EMPLOYEE_EDIT_PHONE:
                let editEmployeePhone = this.dataManager.getEditedEmployee();
                if (editEmployeePhone instanceof Funcionario) {
                    console.log(`Telefone atual do Funcionário: ${editEmployeePhone.telefone}`);
                    let newPhone = await this.inputHandler.getStringInput("Insira o novo Telefone do Funcionário: ");
                    editEmployeePhone.telefone = newPhone;
                    console.log(">>> Telefone atualizado com sucesso");
                    this.currentState = ControllerState.EMPLOYEE_EDITING;
                } else {
                    console.log(">>> Não foi possível encontrar o Funcionário");
                    this.currentState = ControllerState.RESET;
                }
                this.runControlLoop();
                break;
            case ControllerState.EMPLOYEE_EDIT_SALARY:
                let editEmployeeSalary = this.dataManager.getEditedEmployee();
                if (editEmployeeSalary instanceof Funcionario) {
                    console.log(`Salário atual do Funcionário: ${editEmployeeSalary.salario}`);
                    let newSalary = await this.inputHandler.getNumberInput("Insira o novo Salário do Funcionário: ");
                    editEmployeeSalary.salario = newSalary;
                    console.log(">>> Salário atualizado com sucesso");
                    this.currentState = ControllerState.EMPLOYEE_EDITING;
                } else {
                    console.log(">>> Não foi possível encontrar o Funcionário");
                    this.currentState = ControllerState.RESET;
                }
                this.runControlLoop();
                break;
            case ControllerState.EMPLOYEE_EDIT_CPF:
                let editEmployeeCPF = this.dataManager.getEditedEmployee();
                if (editEmployeeCPF instanceof Funcionario) {
                    console.log(`CPF atual do Funcionário: ${editEmployeeCPF.cpf}`);
                    let newCPF = await this.inputHandler.getStringInput("Insira o novo CPF do Funcionário: ");
                    editEmployeeCPF.cpf = newCPF;
                    console.log(">>> CPF atualizado com sucesso");
                    this.currentState = ControllerState.EMPLOYEE_EDITING;
                } else {
                    console.log(">>> Não foi possível encontrar o Funcionário");
                    this.currentState = ControllerState.RESET;
                }
                this.runControlLoop();
                break;
            case ControllerState.EMPLOYEE_EDIT_LIST:
                console.log(this.dataManager.listEditedEmployeeInfo());
                this.currentState = ControllerState.EMPLOYEE_EDITING;
                this.runControlLoop();
                break;
            case ControllerState.EMPLOYEE_ROLES_CREATION:
                console.log(">>> Iniciando adição de novo Cargo");
                let addRoleEmployee = this.dataManager.getEditedEmployee();
                let employeeRoles = this.dataManager.listEditedEmployeeRoles(addRoleEmployee)
                if (employeeRoles === "") {
                    console.log(">>> ERRO FATAL: O Funcionário não possui nenhum Cargo");
                    console.log(">>> O programa será encerrado");
                    this.currentState = ControllerState.SHUTDOWN;
                    this.runControlLoop();
                } else {
                    console.log(`O Funcionário possui os seguintes Cargos: ${employeeRoles}`);
                    let newRoleName = await this.inputHandler.getStringInput("Insira o nome do Cargo a adicionar: ");
                    let newRole = new Cargo(newRoleName);
                    addRoleEmployee?.cargos.push(newRole);
                    console.log(">>> Cargo adicionado com sucesso")
                    this.currentState = ControllerState.EMPLOYEE_ROLES_MENU;
                    this.runControlLoop();
                }
                break;
            default:
                console.log(">>> Comando desconhecido");
                this.currentState = ControllerState.RESET;
                this.runControlLoop();
        }
    }

    private async runClientCommands() {
        switch(this.currentState) {
            case ControllerState.CLIENT_CREATION:
                await this.dataManager.addClient();
                this.currentState = ControllerState.CLIENT_MENU;
                this.runControlLoop();
                break;
            case ControllerState.CLIENT_LISTING:
                this.dataManager.listClients();
                this.currentState = ControllerState.CLIENT_MENU;
                this.runControlLoop();
                break;
            default:
                console.log(">>> Comando desconhecido");
                this.currentState = ControllerState.RESET;
                this.runControlLoop();
        }
    }
}

export default MainController;