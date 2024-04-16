
import InputHandler from "../../../Commons/InputHandler";
import MainMenuOperation from "../../MainMenuOperation";
import MenuRenderer from "../../../Commons/MenuRenderer";
import Operation from "../../Abstract Operation/Operation";
import ClientEditMenuOperation from "../ClientEditMenuOperation";
import Cliente from "../../../../objects/classes/Cliente";
import DataManager from "../../../Commons/DataManager";
import AddClientAccountOperation from "./AddClientAccountOperation";
import ListClientAccountsOperation from "./ListClientAccountsOperation";
import RemoveClientAccountOperation from "./RemoveClientAccountOperation";
import AccountDepositOperation from "./AccountDepositOperation";
import AccountWithdrawOperation from "./AccountWithdrawOperation";
import AccountBalanceOperation from "./AccountBalanceOperation";
import AccountTransferOperation from "./AccountTransferOperation";

class ClientAccountsMenuOperation extends Operation {

    private _editedClient: Cliente;
    private _inputHandler: InputHandler = new InputHandler();
    private _menuRenderer: MenuRenderer = new MenuRenderer();
    private _expectedInputs: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 999];

    constructor(dataManager: DataManager, editedClient: Cliente) {
        super(dataManager);
        this._editedClient = editedClient;
    }

    public async runOperation(): Promise<Operation> {
        this._menuRenderer.manageClientAccountsMenu(this._expectedInputs);

        return await this.startCommandInput("Insira um comando: ");
    }

    private async startCommandInput(prompt: string): Promise<Operation> {
        let receivedInput = await this._inputHandler.getNumberInput(prompt);

        switch(receivedInput) {
            case this._expectedInputs[0]:
                return new ListClientAccountsOperation(this._dataManager, this._editedClient);
            case this._expectedInputs[1]:
                return new AddClientAccountOperation(this._dataManager, this._editedClient);
            case this._expectedInputs[2]:
                return new RemoveClientAccountOperation(this._dataManager, this._editedClient);
            case this._expectedInputs[3]:
                return new AccountDepositOperation(this._dataManager, this._editedClient);
            case this._expectedInputs[4]:
                return new AccountWithdrawOperation(this._dataManager, this._editedClient);
            case this._expectedInputs[5]:
                return new AccountBalanceOperation(this._dataManager, this._editedClient);
            case this._expectedInputs[6]:
                return new AccountTransferOperation(this._dataManager, this._editedClient);
            case this._expectedInputs[7]:
                return new ClientEditMenuOperation(this._dataManager, this._editedClient);
            case this._expectedInputs[8]:
                return new MainMenuOperation(this._dataManager);
            case this._expectedInputs[9]:
                let termination = new MainMenuOperation(this._dataManager);
                termination.maintainExecution = false;
                return termination;
            default:
                console.log(">>> Comando inválido");
                return this;
        }
    }
}

export default ClientAccountsMenuOperation;