
import DataManager from "../../../Commons/DataManager";

abstract class MainOperationTemplate {
    protected _dataManager: DataManager;
    public maintainExecution: boolean = true;

    constructor(dataManager: DataManager) {
        this._dataManager = dataManager;
    }

    public abstract runOperation(): Promise<MainOperationTemplate>
}

export default MainOperationTemplate;