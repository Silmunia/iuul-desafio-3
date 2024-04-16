
import DataManager from "../../Commons/DataManager";
import EmployeeEditMenuOperation from "./EmployeeEditMenuOperation";
import Funcionario from "../../../objects/classes/Funcionario";
import InputHandler from "../../Commons/InputHandler";
import Operation from "../Abstract Operation/Operation";

class EditEmployeeCpfOperation extends Operation {

    private _inputHandler: InputHandler = new InputHandler();
    private _editedEmployee: Funcionario;

    constructor(dataManager: DataManager, editedEmployee: Funcionario) {
        super(dataManager);
        this._editedEmployee = editedEmployee;
    }

    public async runOperation(): Promise<Operation> {
        console.log("\n>>> Editando CPF do Funcionário");
        console.log(`CPF atual: ${this._editedEmployee.cpf}`);

        let newCPF = await this._inputHandler.getStringInput("Insira o novo CPF do Funcionário: ");
        this._editedEmployee.cpf = newCPF;
        console.log(">>> CPF atualizado com sucesso");

        return new EmployeeEditMenuOperation(this._dataManager, this._editedEmployee);
    }

}

export default EditEmployeeCpfOperation;