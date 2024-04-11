import Funcionario from "../objects/classes/Funcionario";
import Cargo from "../objects/classes/Cargo";
import ControllerState from "./ControllerState";
import DataManager from "./DataManager";
import InputHandler from "./InputHandler";
import MenuRenderer from "./MenuRenderer";
import EmployeeController from "./EmployeeController";

class MainController {
    private currentState: ControllerState = ControllerState.MAIN_MENU;
    private inputHandler: InputHandler = new InputHandler();
    private menuRenderer: MenuRenderer = new MenuRenderer();
    private dataManager: DataManager = new DataManager();
    private employeeController: EmployeeController | undefined;
    
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
                await this.startCommandInput("Insira comando: ");
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
            case ControllerState.EMPLOYEE_ROLES_REMOVAL:
                await this.runEmployeeCommands();
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
        await this.parseInputForState(receivedInput);
        this.runControlLoop();
    }

    private async parseInputForState(input: number) {
        switch(this.currentState) {
            case ControllerState.MAIN_MENU:
                switch (input) {
                    case ControllerState.EMPLOYEE_MENU:
                        this.currentState = ControllerState.EMPLOYEE_MENU;
                        break;
                    case ControllerState.CLIENT_MENU:
                        this.currentState = ControllerState.CLIENT_MENU;
                        break;
                    case ControllerState.SHUTDOWN:
                        this.currentState = ControllerState.SHUTDOWN;
                        break;
                    default:
                        console.log(">>> Comando desconhecido");
                        this.currentState = ControllerState.RESET;
                }
                break;
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
                        this.currentState = ControllerState.RESET;
                }
                break;
            case ControllerState.EMPLOYEE_EDITING:
                switch (input) {
                    case ControllerState.EMPLOYEE_EDIT_LIST:
                    case ControllerState.EMPLOYEE_EDIT_NAME:
                    case ControllerState.EMPLOYEE_EDIT_PHONE:
                    case ControllerState.EMPLOYEE_EDIT_SALARY:
                    case ControllerState.EMPLOYEE_EDIT_CPF:
                        this.currentState = await this.delegateEmployeeEditing(input);
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
                        this.currentState = ControllerState.RESET;
                }
                break;
            case ControllerState.CLIENT_MENU:
                switch (input) {
                    case ControllerState.CLIENT_CREATION:
                        this.currentState = ControllerState.CLIENT_CREATION;
                        break;
                    case ControllerState.CLIENT_LISTING:
                        this.currentState = ControllerState.CLIENT_LISTING;
                        break;
                    case ControllerState.MAIN_MENU:
                        this.currentState = ControllerState.MAIN_MENU;
                        break;
                    case ControllerState.SHUTDOWN:
                        this.currentState = ControllerState.SHUTDOWN;
                        break;
                    default:
                        console.log(">>> Comando desconhecido");
                        this.currentState = ControllerState.RESET;
                }
                break;
            case ControllerState.EMPLOYEE_ROLES_MENU:
                switch (input) {
                    case ControllerState.EMPLOYEE_ROLES_CREATION:
                    case ControllerState.EMPLOYEE_ROLES_REMOVAL:
                    case ControllerState.EMPLOYEE_EDITING:
                        this.currentState = await this.delegateEmployeeEditing(input);
                        break;
                    case ControllerState.MAIN_MENU:
                        this.currentState = ControllerState.MAIN_MENU;
                        break;
                    case ControllerState.SHUTDOWN:
                        this.currentState = ControllerState.SHUTDOWN;
                        break;
                    default:
                        console.log(">>> Comando desconhecido");
                        this.currentState = ControllerState.RESET;
                }
                break;
            default:
                console.log(">>> Comando desconhecido");
                this.currentState = ControllerState.RESET;
        }
    }

    private async delegateEmployeeEditing(initialState: ControllerState) {
        let editedEmployee = this.dataManager.getEditedEmployee();

        if (editedEmployee instanceof Funcionario) {
            this.employeeController = new EmployeeController(initialState, editedEmployee, this.dataManager);
            return await this.employeeController.runEmployeeCommands();
        } else {
            console.log(">>> Não foi possível encontrar o Funcionário");
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