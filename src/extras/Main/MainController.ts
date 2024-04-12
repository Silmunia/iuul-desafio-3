import ControllerState from "./ControllerState";
import DataManager from "../Commons/DataManager";
import InputHandler from "../Commons/InputHandler";
import MenuRenderer from "../Commons/MenuRenderer";
import EmployeeController from "../Employee/EmployeeController";
import ClientController from "../Client/ClientController";

class MainController {
    private _currentState: ControllerState = ControllerState.MAIN_MENU;
    private _inputHandler: InputHandler = new InputHandler();
    private _menuRenderer: MenuRenderer = new MenuRenderer();
    private _dataManager: DataManager = new DataManager();
    private _employeeController: EmployeeController | undefined;
    private _clientController: ClientController | undefined;
    
    public startProgram() {
        this.runControlLoop();
    }

    private async runControlLoop() {
        switch (this._currentState) {
            case ControllerState.MAIN_MENU:
                this.displayMenu();
                await this.startCommandInput("Insira comando: ");
                break;
            case ControllerState.SHUTDOWN:
                console.log(">>> Encerrando programa");
                return;
            case ControllerState.RESET:
                console.log(">>> Voltando para o Menu principal");
                this._currentState = ControllerState.MAIN_MENU;
                this.runControlLoop();
                break;
            default:
                console.log(">>> Comando desconhecido");
                this._currentState = ControllerState.RESET;
                this.runControlLoop();
        }
    }

    private async startCommandInput(prompt: string) {
        let receivedInput = await this._inputHandler.getNumberInput(prompt);
        await this.parseInputForState(receivedInput);
        this.runControlLoop();
    }

    private async parseInputForState(input: number) {
        switch(this._currentState) {
            case ControllerState.MAIN_MENU:
                switch (input) {
                    case ControllerState.EMPLOYEE_MENU:
                        this._currentState = await this.delegateEmployeeControl();
                        break;
                    case ControllerState.CLIENT_MENU:
                        this._currentState = await this.delegateClientControl();
                        break;
                    case ControllerState.SHUTDOWN:
                        this._currentState = ControllerState.SHUTDOWN;
                        break;
                    default:
                        console.log(">>> Comando desconhecido");
                        this._currentState = ControllerState.RESET;
                }
                break;
            default:
                console.log(">>> Comando desconhecido");
                this._currentState = ControllerState.RESET;
        }
    }

    private async delegateEmployeeControl() {
        this._employeeController = new EmployeeController(this._dataManager);
        return await this._employeeController.runEmployeeCommands();
    }

    private async delegateClientControl() {
        this._clientController = new ClientController(this._dataManager);
        return await this._clientController.runClientCommands();
    }

    private displayMenu() {
        let renderResult = this._menuRenderer.renderMainMenu(this._currentState);

        if (!renderResult) {
            console.log(">>> Menu desconhecido");
            console.log(">>> Voltando para o Menu Principal");
            this._currentState = ControllerState.MAIN_MENU;
            this.runControlLoop();
        }
    }
}

export default MainController;