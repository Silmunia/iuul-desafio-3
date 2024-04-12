import ControllerState from "./ControllerState";
import DataManager from "../Commons/DataManager";
import InputHandler from "../Commons/InputHandler";
import MenuRenderer from "../Commons/MenuRenderer";
import EmployeeController from "../Employee/EmployeeController";
import ClientController from "../Client/ClientController";

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
                        this.currentState = await this.delegateEmployeeControl();
                        break;
                    case ControllerState.CLIENT_MENU:
                        this.currentState = await this.delegateClientControl();
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

    private async delegateEmployeeControl() {
        this.employeeController = new EmployeeController(this.dataManager);
        return await this.employeeController.runEmployeeCommands();
    }

    private async delegateClientControl() {
        this.clientController = new ClientController(this.dataManager);
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