
import Funcionario from "../objects/classes/Funcionario";
import Cargo from "../objects/classes/Cargo";
import MenuRenderer from "./MenuRenderer";
import ControllerState from "./ControllerState";
import InputHandler from "./InputHandler";
import DataManager from "./DataManager";

class EmployeeController {

    private employeeInEditing: Funcionario;
    private dataManager: DataManager;
    private currentState: ControllerState;
    private inputHandler: InputHandler = new InputHandler();
    private menuRenderer: MenuRenderer = new MenuRenderer();

    constructor(initialState: ControllerState, editedEmployee: Funcionario | undefined, dataManager: DataManager) {
        this.currentState = initialState
        this.dataManager = dataManager;

        if (editedEmployee instanceof Funcionario) {
            this.employeeInEditing = editedEmployee;
        } else {
            this.employeeInEditing = new Funcionario("", "", "", "", NaN);
        }
    }

    public async runEmployeeCommands(): Promise<ControllerState> {
        switch (this.currentState) {
            case ControllerState.MAIN_MENU:
                return ControllerState.MAIN_MENU;
            case ControllerState.SHUTDOWN:
                return ControllerState.SHUTDOWN;
            case ControllerState.RESET:
                console.log(">>> Voltando ao Menu de Funcionários");
                this.currentState = ControllerState.EMPLOYEE_MENU;
                return this.runEmployeeCommands();
            case ControllerState.EMPLOYEE_MENU:
            case ControllerState.EMPLOYEE_EDITING:
            case ControllerState.EMPLOYEE_ROLES_MENU:
                this.displayMenu();
                await this.startCommandInput("Insira comando: ");
                return this.runEmployeeCommands();
            case ControllerState.EMPLOYEE_LISTING:
                this.dataManager.listEmployees();
                if (this.dataManager.getEmployees().length === 0) {
                    console.log(">>> Voltando ao Menu de Funcionários");
                    this.currentState = ControllerState.EMPLOYEE_MENU;
                    return this.runEmployeeCommands();
                } else {
                    this.currentState = ControllerState.EMPLOYEE_SELECTION;
                    return this.runEmployeeCommands();
                }
            case ControllerState.EMPLOYEE_SELECTION:
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
                    this.currentState = ControllerState.EMPLOYEE_EDITING;
                } else {
                    console.log(">>> Funcionário inválido");
                }
                return this.runEmployeeCommands();
            case ControllerState.EMPLOYEE_CREATION:
                await this.dataManager.addEmployee();
                this.currentState = ControllerState.EMPLOYEE_MENU;
                return this.runEmployeeCommands();
            case ControllerState.EMPLOYEE_LISTING:
                this.dataManager.listEmployees();
                if (this.dataManager.getEmployees().length === 0) {
                    console.log(">>> Voltando ao Menu de Funcionários");
                    this.currentState = ControllerState.EMPLOYEE_MENU;
                    return this.runEmployeeCommands();
                } else {
                    this.currentState = ControllerState.EMPLOYEE_SELECTION;
                    return this.runEmployeeCommands();
                }
            case ControllerState.EMPLOYEE_EDIT_NAME:
                console.log(`Nome atual do Funcionário: ${this.employeeInEditing.nome}`);
                let newName = await this.inputHandler.getStringInput("Insira o novo Nome do Funcionário: ");
                this.employeeInEditing.nome = newName;
                console.log(">>> Nome atualizado com sucesso");
                this.currentState = ControllerState.EMPLOYEE_EDITING;
                return this.runEmployeeCommands();
            case ControllerState.EMPLOYEE_EDIT_PHONE:
                console.log(`Telefone atual do Funcionário: ${this.employeeInEditing.telefone}`);
                let newPhone = await this.inputHandler.getStringInput("Insira o novo Telefone do Funcionário: ");
                this.employeeInEditing.telefone = newPhone;
                console.log(">>> Telefone atualizado com sucesso");
                this.currentState = ControllerState.EMPLOYEE_EDITING;
                return this.runEmployeeCommands();
            case ControllerState.EMPLOYEE_EDIT_SALARY:
                console.log(`Salário atual do Funcionário: ${this.employeeInEditing.salario}`);
                let newSalary = await this.inputHandler.getNumberInput("Insira o novo Salário do Funcionário: ");
                this.employeeInEditing.salario = newSalary;
                console.log(">>> Salário atualizado com sucesso");
                this.currentState = ControllerState.EMPLOYEE_EDITING;
                return this.runEmployeeCommands();
            case ControllerState.EMPLOYEE_EDIT_CPF:
                console.log(`CPF atual do Funcionário: ${this.employeeInEditing.cpf}`);
                let newCPF = await this.inputHandler.getStringInput("Insira o novo CPF do Funcionário: ");
                this.employeeInEditing.cpf = newCPF;
                console.log(">>> CPF atualizado com sucesso");
                this.currentState = ControllerState.EMPLOYEE_EDITING;
                return this.runEmployeeCommands();
            case ControllerState.EMPLOYEE_EDIT_LIST:
                console.log(this.dataManager.listEditedEmployeeInfo());
                this.currentState = ControllerState.EMPLOYEE_EDITING;
                return this.runEmployeeCommands();
            case ControllerState.EMPLOYEE_ROLES_CREATION:
                console.log(">>> Iniciando adição de novo Cargo");
                let employeeRoles = this.dataManager.listEditedEmployeeRoles(this.employeeInEditing);
                console.log(`O Funcionário possui os seguintes Cargos: ${employeeRoles}`);
                let newRoleName = await this.inputHandler.getStringInput("Insira o nome do Cargo a adicionar: ");
                let newRole = new Cargo(newRoleName);
                this.employeeInEditing.cargos.push(newRole);
                console.log(">>> Cargo adicionado com sucesso")
                this.currentState = ControllerState.EMPLOYEE_ROLES_MENU;
                return this.runEmployeeCommands();
            case ControllerState.EMPLOYEE_ROLES_REMOVAL:
                if (this.employeeInEditing.cargos.length == 1) {
                    console.log(">>> O Funcionário possui apenas um Cargo, portanto não é possível remover Cargos");
                    console.log(">>> Voltando para o Menu de Editar Cargos do Funcionário");
                    this.currentState = ControllerState.EMPLOYEE_ROLES_MENU;
                    return this.runEmployeeCommands();
                } else {
                    let employeeRoles = this.dataManager.listEditedEmployeeRoles(this.employeeInEditing);
                    if (employeeRoles === "") {
                        console.log(">>> ERRO FATAL: O Funcionário não possui nenhum Cargo");
                        console.log(">>> O programa será encerrado");
                        this.currentState = ControllerState.SHUTDOWN;
                        return this.runEmployeeCommands();
                    } else {
                        console.log(`O Funcionário possui os seguintes Cargos: ${employeeRoles}`);
                        let removedRoleName = await this.inputHandler.getStringInput("Insira o nome do Cargo a remover: ");

                        let removedRole = this.dataManager.removeEditedEmployeeRole(removedRoleName);

                        if (removedRole) {
                            console.log(">>> Cargo removido com sucesso");
                            this.currentState = ControllerState.EMPLOYEE_ROLES_MENU;
                            return this.runEmployeeCommands();
                        } else {
                            console.log(">>> O Funcionário não possui o Cargo escolhido");
                            return this.runEmployeeCommands();
                        }
                    }
                }
            default:
                console.log(">>> Comando desconhecido");
                this.currentState = ControllerState.RESET;
                return this.runEmployeeCommands();
        }
    }

    private displayMenu() {
        let renderResult = this.menuRenderer.renderEmployeeMenus(this.currentState);

        if (!renderResult) {
            console.log(">>> Menu desconhecido");
            console.log(">>> Voltando para o Menu de Editar Funcionário");
            this.currentState = ControllerState.EMPLOYEE_EDITING;
        }
    }

    private async startCommandInput(prompt: string) {
        let receivedInput = await this.inputHandler.getNumberInput(prompt);
        await this.parseInputForState(receivedInput);
    }

    private async parseInputForState(input: number) {
        switch(this.currentState) {
            case ControllerState.EMPLOYEE_MENU:
                switch (input) {
                    case ControllerState.EMPLOYEE_CREATION:
                        this.currentState = ControllerState.EMPLOYEE_CREATION;
                        break;
                    case ControllerState.EMPLOYEE_LISTING:
                        this.currentState = ControllerState.EMPLOYEE_LISTING;
                        break;
                    case ControllerState.MAIN_MENU:
                        this.currentState = ControllerState.MAIN_MENU;
                        break;
                    case ControllerState.SHUTDOWN:
                        this.currentState = ControllerState.SHUTDOWN;
                        break;
                    default:
                        console.log(">>> Comando desconhecido");
                }
                break;
            case ControllerState.EMPLOYEE_EDITING:
                switch (input) {
                    case ControllerState.EMPLOYEE_EDIT_LIST:
                        this.currentState = ControllerState.EMPLOYEE_EDIT_LIST;
                        break;
                    case ControllerState.EMPLOYEE_EDIT_NAME:
                        this.currentState = ControllerState.EMPLOYEE_EDIT_NAME;
                        break;
                    case ControllerState.EMPLOYEE_EDIT_PHONE:
                        this.currentState = ControllerState.EMPLOYEE_EDIT_PHONE;
                        break;
                    case ControllerState.EMPLOYEE_EDIT_SALARY:
                        this.currentState = ControllerState.EMPLOYEE_EDIT_SALARY;
                        break;
                    case ControllerState.EMPLOYEE_EDIT_CPF:
                        this.currentState = ControllerState.EMPLOYEE_EDIT_CPF;
                        break;
                    case ControllerState.EMPLOYEE_ROLES_MENU:
                        this.currentState = ControllerState.EMPLOYEE_ROLES_MENU;
                        break;
                    case ControllerState.MAIN_MENU:
                        this.currentState = ControllerState.MAIN_MENU;
                        break;
                    case ControllerState.SHUTDOWN:
                        this.currentState = ControllerState.SHUTDOWN;
                        break;
                    default:
                        console.log(">>> Comando desconhecido");
                }
                break;
            case ControllerState.EMPLOYEE_ROLES_MENU:
                switch (input) {
                    case ControllerState.EMPLOYEE_ROLES_CREATION:
                        this.currentState = ControllerState.EMPLOYEE_ROLES_CREATION;
                        break;
                    case ControllerState.EMPLOYEE_ROLES_REMOVAL:
                        this.currentState = ControllerState.EMPLOYEE_ROLES_REMOVAL;
                        break;
                    case ControllerState.EMPLOYEE_EDITING:
                        this.currentState = ControllerState.EMPLOYEE_EDITING;
                        break;
                    case ControllerState.MAIN_MENU:
                        this.currentState = ControllerState.MAIN_MENU;
                        break;
                    case ControllerState.SHUTDOWN:
                        this.currentState = ControllerState.SHUTDOWN;
                        break;
                    default:
                        console.log(">>> Comando desconhecido");
                }
                break;
            default:
                console.log(">>> Comando desconhecido");
                this.currentState = ControllerState.RESET;
        }
    }

}

export default EmployeeController;