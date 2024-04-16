
import DataManager from "../../Commons/DataManager";
import EmployeeEditMenuOperation from "./EmployeeEditMenuOperation";
import Funcionario from "../../../objects/classes/Funcionario";
import InputHandler from "../../Commons/InputHandler";
import Operation from "../Abstract Operation/Operation";

class EditEmployeeSalaryOperation extends Operation {

    private _editedEmployee: Funcionario;
    private _inputHandler: InputHandler = new InputHandler();

    constructor(dataManager: DataManager, editedEmployee: Funcionario) {
        super(dataManager);
        this._editedEmployee = editedEmployee;
    }

    public async runOperation(): Promise<Operation> {
        console.log("\n>>> Editando Salário do Funcionário");
        console.log(`Salário atual: ${this._editedEmployee.salario}`);

        let newSalary = await this._inputHandler.getNumberInput("Insira o novo Salário do Funcionário: ");
        this._editedEmployee.salario = newSalary;
        console.log(">>> Salário atualizado com sucesso");

        return new EmployeeEditMenuOperation(this._dataManager, this._editedEmployee);
    }

}

export default EditEmployeeSalaryOperation;