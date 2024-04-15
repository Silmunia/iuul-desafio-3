
import DataManager from "../Commons/DataManager";
import MainOperationTemplate from "./Operations/Abstract Operation/MainOperationTemplate";
import MainMenuOperation from "./Operations/MainMenuOperation";

class MainController {
    private _dataManager: DataManager = new DataManager();
    private _currentOperation: MainOperationTemplate = new MainMenuOperation(this._dataManager);

    public maintainLoop: boolean = true;
    
    public startProgram() {
        this.runControlLoop();
    }

    private async runControlLoop() {
        while (this._currentOperation.maintainExecution) {
            this._currentOperation = await this._currentOperation.runOperation();
        }

        console.log(">>> Encerrando programa");
    }
}

export default MainController;