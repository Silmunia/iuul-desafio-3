
import Cliente from "../../../objects/classes/Cliente";
import DataManager from "../../Commons/DataManager";
import InputHandler from "../../Commons/InputHandler";
import Operation from "../Abstract Operation/Operation";
import ClientEditMenuOperation from "./ClientEditMenuOperation";

class EditClientCpfOperation extends Operation {

    private _editedClient: Cliente;
    private _inputHandler: InputHandler = new InputHandler();

    constructor(dataManager: DataManager, editedClient: Cliente) {
        super(dataManager);
        this._editedClient = editedClient;
    }

    public async runOperation(): Promise<Operation> {
        console.log("\n>>> Editando CPF do Cliente");
        console.log(`CPF atual: ${this._editedClient.cpf}`);
        let newCpf = await this._inputHandler.getStringInput("Insira o novo CPF do Cliente: ");

        this._editedClient.cpf = newCpf;
        console.log(">>> CPF atualizado com sucesso");

        return new ClientEditMenuOperation(this._dataManager, this._editedClient);
    }

}

export default EditClientCpfOperation;