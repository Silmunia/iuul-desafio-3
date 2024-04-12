
import MenuRenderer from "../Commons/MenuRenderer";
import ControllerState from "../Main/ControllerState";
import InputHandler from "../Commons/InputHandler";
import DataManager from "../Commons/DataManager";
import EmployeeControllerState from "./EmployeeControllerState";
import EmployeeControlParser from "./EmployeeControlParser";
import EmployeeOperator from "./EmployeeOperator";

class EmployeeController {

    private currentState: EmployeeControllerState = EmployeeControllerState.EMPLOYEE_MENU;
    private inputHandler: InputHandler = new InputHandler();
    private menuRenderer: MenuRenderer = new MenuRenderer();
    private controlParser: EmployeeControlParser = new EmployeeControlParser();
    private operator: EmployeeOperator;

    constructor(dataManager: DataManager) {
        this.operator = new EmployeeOperator(dataManager);
    }

    public async runEmployeeCommands(): Promise<ControllerState> {
        switch (this.currentState) {
            case EmployeeControllerState.RETURN_TO_MAIN:
                return ControllerState.MAIN_MENU;
            case EmployeeControllerState.SHUTDOWN:
                return ControllerState.SHUTDOWN;
            case EmployeeControllerState.RESET:
                console.log(">>> Voltando ao Menu de Funcionários");
                this.currentState = EmployeeControllerState.EMPLOYEE_MENU;
                return this.runEmployeeCommands();
            case EmployeeControllerState.EMPLOYEE_MENU:
            case EmployeeControllerState.EMPLOYEE_EDITING:
            case EmployeeControllerState.EMPLOYEE_ROLES_MENU:
                this.displayMenu();
                await this.startCommandInput("Insira comando: ");
                return this.runEmployeeCommands();
            case EmployeeControllerState.EMPLOYEE_LISTING:
                this.currentState = this.operator.listEmployeesOperation();
                break;
            case EmployeeControllerState.EMPLOYEE_SELECTION:
                this.currentState = await this.operator.selectEmployeeOperation();
                break;
            case EmployeeControllerState.EMPLOYEE_CREATION:
                this.currentState = await this.operator.createEmployeeOperation();
                break;
            case EmployeeControllerState.EMPLOYEE_EDIT_NAME:
                this.currentState = await this.operator.editEmployeeNameOperation();
                break;
            case EmployeeControllerState.EMPLOYEE_EDIT_PHONE:
                this.currentState = await this.operator.editEmployeePhoneOperation();
                break;
            case EmployeeControllerState.EMPLOYEE_EDIT_SALARY:
                this.currentState = await this.operator.editEmployeeSalaryOperation();
                break;
            case EmployeeControllerState.EMPLOYEE_EDIT_CPF:
                this.currentState = await this.operator.editEmployeeCpfOperation();
                break;
            case EmployeeControllerState.EMPLOYEE_EDIT_LIST:
                this.currentState = this.operator.listEmployeeInfoOperation();
                break;
            case EmployeeControllerState.EMPLOYEE_ROLES_CREATION:
                this.currentState = await this.operator.createEmployeeRoleOperation();
                break;
            case EmployeeControllerState.EMPLOYEE_ROLES_REMOVAL:
                this.currentState = await this.operator.removeEmployeeRoleOperation();
                break;
            default:
                console.log(">>> Comando desconhecido");
                this.currentState = EmployeeControllerState.RESET;
        }

        return this.runEmployeeCommands();
    }

    private displayMenu() {
        let renderResult = this.menuRenderer.renderEmployeeMenus(this.currentState);

        if (!renderResult) {
            console.log(">>> Menu desconhecido");
            console.log(">>> Voltando para o Menu de Editar Funcionário");
            this.currentState = EmployeeControllerState.EMPLOYEE_EDITING;
        }
    }

    private async startCommandInput(prompt: string) {
        let receivedInput = await this.inputHandler.getNumberInput(prompt);
        this.currentState = await this.controlParser.parseInputForState(this.currentState, receivedInput);
    }
}

export default EmployeeController;