
import InputHandler from "../../../Commons/InputHandler";
import MainMenuOperation from "../../MainMenuOperation";
import MenuRenderer from "../../../Menu Renderer/Interface/MenuRenderer";
import Operation from "../../Abstract Operation/Operation";
import ClientEditMenuOperation from "../ClientEditMenuOperation";
import Cliente from "../../../../objects/classes/Cliente";
import DataManager from "../../../Commons/DataManager";
import AddClientAddressOperation from "./AddClientAddressOperation";
import ListClientAddressesOperation from "./ListClientAddressesOperation";
import RemoveClientAddressOperation from "./RemoveClientAddressOperation";
import ClientAddressMenuRenderer from "../../../Menu Renderer/ClientAddressMenuRenderer";

class ClientAddressesMenuOperation extends Operation {

    private _editedClient: Cliente;
    private _inputHandler: InputHandler = new InputHandler();
    private _menuRenderer: MenuRenderer = new ClientAddressMenuRenderer();
    private _expectedInputs: Array<number> = [1, 2, 3, 4, 5, 999];

    constructor(dataManager: DataManager, editedClient: Cliente) {
        super(dataManager);
        this._editedClient = editedClient;
    }

    public async runOperation(): Promise<Operation> {
        this._menuRenderer.renderMenu(this._expectedInputs);

        return await this.startCommandInput("Insira um comando: ");
    }

    private async startCommandInput(prompt: string): Promise<Operation> {
        let receivedInput = await this._inputHandler.getNumberInput(prompt);

        switch(receivedInput) {
            case this._expectedInputs[0]:
                return new ListClientAddressesOperation(this._dataManager, this._editedClient);
            case this._expectedInputs[1]:
                return new AddClientAddressOperation(this._dataManager, this._editedClient);
            case this._expectedInputs[2]:
                return new RemoveClientAddressOperation(this._dataManager, this._editedClient);
            case this._expectedInputs[3]:
                return new ClientEditMenuOperation(this._dataManager, this._editedClient);
            case this._expectedInputs[4]:
                return new MainMenuOperation(this._dataManager);
            case this._expectedInputs[5]:
                let termination = new MainMenuOperation(this._dataManager);
                termination.maintainExecution = false;
                return termination;
            default:
                console.log(">>> Comando inválido");
                return this;
        }
    }
}

export default ClientAddressesMenuOperation;