
import Cliente from "../../../../objects/classes/Cliente";
import DataManager from "../../../Commons/DataManager";
import InputHandler from "../../../Commons/InputHandler";
import Operation from "../../Abstract Operation/Operation";
import ClientAccountsMenuOperation from "./ClientAccountsMenuOperation";

class AccountWithdrawOperation extends Operation {

    private _editedClient: Cliente;
    private _inputHandler: InputHandler = new InputHandler();

    constructor(dataManager: DataManager, editedClient: Cliente) {
        super(dataManager);
        this._editedClient = editedClient;
    }

    public async runOperation(): Promise<Operation> {
        console.log("\n>>> Iniciando saque");
        let accountWithdrawNumber = await this._inputHandler.getStringInput("Insira o número da Conta para fazer o saque: ");

        try {
            let withdrawAccount = this._dataManager.getClientAccount(this._editedClient, accountWithdrawNumber);

            let withdrawValue = await this._inputHandler.getNumberInput("Insira o valor do saque: ");

            try {
                withdrawAccount.fazerSaque(withdrawValue);

                console.log(">>> Saque realizado com sucesso");
            } catch (error) {
                console.log(`>>> Falha na operação de saque. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
            }
        } catch (error) {
            console.log(`>>> Falha na operação de saque. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
        }

        return new ClientAccountsMenuOperation(this._dataManager, this._editedClient);
    }
}

export default AccountWithdrawOperation;