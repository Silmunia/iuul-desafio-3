
import CreateEmployeeOperation from "./CreateEmployeeOperation";
import InputHandler from "../../Commons/InputHandler";
import MainMenuOperation from "../MainMenuOperation";
import MenuRenderer from "../../Menu Renderer/Interface/MenuRenderer";
import Operation from "../Abstract Operation/Operation";
import SelectEmployeeOperation from "./SelectEmployeeOperation";
import EmployeeMenuRenderer from "../../Menu Renderer/EmployeeMenuRenderer";

class EmployeeMenuOperation extends Operation {

    private _inputHandler: InputHandler = new InputHandler();
    private _menuRenderer: MenuRenderer = new EmployeeMenuRenderer();
    private _expectedInputs: Array<number> = [1, 2, 3, 999];

    public async runOperation(): Promise<Operation> {
        this._menuRenderer.renderMenu(this._expectedInputs);

        return await this.startCommandInput("Insira um comando: ");
    }

    private async startCommandInput(prompt: string): Promise<Operation> {
        let receivedInput = await this._inputHandler.getNumberInput(prompt);

        switch(receivedInput) {
            case this._expectedInputs[0]:
                return new CreateEmployeeOperation(this._dataManager);
            case this._expectedInputs[1]:
                return new SelectEmployeeOperation(this._dataManager);
            case this._expectedInputs[2]:
                return new MainMenuOperation(this._dataManager);
            case this._expectedInputs[3]:
                let termination = new MainMenuOperation(this._dataManager);
                termination.maintainExecution = false;
                return termination;
            default:
                console.log(">>> Comando inválido");
                return this;
        }
    }
}

export default EmployeeMenuOperation;