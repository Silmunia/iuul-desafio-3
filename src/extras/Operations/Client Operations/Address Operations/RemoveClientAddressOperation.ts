
import Cliente from "../../../../objects/classes/Cliente";
import Endereco from "../../../../objects/classes/Endereco";
import DataManager from "../../../Commons/DataManager";
import InputHandler from "../../../Commons/InputHandler";
import Operation from "../../Abstract Operation/Operation";
import MainMenuOperation from "../../MainMenuOperation";
import ClientAddressesMenuOperation from "./ClientAddressesMenuOperation";

class RemoveClientAddressOperation extends Operation {

    private _editedClient: Cliente;
    private _inputHandler: InputHandler = new InputHandler();

    constructor(dataManager: DataManager, editedClient: Cliente) {
        super(dataManager);
        this._editedClient = editedClient;
    }

    public async runOperation(): Promise<Operation> {
        if (this._editedClient.enderecos.length === 1) {
            console.log("\n>>> O Cliente possui apenas um Endereço, portanto não é possível remover Endereços");
            console.log(">>> Voltando para o Menu de Editar Endereços");

            return new ClientAddressesMenuOperation(this._dataManager, this._editedClient);
        } else {
            console.log("\n>>> Listando Endereços do Cliente");
            let clientAddresses = this._dataManager.listClientAddresses(this._editedClient);

            if (clientAddresses === "") {
                console.log(">>> ERRO FATAL: O Cliente não possui nenhum Endereço");
                console.log(">>> O programa será encerrado");

                let termination = new MainMenuOperation(this._dataManager);
                termination.maintainExecution = false;

                return termination;
            } else {
                console.log(clientAddresses);
                let selectedAddress = await this._inputHandler.getNumberInput("Insira o índice do Endereço a remover: ");
                let parsedAddressIndex = selectedAddress-1;

                try {
                    this._dataManager.removeClientAddress(this._editedClient, parsedAddressIndex);

                    console.log(">>> Endereço removido com sucesso");
                } catch (error) {
                    console.log(`>>> Falha na remoção do Endereço. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
                }

                return new ClientAddressesMenuOperation(this._dataManager, this._editedClient);
            }
        }
    }
}

export default RemoveClientAddressOperation;