
import Cliente from "../objects/classes/Cliente";
import MenuRenderer from "./MenuRenderer";
import ControllerState from "./ControllerState";
import InputHandler from "./InputHandler";
import DataManager from "./DataManager";
import Endereco from "../objects/classes/Endereco";
import ContaCorrente from "../objects/classes/ContaCorrente";
import ContaPoupanca from "../objects/classes/ContaPoupanca";

class ClientController {
    private clientInEditing: Cliente;
    private dataManager: DataManager;
    private currentState: ControllerState;
    private inputHandler: InputHandler = new InputHandler();
    private menuRenderer: MenuRenderer = new MenuRenderer();

    constructor(initialState: ControllerState, editedEmployee: Cliente | undefined, dataManager: DataManager) {
        this.currentState = initialState
        this.dataManager = dataManager;

        if (editedEmployee instanceof Cliente) {
            this.clientInEditing = editedEmployee;
        } else {
            let nilAddress = new Endereco("", "", "", "", "", "");
            let nilAccount = new ContaPoupanca("");
            this.clientInEditing = new Cliente("", "", "", false, nilAddress, nilAccount);
        }
    }

    public async runClientCommands(): Promise<ControllerState> {
        switch(this.currentState) {
            case ControllerState.MAIN_MENU:
                return ControllerState.MAIN_MENU;
            case ControllerState.SHUTDOWN:
                return ControllerState.SHUTDOWN;
            case ControllerState.RESET:
                console.log(">>> Voltando ao Menu de Clientes");
                this.currentState = ControllerState.CLIENT_MENU;
                return this.runClientCommands();
            case ControllerState.CLIENT_MENU:
                this.displayMenu();
                await this.startCommandInput("Insira comando: ");
                return this.runClientCommands();
            case ControllerState.CLIENT_CREATION:
                await this.dataManager.addClient();
                this.currentState = ControllerState.CLIENT_MENU;
                return this.runClientCommands();
            case ControllerState.CLIENT_LISTING:
                this.dataManager.listClients();
                this.currentState = ControllerState.CLIENT_MENU;
                return this.runClientCommands();
            default:
                console.log(">>> Comando desconhecido");
                this.currentState = ControllerState.RESET;
                return this.runClientCommands();
        }
    }

    private displayMenu() {
        let renderResult = this.menuRenderer.renderMenu(this.currentState);

        if (!renderResult) {
            console.log(">>> Menu desconhecido");
            console.log(">>> Voltando para o Menu de Clintes");
            this.currentState = ControllerState.CLIENT_MENU;
        }
    }

    private async startCommandInput(prompt: string) {
        let receivedInput = await this.inputHandler.getNumberInput(prompt);
        await this.parseInputForState(receivedInput);
    }

    private async parseInputForState(input: number) {
        switch(this.currentState) {
            case ControllerState.CLIENT_MENU:
                switch(input) {
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
            default:
                console.log(">>> Comando desconhecido");
                this.currentState = ControllerState.RESET;
        }
    }
}

export default ClientController;