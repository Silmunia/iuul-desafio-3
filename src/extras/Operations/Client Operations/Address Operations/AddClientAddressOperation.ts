
import Cliente from "../../../../objects/classes/Cliente";
import Endereco from "../../../../objects/classes/Endereco";
import DataManager from "../../../Commons/DataManager";
import InputHandler from "../../../Commons/InputHandler";
import Operation from "../../Abstract Operation/Operation";
import ClientAddressesMenuOperation from "./ClientAddressesMenuOperation";

class AddClientAddressOperation extends Operation {

    private _editedClient: Cliente;
    private _inputHandler: InputHandler = new InputHandler();

    constructor(dataManager: DataManager, editedClient: Cliente) {
        super(dataManager);
        this._editedClient = editedClient;
    }

    public async runOperation(): Promise<Operation> {
        try {
            console.log("\n>>> Iniciando criação de novo Endereço");
            let newAddress = await this.createAddress();
            
            this._dataManager.addAddressToClient(this._editedClient, newAddress);

            console.log(">>> Endereço adicionado com sucesso");
        } catch (error) {
            console.log(`Falha na criação do Endereço. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
        }

        return new ClientAddressesMenuOperation(this._dataManager, this._editedClient);
    }

    private async createAddress(): Promise<Endereco> {
        let state: string = await this._inputHandler.getStringInput("Insira a Unidade Federativa do Endereço: ");
        let city: string = await this._inputHandler.getStringInput("Insira a cidade do Endereço: ");
        let street: string = await this._inputHandler.getStringInput("Insira o logradouro do Endereço: ");
        let number: string = await this._inputHandler.getStringInput("Insira o número do Endereço: ");
        let extraInfo: string = await this._inputHandler.getStringInput("Insira o complemento do Endereço: ");
        let zipCode: string = await this._inputHandler.getStringInput("Insira o CEP do Endereço: ");

        return this._dataManager.createAddress(zipCode, street, number, extraInfo, city, state);
    }

}

export default AddClientAddressOperation;