
import MenuRenderer from "../Commons/MenuRenderer";
import ControllerState from "../Main/ControllerState";
import InputHandler from "../Commons/InputHandler";
import DataManager from "../Commons/DataManager";
import ClientControllerState from "./ClientControllerState";
import ClientControlParser from "./ClientControlParser";
import ClientOperator from "./ClientOperator";

class ClientController {
    private currentState: ClientControllerState = ClientControllerState.CLIENT_MENU;
    private inputHandler: InputHandler = new InputHandler();
    private menuRenderer: MenuRenderer = new MenuRenderer();
    private controlParser: ClientControlParser = new ClientControlParser();
    private operator: ClientOperator;

    constructor(dataManager: DataManager) {
        this.operator = new ClientOperator(dataManager);
    }

    public async runClientCommands(): Promise<ControllerState> {
        switch(this.currentState) {
            case ClientControllerState.RETURN_TO_MAIN:
                return ControllerState.MAIN_MENU;
            case ClientControllerState.SHUTDOWN:
                return ControllerState.SHUTDOWN;
            case ClientControllerState.RESET:
                console.log(">>> Voltando ao Menu de Clientes");
                this.currentState = ClientControllerState.CLIENT_MENU;
                return this.runClientCommands();
            case ClientControllerState.CLIENT_MENU:
            case ClientControllerState.CLIENT_EDITING:
            case ClientControllerState.CLIENT_ADDRESS_MENU:
            case ClientControllerState.CLIENT_ACCOUNT_MENU:
                try {
                    this.menuRenderer.renderClientMenus(this.currentState);
                    await this.startCommandInput("Insira comando: ");
                } catch (error) {
                    console.log(`>>> ${error instanceof Error ? error.message : "Erro ao exibir o Menu"}`);
                    console.log(">>> Voltando para o Menu Principal");
                    this.currentState = ClientControllerState.RETURN_TO_MAIN;
                }
                return this.runClientCommands();
            case ClientControllerState.CLIENT_LISTING:
                this.currentState = this.operator.listClientsOperation();
                break;
            case ClientControllerState.CLIENT_SELECTION:
                this.currentState = await this.operator.selectClientOperation();
                break;
            case ClientControllerState.CLIENT_CREATION:
                this.currentState = await this.operator.createClientOperation();
                break;
            case ClientControllerState.CLIENT_EDIT_LIST:
                this.currentState = this.operator.listClientInfoOperation();
                break;
            case ClientControllerState.CLIENT_EDIT_NAME:
                this.currentState = await this.operator.editClientNameOperation();
                break;
            case ClientControllerState.CLIENT_EDIT_PHONE:
                this.currentState = await this.operator.editClientPhoneOperation();
                break;
            case ClientControllerState.CLIENT_EDIT_CPF:
                this.currentState = await this.operator.editClientCpfOperation();
                break;
            case ClientControllerState.CLIENT_EDIT_VIP:
                this.currentState = await this.operator.editClientVipOperation();
                break;
            case ClientControllerState.CLIENT_ADDRESS_CREATION:
                this.currentState = await this.operator.createClientAddressOperation();
                break;
            case ClientControllerState.CLIENT_ADDRESS_REMOVAL:
                this.currentState = await this.operator.removeClientAddressOperation();
                break;
            case ClientControllerState.CLIENT_ADDRESS_LIST:
                this.currentState = this.operator.listClientAddressesOperation();
                break;
            case ClientControllerState.CLIENT_ACCOUNT_LIST:
                this.currentState = this.operator.listClientAccountsOperation();
                break;
            case ClientControllerState.CLIENT_ACCOUNT_CREATION:
                this.currentState = await this.operator.createClientAccountOperation();
                break;
            case ClientControllerState.CLIENT_ACCOUNT_REMOVAL:
                this.currentState = await this.operator.removeClientAccountOperation();
                break;
            case ClientControllerState.CLIENT_ACCOUNT_DEPOSIT:
                this.currentState = await this.operator.makeAccountDepositOperation();
                break;
            case ClientControllerState.CLIENT_ACCOUNT_WITHDRAW:
                this.currentState = await this.operator.makeAccountWithdrawOperation();
                break;
            case ClientControllerState.CLIENT_ACCOUNT_BALANCE:
                this.currentState = await this.operator.makeAccountBalanceOperation();
                break;
            case ClientControllerState.CLIENT_ACCOUNT_TRANSFER:
                this.currentState = await this.operator.makeAccountTransferOperation();
                break;
            default:
                console.log(">>> Comando desconhecido");
                this.currentState = ClientControllerState.RESET;
        }

        return this.runClientCommands();
    }

    private async startCommandInput(prompt: string) {
        let receivedInput = await this.inputHandler.getNumberInput(prompt);
        try {
            this.currentState = await this.controlParser.parseInputForState(this.currentState, receivedInput);
        } catch (error) {
            console.log(`>>> Erro ao executar o comando. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
        }
    }
}

export default ClientController;