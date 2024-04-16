
import DataManager from "../../Commons/DataManager";
import EmployeeEditMenuOperation from "./EmployeeEditMenuOperation";
import Funcionario from "../../../objects/classes/Funcionario";
import Operation from "../Abstract Operation/Operation";

class ListEmployeeInfoOperation extends Operation {

    private _editedEmployee: Funcionario;

    constructor(dataManager: DataManager, editedEmployee: Funcionario) {
        super(dataManager);
        this._editedEmployee = editedEmployee;
    }

    public async runOperation(): Promise<Operation> {
        console.log("\n>>> Listando informações do Funcionário");
        console.log(this._dataManager.listEmployeeInfo(this._editedEmployee));

        return new EmployeeEditMenuOperation(this._dataManager, this._editedEmployee);
    }
}

export default ListEmployeeInfoOperation;