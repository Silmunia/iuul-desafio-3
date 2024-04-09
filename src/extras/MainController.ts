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
                this.displayMenu();
                this.startCommandInput("Insira comando: ");
                break;
            case ControllerState.EMPLOYEE_CREATION:
            case ControllerState.EMPLOYEE_LISTING:
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
                this.currentState = ControllerState.EMPLOYEE_MENU;
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