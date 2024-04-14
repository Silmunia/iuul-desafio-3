
import DataManager from "../../Commons/DataManager";
import EmployeeMenuOperation from "./EmployeeMenuOperation";
import InputHandler from "../../Commons/InputHandler";
import MainOperationTemplate from "./Abstract Operation/MainOperationTemplate";
import MenuRenderer from "../../Commons/MenuRenderer";

class MainMenuOperation extends MainOperationTemplate {

    private _inputHandler: InputHandler = new InputHandler();
    private _menuRenderer: MenuRenderer = new MenuRenderer();
    private _expectedInputs: Array<number> = [1, 2, 999];

    constructor(dataManager: DataManager) {
        super(dataManager);
    }

    public async runOperation(): Promise<MainOperationTemplate> {
        this._menuRenderer.renderMainMenu(this._expectedInputs);

        return await this.startCommandInput("Insira um comando: ");
    }

    private async startCommandInput(prompt: string): Promise<MainOperationTemplate> {
        let receivedInput = await this._inputHandler.getNumberInput(prompt);

        switch(receivedInput) {
            case this._expectedInputs[0]:
                return new EmployeeMenuOperation(this._dataManager);
            case this._expectedInputs[1]:
                return this;
            case this._expectedInputs[2]:
                this.maintainExecution = false;
                return this;
            default:
                return this;
        }
    }
}

export default MainMenuOperation;