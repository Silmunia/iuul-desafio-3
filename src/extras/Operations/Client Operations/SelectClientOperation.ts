
import InputHandler from "../../Commons/InputHandler";
import Operation from "../Abstract Operation/Operation";
import ClientEditMenuOperation from "./ClientEditMenuOperation";
import ClientMenuOperation from "./ClientMenuOperation";

class SelectClientOperation extends Operation {

    private _inputHandler: InputHandler = new InputHandler();

    public async runOperation(): Promise<Operation> {
        console.log("\n>>> Listando Funcionários");

        try {
            let listResult = this._dataManager.listClients();
            console.log(listResult);
        } catch (error) {
            console.log(`>>> Não foi possível listar os Clientes. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
            console.log(">>> Voltando ao Menu de Clientes");
            return new ClientMenuOperation(this._dataManager);
        }

        let selectedIndex = await this._inputHandler.getNumberInput("Selecione um Cliente: ");
        let parsedIndex = selectedIndex - 1;

        console.log(`>>> Cliente ${selectedIndex} selecionado`);
        try {
            let selectedClient = this._dataManager.getClientFromRepository(parsedIndex);

            return new ClientEditMenuOperation(this._dataManager, selectedClient);
        } catch (error) {
            console.log(`>>> Falha em selecionar Cliente. ${error instanceof Error ? error.message : "Erro desconhecido"}`);

            return new ClientMenuOperation(this._dataManager);
        }
    }
}

export default SelectClientOperation;