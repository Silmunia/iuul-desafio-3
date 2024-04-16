
import Cliente from "../../../objects/classes/Cliente";
import DataManager from "../../Commons/DataManager";
import InputHandler from "../../Commons/InputHandler";
import Operation from "../Abstract Operation/Operation";
import ClientEditMenuOperation from "./ClientEditMenuOperation";

class EditClientNameOperation extends Operation {

    private _editedClient: Cliente;
    private _inputHandler: InputHandler = new InputHandler();

    constructor(dataManager: DataManager, editedClient: Cliente) {
        super(dataManager);
        this._editedClient = editedClient;
    }

    public async runOperation(): Promise<Operation> {
        console.log("\n>>> Editando Nome do Cliente");
        console.log(`Nome atual: ${this._editedClient.nome}`);
        let newName = await this._inputHandler.getStringInput("Insira o novo Nome do Cliente: ");

        this._editedClient.nome = newName;
        console.log(">>> Nome atualizado com sucesso");

        return new ClientEditMenuOperation(this._dataManager, this._editedClient);
    }

}

export default EditClientNameOperation;