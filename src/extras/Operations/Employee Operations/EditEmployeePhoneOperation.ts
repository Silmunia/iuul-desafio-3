
import DataManager from "../../Commons/DataManager";
import EmployeeEditMenuOperation from "./EmployeeEditMenuOperation";
import Funcionario from "../../../objects/classes/Funcionario";
import InputHandler from "../../Commons/InputHandler";
import Operation from "../Abstract Operation/Operation";

class EditEmployeePhoneOperation extends Operation {

    private _editedEmployee: Funcionario;
    private _inputHandler: InputHandler = new InputHandler();

    constructor(dataManager: DataManager, editedEmployee: Funcionario) {
        super(dataManager);
        this._editedEmployee = editedEmployee;
    }

    public async runOperation(): Promise<Operation> {
        console.log("\n>>> Editando Telefone do Funcionário");
        console.log(`Telefone atual: ${this._editedEmployee.telefone}`);

        let newPhone = await this._inputHandler.getStringInput("Insira o novo Telefone do Funcionário: ");
        this._editedEmployee.telefone = newPhone;
        console.log(">>> Telefone atualizado com sucesso");

        return new EmployeeEditMenuOperation(this._dataManager, this._editedEmployee);
    }

}

export default EditEmployeePhoneOperation;