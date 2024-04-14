
import ControllerState from "../ControllerState";
import EmployeeController from "../../Employee/EmployeeController";
import MainMenuOperation from "./MainMenuOperation";
import MainOperationTemplate from "./Abstract Operation/MainOperationTemplate";

class EmployeeMenuOperation extends MainOperationTemplate {

    private _employeeController: EmployeeController | undefined;

    public async runOperation(): Promise<MainOperationTemplate> {
        this._employeeController = new EmployeeController(this._dataManager);

        let result = await this._employeeController.runEmployeeCommands();

        if (result === ControllerState.MAIN_MENU) {
            return new MainMenuOperation(this._dataManager);
        } else if (result === ControllerState.SHUTDOWN) {
            let termination = new MainMenuOperation(this._dataManager);
            termination.maintainExecution = false;
            return termination;
        } else {
            return this;
        }
    }
}

export default EmployeeMenuOperation;