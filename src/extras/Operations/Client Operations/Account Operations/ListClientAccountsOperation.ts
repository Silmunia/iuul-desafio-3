
import Cliente from "../../../../objects/classes/Cliente";
import DataManager from "../../../Commons/DataManager";
import Operation from "../../Abstract Operation/Operation";
import MainMenuOperation from "../../MainMenuOperation";
import ClientAccountsMenuOperation from "./ClientAccountsMenuOperation";

class ListClientAccountsOperation extends Operation {

    private _editedClient: Cliente;

    constructor(dataManager: DataManager, editedClient: Cliente) {
        super(dataManager);
        this._editedClient = editedClient;
    }

    public async runOperation(): Promise<Operation> {
        console.log("\n>>> Listando Contas do Cliente");

        try {
            let result = this._dataManager.listClientAccounts(this._editedClient);
            console.log(result);

            return new ClientAccountsMenuOperation(this._dataManager, this._editedClient);
        } catch (error) {
            console.log(`${error instanceof Error ? error.message : ">>> ERRO FATAL DESCONHECIDO"}`);
            console.log(">>> O programa será encerrado");

            let termination = new MainMenuOperation(this._dataManager);
            termination.maintainExecution = false;
            return termination;
        }
    }
}

export default ListClientAccountsOperation;