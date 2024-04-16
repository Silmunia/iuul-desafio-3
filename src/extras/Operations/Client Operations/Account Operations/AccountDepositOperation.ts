
import Cliente from "../../../../objects/classes/Cliente";
import DataManager from "../../../Commons/DataManager";
import InputHandler from "../../../Commons/InputHandler";
import Operation from "../../Abstract Operation/Operation";
import ClientAccountsMenuOperation from "./ClientAccountsMenuOperation";

class AccountDepositOperation extends Operation {

    private _editedClient: Cliente;
    private _inputHandler: InputHandler = new InputHandler();

    constructor(dataManager: DataManager, editedClient: Cliente) {
        super(dataManager);
        this._editedClient = editedClient;
    }

    public async runOperation(): Promise<Operation> {
        console.log("\n>>> Iniciando depósito");
        let accountDepositNumber = await this._inputHandler.getStringInput("Insira o número da Conta recebedora do depósito: ");

        try {
            let depositAccount = this._dataManager.getClientAccount(this._editedClient, accountDepositNumber);

            let depositValue = await this._inputHandler.getNumberInput("Insira o valor do depósito: ");

            depositAccount.depositar(depositValue);

            console.log(">>> Depósito realizado com sucesso");
        } catch (error) {
            console.log(`>>> Falha na operação de depósito. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
        }

        return new ClientAccountsMenuOperation(this._dataManager, this._editedClient);
    }
}

export default AccountDepositOperation;