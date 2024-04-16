
import InputHandler from "../../Commons/InputHandler";
import Operation from "../Abstract Operation/Operation";
import EmployeeEditMenuOperation from "./EmployeeEditMenuOperation";
import EmployeeMenuOperation from "./EmployeeMenuOperation";

class SelectEmployeeOperation extends Operation {

    private _inputHandler: InputHandler = new InputHandler();

    public async runOperation(): Promise<Operation> {

        console.log("\n>>> Listando Funcionários");

        try {
            let listResult = this._dataManager.listEmployees();
            console.log(listResult);
        } catch (error) {
            console.log(`>>> Não foi possível listar os Funcionários. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
            console.log(">>> Voltando ao Menu de Funcionários");
            return new EmployeeMenuOperation(this._dataManager);
        }

        let selectedIndex = await this._inputHandler.getNumberInput("Selecione um Funcionário: ");
        let parsedIndex = selectedIndex - 1;

        console.log(`>>> Funcionário ${selectedIndex} selecionado`);
        try {
            let selectedEmployee = this._dataManager.getEmployeeFromRepository(parsedIndex);

            return new EmployeeEditMenuOperation(this._dataManager, selectedEmployee);
        } catch (error) {
            console.log(`>>> Falha em selecionar Funcionário. ${error instanceof Error ? error.message : "Erro desconhecido"}`);

            return new EmployeeMenuOperation(this._dataManager);
        }
    }
}

export default SelectEmployeeOperation;