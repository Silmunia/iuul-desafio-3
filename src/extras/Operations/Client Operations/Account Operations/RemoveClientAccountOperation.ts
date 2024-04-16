
import Cliente from "../../../../objects/classes/Cliente";
import DataManager from "../../../Commons/DataManager";
import InputHandler from "../../../Commons/InputHandler";
import Operation from "../../Abstract Operation/Operation";
import MainMenuOperation from "../../MainMenuOperation";
import ClientAccountsMenuOperation from "./ClientAccountsMenuOperation";

class RemoveClientAccountOperation extends Operation {

    private _editedClient: Cliente;
    private _inputHandler: InputHandler = new InputHandler();

    constructor(dataManager: DataManager, editedClient: Cliente) {
        super(dataManager);
        this._editedClient = editedClient;
    }

    public async runOperation(): Promise<Operation> {
        if (this._editedClient.contas.length === 1) {
            console.log("\n>>> O Cliente possui apenas uma Conta, portanto não é possível remover Endereços");
            console.log(">>> Voltando para o Menu de Editar Contas");

            return new ClientAccountsMenuOperation(this._dataManager, this._editedClient);
        } else {
            console.log("\n>>> Listando Contas do Cliente");
            let clientAccounts = this._dataManager.listClientAccounts(this._editedClient);

            if (clientAccounts === "") {
                console.log(">>> ERRO FATAL: O Cliente não possui nenhuma Conta");
                console.log(">>> O programa será encerrado");

                let termination = new MainMenuOperation(this._dataManager);
                termination.maintainExecution = false;

                return termination;
            } else {
                console.log(clientAccounts);
                let selectedAccount = await this._inputHandler.getNumberInput("Insira o índice da Conta a remover: ");
                let parsedAccountIndex = selectedAccount-1;

                try {
                    this._dataManager.removeClientAccount(this._editedClient, parsedAccountIndex);

                    console.log(">>> Conta removido com sucesso");
                } catch (error) {
                    console.log(`>>> Falha na remoção da Conta. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
                }

                return new ClientAccountsMenuOperation(this._dataManager, this._editedClient);
            }
        }
    }
}

export default RemoveClientAccountOperation;