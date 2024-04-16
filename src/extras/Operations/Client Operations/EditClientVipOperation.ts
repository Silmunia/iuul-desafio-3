
import Cliente from "../../../objects/classes/Cliente";
import DataManager from "../../Commons/DataManager";
import InputHandler from "../../Commons/InputHandler";
import Operation from "../Abstract Operation/Operation";
import ClientEditMenuOperation from "./ClientEditMenuOperation";

class EditClientVipOperation extends Operation {

    private _editedClient: Cliente;
    private _inputHandler: InputHandler = new InputHandler();

    constructor(dataManager: DataManager, editedClient: Cliente) {
        super(dataManager);
        this._editedClient = editedClient;
    }

    public async runOperation(): Promise<Operation> {
        console.log("\n>>> Editando estado VIP do Cliente");
        console.log(`Estado VIP atual: ${this._editedClient.vip ? "VIP" : "Normal"}`);
        let newVIP = await this._inputHandler.getBooleanInput(`${this._editedClient.vip ? "O Cliente continua VIP? (s/n): " : "O Cliente se torna VIP? (s/n): "}`);

        this._editedClient.vip = newVIP;
        console.log(">>> Estado VIP atualizado com sucesso");

        return new ClientEditMenuOperation(this._dataManager, this._editedClient);
    }

}

export default EditClientVipOperation;