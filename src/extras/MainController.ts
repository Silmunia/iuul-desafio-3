import Funcionario from "../objects/classes/Funcionario";
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
                this.displayMenu();
                this.startCommandInput("Insira comando: ");
                break;
            case ControllerState.EMPLOYEE_CREATION:
            case ControllerState.EMPLOYEE_LISTING:
            case ControllerState.EMPLOYEE_SELECTION:
            case ControllerState.EMPLOYEE_EDIT_LIST:
            case ControllerState.EMPLOYEE_EDIT_NAME:
            case ControllerState.EMPLOYEE_EDIT_PHONE:
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
        this.currentState = await this.inputHandler.getNumberInput(prompt);
        this.runControlLoop();
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
            case ControllerState.EMPLOYEE_EDIT_LIST:
                console.log(this.dataManager.listEditedEmployeeInfo());
                this.currentState = ControllerState.EMPLOYEE_EDITING;
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