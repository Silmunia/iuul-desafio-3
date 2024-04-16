
import Cliente from "../../../objects/classes/Cliente";
import InputHandler from "../../Commons/InputHandler";
import MainMenuOperation from "../MainMenuOperation";
import MenuRenderer from "../../Commons/MenuRenderer";
import Operation from "../Abstract Operation/Operation";
import DataManager from "../../Commons/DataManager";
import EditClientNameOperation from "./EditClientNameOperation";
import ListClientInfoOperation from "./ListClientInfoOperation";
import EditClientPhoneOperation from "./EditClientPhoneOperation";
import EditClientCpfOperation from "./EditClientCpfOperation";
import EditClientVipOperation from "./EditClientVipOperation";
import ClientAddressesMenuOperation from "./Address Operations/ClientAddressesMenuOperation";
import ClientAccountsMenuOperation from "./Account Operations/ClientAccountsMenuOperation";

class ClientEditMenuOperation extends Operation {

    private _editedClient: Cliente;
    private _inputHandler: InputHandler = new InputHandler();
    private _menuRenderer: MenuRenderer = new MenuRenderer();
    private _expectedInputs: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 999];

    constructor(dataManager: DataManager, editedClient: Cliente) {
        super(dataManager);
        this._editedClient = editedClient;
    }

    public async runOperation(): Promise<Operation> {
        this._menuRenderer.renderEditClientMenu(this._expectedInputs);

        return await this.startCommandInput("Insira um comando: ");
    }

    private async startCommandInput(prompt: string): Promise<Operation> {
        let receivedInput = await this._inputHandler.getNumberInput(prompt);

        switch(receivedInput) {
            case this._expectedInputs[0]:
                return new ListClientInfoOperation(this._dataManager, this._editedClient);
            case this._expectedInputs[1]:
                return new EditClientNameOperation(this._dataManager, this._editedClient);
            case this._expectedInputs[2]:
                return new EditClientPhoneOperation(this._dataManager, this._editedClient);
            case this._expectedInputs[3]:
                return new EditClientCpfOperation(this._dataManager, this._editedClient);
            case this._expectedInputs[4]:
                return new EditClientVipOperation(this._dataManager, this._editedClient);
            case this._expectedInputs[5]:
                return new ClientAddressesMenuOperation(this._dataManager, this._editedClient);
            case this._expectedInputs[6]:
                return new ClientAccountsMenuOperation(this._dataManager, this._editedClient);
            case this._expectedInputs[7]:
                return new MainMenuOperation(this._dataManager);
            case this._expectedInputs[8]:
                let termination = new MainMenuOperation(this._dataManager);
                termination.maintainExecution = false;
                return termination;
            default:
                console.log(">>> Comando inválido");
                return this;
        }
    }

}

export default ClientEditMenuOperation;