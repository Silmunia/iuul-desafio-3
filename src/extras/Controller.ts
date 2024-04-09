import ControllerState from "./ControllerState";
import DataRepository from "./DataRepository";
import FactoryRepository from "./FactoryRepository";
import InputHandler from "./InputHandler";
import MenuRenderer from "./MenuRenderer";

class Controller {
    private currentState: ControllerState = ControllerState.MAIN_MENU;
    private inputHandler: InputHandler = new InputHandler();
    private menuRenderer: MenuRenderer = new MenuRenderer();
    private objFactory: FactoryRepository = new FactoryRepository();
    private appData: DataRepository = new DataRepository();
    
    public startProgram() {
        this.runControlLoop();
    }

    private async runControlLoop() {
        switch (this.currentState) {
            case ControllerState.MAIN_MENU:
            case ControllerState.EMPLOYEE_MENU:
            case ControllerState.CLIENT_MENU:
                this.displayMenu();
                this.startUserInput("Insira comando: ");
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
                console.log(">>> Iniciando criação de Funcionário");
                this.appData.addEmployee(await this.objFactory.startEmployeeCreation());
                this.currentState = ControllerState.EMPLOYEE_MENU;
                this.runControlLoop();
                break;
            case ControllerState.EMPLOYEE_LISTING:
                console.log(">>> Listando Funcionários");
                console.log(this.appData.listEmployees());
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
            console.log(">>> Iniciando criação de Cliente");
            this.appData.addClient(await this.objFactory.startClientCreation());
            this.currentState = ControllerState.CLIENT_MENU;
            this.runControlLoop();
            break;
            case ControllerState.CLIENT_LISTING:
                console.log(">>> Listando Clientes");
                console.log(this.appData.listClients());
                this.currentState = ControllerState.CLIENT_MENU;
                this.runControlLoop();
                break;
            default:
                console.log(">>> Comando desconhecido");
                this.currentState = ControllerState.RESET;
                this.runControlLoop();
        }
    }

    private async startUserInput(prompt: string) {
        let input = await this.inputHandler.getStringInput(prompt);
        this.parseUserInput(input);
    }

    private parseUserInput(input: unknown) {
        if (typeof input === 'string') {
            let parsedInput: number = parseInt(input);
            
            this.currentState = parsedInput;
            this.runControlLoop();
        } else {
            this.currentState = ControllerState.RESET;
            this.runControlLoop();
        }
    }
}

export default Controller;