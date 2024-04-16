
import DataManager from "../../Commons/DataManager";

abstract class Operation {
    protected _dataManager: DataManager;
    public maintainExecution: boolean = true;

    constructor(dataManager: DataManager) {
        this._dataManager = dataManager;
    }

    public abstract runOperation(): Promise<Operation>
}

export default Operation;