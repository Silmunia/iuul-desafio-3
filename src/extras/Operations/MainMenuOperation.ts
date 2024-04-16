
import ClientMenuOperation from "./Client Operations/ClientMenuOperation";
import DataManager from "../Commons/DataManager";
import EmployeeMenuOperation from "./Employee Operations/EmployeeMenuOperation";
import InputHandler from "../Commons/InputHandler";
import Operation from "./Abstract Operation/Operation";
import MenuRenderer from "../Commons/MenuRenderer";

class MainMenuOperation extends Operation {

    private _inputHandler: InputHandler = new InputHandler();
    private _menuRenderer: MenuRenderer = new MenuRenderer();
    private _expectedInputs: Array<number> = [1, 2, 999];

    constructor(dataManager: DataManager) {
        super(dataManager);
    }

    public async runOperation(): Promise<Operation> {
        this._menuRenderer.renderMainMenu(this._expectedInputs);

        return await this.startCommandInput("Insira um comando: ");
    }

    private async startCommandInput(prompt: string): Promise<Operation> {
        let receivedInput = await this._inputHandler.getNumberInput(prompt);

        switch(receivedInput) {
            case this._expectedInputs[0]:
                return new EmployeeMenuOperation(this._dataManager);
            case this._expectedInputs[1]:
                return new ClientMenuOperation(this._dataManager);
            case this._expectedInputs[2]:
                this.maintainExecution = false;
                return this;
            default:
                console.log(">>> Comando inválido");
                return this;
        }
    }
}

export default MainMenuOperation;