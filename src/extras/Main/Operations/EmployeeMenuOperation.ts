
import InputHandler from "../../Commons/InputHandler";
import MainMenuOperation from "./MainMenuOperation";
import MainOperationTemplate from "./Abstract Operation/MainOperationTemplate";
import MenuRenderer from "../../Commons/MenuRenderer";

class EmployeeMenuOperation extends MainOperationTemplate {

    private _inputHandler: InputHandler = new InputHandler();
    private _menuRenderer: MenuRenderer = new MenuRenderer();
    private _expectedInputs: Array<number> = [1, 2, 3, 999];

    public async runOperation(): Promise<MainOperationTemplate> {
        this._menuRenderer.renderMainEmployeeMenu(this._expectedInputs);

        return await this.startCommandInput("Insira um comando: ");
    }

    private async startCommandInput(prompt: string): Promise<MainOperationTemplate> {
        let receivedInput = await this._inputHandler.getNumberInput(prompt);

        switch(receivedInput) {
            case this._expectedInputs[0]:
                return this;
            case this._expectedInputs[1]:
                return this;
            case this._expectedInputs[2]:
                return new MainMenuOperation(this._dataManager);
            case this._expectedInputs[3]:
                let termination = new MainMenuOperation(this._dataManager);
                termination.maintainExecution = false;
                return termination;
            default:
                return this;
        }
    }
}

export default EmployeeMenuOperation;