
import Cliente from "../../../../objects/classes/Cliente";
import Conta from "../../../../objects/abstract classes/Conta";
import DataManager from "../../../Commons/DataManager";
import InputHandler from "../../../Commons/InputHandler";
import Operation from "../../Abstract Operation/Operation";
import ClientAccountsMenuOperation from "./ClientAccountsMenuOperation";

class AddClientAccountOperation extends Operation {

    private _editedClient: Cliente;
    private _inputHandler: InputHandler = new InputHandler();

    constructor(dataManager: DataManager, editedClient: Cliente) {
        super(dataManager);
        this._editedClient = editedClient;
    }

    public async runOperation(): Promise<Operation> {
        try {
            console.log("\n>>> Iniciando criação de nova Conta");
            let newAddress = await this.createAccount();
            
            this._dataManager.addAccountToClient(this._editedClient, newAddress);

            console.log(">>> Conta adicionada com sucesso");
        } catch (error) {
            console.log(`Falha na criação da Conta. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
        }

        return new ClientAccountsMenuOperation(this._dataManager, this._editedClient);
    }

    private async createAccount(): Promise<Conta> {
        let accountInput = await this._inputHandler.getNumberInput("Escolha um tipo de conta para criar\n1. Conta Corrente\n2. Conta Poupança\nInsira um comando: ");

        let number: string = await this._inputHandler.getStringInput("Insira o número da Conta: ");

        if (accountInput == 1) {
            let limit: number = await this._inputHandler.getNumberInput("Insira o limite da Conta: ");
            
            return this._dataManager.createCheckingAccount(number, limit);
        } else if (accountInput == 2) {
            return this._dataManager.createSavingsAccount(number);
        } else {
            console.log(">>> Comando inválido. Insira 1 ou 2");
            return this.createAccount();
        }
    }

}

export default AddClientAccountOperation;