
import Cliente from "../../../../objects/classes/Cliente";
import ContaCorrente from "../../../../objects/classes/ContaCorrente";
import DataManager from "../../../Commons/DataManager";
import InputHandler from "../../../Commons/InputHandler";
import Operation from "../../Abstract Operation/Operation";
import ClientAccountsMenuOperation from "./ClientAccountsMenuOperation";

class AccountTransferOperation extends Operation {

    private _editedClient: Cliente;
    private _inputHandler: InputHandler = new InputHandler();

    constructor(dataManager: DataManager, editedClient: Cliente) {
        super(dataManager);
        this._editedClient = editedClient;
    }

    public async runOperation(): Promise<Operation> {
        console.log("\n>>> Iniciando transferência");
        let originAccountNumber = await this._inputHandler.getStringInput("Insira o número da Conta de origem da transferência: ");

        try {
            let originAccount = this._dataManager.getClientAccount(this._editedClient, originAccountNumber);

            if (originAccount instanceof ContaCorrente) {
                let targetAccountNumber = await this._inputHandler.getStringInput("Insira o número da Conta de destino da transferência: ");

                try {
                    let targetAccount = this._dataManager.getTargetAccountForTransfer(targetAccountNumber);
                
                    let transferValue = await this._inputHandler.getNumberInput("Insira o valor a ser transferido: ");
        
                    try {
                        originAccount.transferir(targetAccount, transferValue);
                        console.log(">>> Transferência realizada com sucesso");
                    } catch (error) {
                        console.log(`>>> Não foi possível concluir a transferência. ${error instanceof Error ? error.message : ""}`);
                    }
                } catch (error) {
                    console.log(`>>> Não foi possível concluir a transferência. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
                }
            } else {
                console.log(">>> Não é possível fazer transferências a partir de uma Conta Poupança");
            }
        } catch (error) {
            console.log(`>>> Não foi possível concluir a transferência. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
        }
        
        return new ClientAccountsMenuOperation(this._dataManager, this._editedClient);
    }
}

export default AccountTransferOperation;