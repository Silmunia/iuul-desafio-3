
import DataManager from "../Commons/DataManager";
import MainMenuOperation from "../Operations/MainMenuOperation";
import Operation from "../Operations/Abstract Operation/Operation";

class MainController {
    private _dataManager: DataManager = new DataManager();
    private _currentOperation: Operation = new MainMenuOperation(this._dataManager);

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