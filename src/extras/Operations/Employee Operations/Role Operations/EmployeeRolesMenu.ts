
import DataManager from "../../../Commons/DataManager";
import EmployeeEditMenuOperation from "../EmployeeEditMenuOperation";
import Funcionario from "../../../../objects/classes/Funcionario";
import InputHandler from "../../../Commons/InputHandler";
import MainMenuOperation from "../../MainMenuOperation";
import MenuRenderer from "../../../Commons/MenuRenderer";
import Operation from "../../Abstract Operation/Operation";
import AddEmployeeRoleOperation from "./AddEmployeeRoleOperation";
import RemoveEmployeeRoleOperation from "./RemoveEmployeeRoleOperation";

class EmployeeRolesMenu extends Operation {

    private _inputHandler: InputHandler = new InputHandler();
    private _menuRenderer: MenuRenderer = new MenuRenderer();
    private _editedEmployee: Funcionario;
    private _expectedInputs: Array<number> = [1, 2, 3, 4, 999];

    constructor(dataManager: DataManager, editedEmployee: Funcionario) {
        super(dataManager);
        this._editedEmployee = editedEmployee;
    }

    public async runOperation(): Promise<Operation> {
        this._menuRenderer.renderEditEmployeeRolesMenu(this._expectedInputs);

        return await this.startCommandInput("Insira um comando: ");
    }

    private async startCommandInput(prompt: string): Promise<Operation> {
        let receivedInput = await this._inputHandler.getNumberInput(prompt);

        switch(receivedInput) {
            case this._expectedInputs[0]:
                return new AddEmployeeRoleOperation(this._dataManager, this._editedEmployee);
            case this._expectedInputs[1]:
                return new RemoveEmployeeRoleOperation(this._dataManager, this._editedEmployee);
            case this._expectedInputs[2]:
                return new EmployeeEditMenuOperation(this._dataManager, this._editedEmployee);
            case this._expectedInputs[3]:
                return new MainMenuOperation(this._dataManager);
            case this._expectedInputs[4]:
                let termination = new MainMenuOperation(this._dataManager);
                termination.maintainExecution = false;
                return termination;
            default:
                console.log(">>> Comando inválido");
                return this;
        }
    }
}

export default EmployeeRolesMenu;