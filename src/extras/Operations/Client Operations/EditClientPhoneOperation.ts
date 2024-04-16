
import Cliente from "../../../objects/classes/Cliente";
import DataManager from "../../Commons/DataManager";
import InputHandler from "../../Commons/InputHandler";
import Operation from "../Abstract Operation/Operation";
import ClientEditMenuOperation from "./ClientEditMenuOperation";

class EditClientPhoneOperation extends Operation {

    private _editedClient: Cliente;
    private _inputHandler: InputHandler = new InputHandler();

    constructor(dataManager: DataManager, editedClient: Cliente) {
        super(dataManager);
        this._editedClient = editedClient;
    }

    public async runOperation(): Promise<Operation> {
        console.log("\n>>> Editando Telefone do Cliente");
        console.log(`Telefone atual: ${this._editedClient.telefone}`);
        let newPhone = await this._inputHandler.getStringInput("Insira o novo Telefone do Cliente: ");

        this._editedClient.telefone = newPhone;
        console.log(">>> Telefone atualizado com sucesso");

        return new ClientEditMenuOperation(this._dataManager, this._editedClient);
    }

}

export default EditClientPhoneOperation;