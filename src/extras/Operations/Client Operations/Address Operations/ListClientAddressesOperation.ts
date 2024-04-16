
import Cliente from "../../../../objects/classes/Cliente";
import DataManager from "../../../Commons/DataManager";
import Operation from "../../Abstract Operation/Operation";
import MainMenuOperation from "../../MainMenuOperation";
import ClientAddressesMenuOperation from "./ClientAddressesMenuOperation";

class ListClientAddressesOperation extends Operation {

    private _editedClient: Cliente;

    constructor(dataManager: DataManager, editedClient: Cliente) {
        super(dataManager);
        this._editedClient = editedClient;
    }

    public async runOperation(): Promise<Operation> {
        console.log("\n>>> Listando Endereços do Cliente");

        try {
            let result = this._dataManager.listClientAddresses(this._editedClient);
            console.log(result);

            return new ClientAddressesMenuOperation(this._dataManager, this._editedClient);
        } catch (error) {
            console.log(`${error instanceof Error ? error.message : ">>> ERRO FATAL DESCONHECIDO"}`);
            console.log(">>> O programa será encerrado");

            let termination = new MainMenuOperation(this._dataManager);
            termination.maintainExecution = false;
            return termination;
        }
    }
}

export default ListClientAddressesOperation;