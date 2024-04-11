import ControllerState from "./ControllerState";
import DataManager from "./DataManager";
import InputHandler from "./InputHandler";
import MenuRenderer from "./MenuRenderer";
import EmployeeController from "./EmployeeController";
import ClientController from "./ClientController";

class MainController {
    private currentState: ControllerState = ControllerState.MAIN_MENU;
    private inputHandler: InputHandler = new InputHandler();
    private menuRenderer: MenuRenderer = new MenuRenderer();
    private dataManager: DataManager = new DataManager();
    private employeeController: EmployeeController | undefined;
    private clientController: ClientController | undefined;
    
    public startProgram() {
        this.runControlLoop();
    }

    private async runControlLoop() {
        switch (this.currentState) {
            case ControllerState.MAIN_MENU:
                this.displayMenu();
                await this.startCommandInput("Insira comando: ");
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
                        this.currentState = await this.delegateEmployeeControl(input);
                        break;
                    case ControllerState.CLIENT_MENU:
                        this.currentState = await this.delegateClientControl(input);
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

    private async delegateEmployeeControl(initialState: ControllerState) {
        let editedEmployee = this.dataManager.getEditedEmployee();

        this.employeeController = new EmployeeController(initialState, editedEmployee, this.dataManager);
        return await this.employeeController.runEmployeeCommands();
    }

    private async delegateClientControl(initialState: ControllerState) {
        let editedClient = this.dataManager.getEditedClient();

        this.clientController = new ClientController(initialState, editedClient, this.dataManager);
        return await this.clientController.runClientCommands();
    }

    private displayMenu() {
        let renderResult = this.menuRenderer.renderMainMenu(this.currentState);

        if (!renderResult) {
            console.log(">>> Menu desconhecido");
            console.log(">>> Voltando para o Menu Principal");
            this.currentState = ControllerState.MAIN_MENU;
            this.runControlLoop();
        }
    }
}

export default MainController;