
import DataManager from "../../Commons/DataManager";
import EditEmployeeNameOperation from "./EditEmployeeNameOperation";
import Funcionario from "../../../objects/classes/Funcionario";
import InputHandler from "../../Commons/InputHandler";
import ListEmployeeInfoOperation from "./ListEmployeeInfoOperation";
import MainMenuOperation from "../MainMenuOperation";
import MenuRenderer from "../../Commons/MenuRenderer";
import Operation from "../Abstract Operation/Operation";
import EditEmployeePhoneOperation from "./EditEmployeePhoneOperation";
import EditEmployeeSalaryOperation from "./EditEmployeeSalaryOperation";
import EditEmployeeCpfOperation from "./EditEmployeeCpfOperation";
import EmployeeRolesMenu from "./EmployeeRolesMenu";

class EmployeeEditMenuOperation extends Operation {

    private _inputHandler: InputHandler = new InputHandler();
    private _menuRenderer: MenuRenderer = new MenuRenderer();
    private _expectedInputs: Array<number> = [1, 2, 3, 4, 5, 6, 7, 999];

    private _editedEmployee: Funcionario;

    constructor(dataManager: DataManager, editedEmployee: Funcionario) {
        super(dataManager);
        this._editedEmployee = editedEmployee;
    }

    public async runOperation(): Promise<Operation> {
        this._menuRenderer.renderEditEmployeeMenu(this._expectedInputs);

        return await this.startCommandInput("Insira um comando: ");
    }

    private async startCommandInput(prompt: string): Promise<Operation> {
        let receivedInput = await this._inputHandler.getNumberInput(prompt);

        switch(receivedInput) {
            case this._expectedInputs[0]:
                return new ListEmployeeInfoOperation(this._dataManager, this._editedEmployee);
            case this._expectedInputs[1]:
                return new EditEmployeeNameOperation(this._dataManager, this._editedEmployee);
            case this._expectedInputs[2]:
                return new EditEmployeePhoneOperation(this._dataManager, this._editedEmployee);
            case this._expectedInputs[3]:
                return new EditEmployeeSalaryOperation(this._dataManager, this._editedEmployee);
            case this._expectedInputs[4]:
                return new EditEmployeeCpfOperation(this._dataManager, this._editedEmployee);
            case this._expectedInputs[5]:
                return new EmployeeRolesMenu(this._dataManager, this._editedEmployee);
            case this._expectedInputs[6]:
                return new MainMenuOperation(this._dataManager);
            case this._expectedInputs[7]:
                let termination = new MainMenuOperation(this._dataManager);
                termination.maintainExecution = false;
                return termination;
            default:
                return this;
        }
    }

}

export default EmployeeEditMenuOperation;