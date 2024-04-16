
import Cliente from "../../../../objects/classes/Cliente";
import DataManager from "../../../Commons/DataManager";
import InputHandler from "../../../Commons/InputHandler";
import Operation from "../../Abstract Operation/Operation";
import ClientAccountsMenuOperation from "./ClientAccountsMenuOperation";

class AccountBalanceOperation extends Operation {

    private _editedClient: Cliente;
    private _inputHandler: InputHandler = new InputHandler();

    constructor(dataManager: DataManager, editedClient: Cliente) {
        super(dataManager);
        this._editedClient = editedClient;
    }

    public async runOperation(): Promise<Operation> {
        console.log("\n>>> Iniciando cálculo de saldo");
        let accountBalanceNumber = await this._inputHandler.getStringInput("Insira o número da Conta para calcular o saldo: ");

        try {
            let balanceAccount = this._dataManager.getClientAccount(this._editedClient, accountBalanceNumber);

            console.log(`>>> O saldo da conta é $${balanceAccount?.calcularSaldo()}`);
        } catch (error) {
            console.log(`>>> Falha na operação de saldo. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
        }

        return new ClientAccountsMenuOperation(this._dataManager, this._editedClient);
    }
}

export default AccountBalanceOperation;