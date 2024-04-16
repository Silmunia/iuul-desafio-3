
import DataManager from "../../Commons/DataManager";
import Funcionario from "../../../objects/classes/Funcionario";
import InputHandler from "../../Commons/InputHandler";
import Operation from "../Abstract Operation/Operation";
import EmployeeEditMenuOperation from "./EmployeeEditMenuOperation";

class EditEmployeeNameOperation extends Operation {

    private _inputHandler: InputHandler = new InputHandler();

    private _editedEmployee: Funcionario;

    constructor(dataManager: DataManager, editedEmployee: Funcionario) {
        super(dataManager);
        this._editedEmployee = editedEmployee;
    }

    public async runOperation(): Promise<Operation> {
        console.log("\n>>> Editando Nome do Funcionário");
        console.log(`Nome atual: ${this._editedEmployee.nome}`);

        let newName = await this._inputHandler.getStringInput("Insira o novo Nome do Funcionário: ");
        this._editedEmployee.nome = newName;
        console.log(">>> Nome atualizado com sucesso");

        return new EmployeeEditMenuOperation(this._dataManager, this._editedEmployee);
    }
}

export default EditEmployeeNameOperation;