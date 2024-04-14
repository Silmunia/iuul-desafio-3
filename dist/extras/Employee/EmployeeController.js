"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MenuRenderer_1 = __importDefault(require("../Commons/MenuRenderer"));
const ControllerState_1 = __importDefault(require("../Main/ControllerState"));
const InputHandler_1 = __importDefault(require("../Commons/InputHandler"));
const EmployeeControllerState_1 = __importDefault(require("./EmployeeControllerState"));
const EmployeeControlParser_1 = __importDefault(require("./EmployeeControlParser"));
const EmployeeOperator_1 = __importDefault(require("./EmployeeOperator"));
class EmployeeController {
    constructor(dataManager) {
        this.currentState = EmployeeControllerState_1.default.EMPLOYEE_MENU;
        this.inputHandler = new InputHandler_1.default();
        this.menuRenderer = new MenuRenderer_1.default();
        this.controlParser = new EmployeeControlParser_1.default();
        this.operator = new EmployeeOperator_1.default(dataManager);
    }
    runEmployeeCommands() {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this.currentState) {
                case EmployeeControllerState_1.default.RETURN_TO_MAIN:
                    return ControllerState_1.default.MAIN_MENU;
                case EmployeeControllerState_1.default.SHUTDOWN:
                    return ControllerState_1.default.SHUTDOWN;
                case EmployeeControllerState_1.default.RESET:
                    console.log(">>> Voltando ao Menu de Funcionários");
                    this.currentState = EmployeeControllerState_1.default.EMPLOYEE_MENU;
                    return this.runEmployeeCommands();
                case EmployeeControllerState_1.default.EMPLOYEE_MENU:
                case EmployeeControllerState_1.default.EMPLOYEE_EDITING:
                case EmployeeControllerState_1.default.EMPLOYEE_ROLES_MENU:
                    try {
                        this.menuRenderer.renderEmployeeMenus(this.currentState);
                        yield this.startCommandInput("Insira comando: ");
                    }
                    catch (error) {
                        console.log(`>>> ${error instanceof Error ? error.message : "Erro ao exibir o Menu"}`);
                        console.log(">>> Voltando para o Menu Principal");
                        this.currentState = EmployeeControllerState_1.default.RETURN_TO_MAIN;
                    }
                    return this.runEmployeeCommands();
                case EmployeeControllerState_1.default.EMPLOYEE_LISTING:
                    this.currentState = this.operator.listEmployeesOperation();
                    break;
                case EmployeeControllerState_1.default.EMPLOYEE_SELECTION:
                    this.currentState = yield this.operator.selectEmployeeOperation();
                    break;
                case EmployeeControllerState_1.default.EMPLOYEE_CREATION:
                    this.currentState = yield this.operator.createEmployeeOperation();
                    break;
                case EmployeeControllerState_1.default.EMPLOYEE_EDIT_NAME:
                    this.currentState = yield this.operator.editEmployeeNameOperation();
                    break;
                case EmployeeControllerState_1.default.EMPLOYEE_EDIT_PHONE:
                    this.currentState = yield this.operator.editEmployeePhoneOperation();
                    break;
                case EmployeeControllerState_1.default.EMPLOYEE_EDIT_SALARY:
                    this.currentState = yield this.operator.editEmployeeSalaryOperation();
                    break;
                case EmployeeControllerState_1.default.EMPLOYEE_EDIT_CPF:
                    this.currentState = yield this.operator.editEmployeeCpfOperation();
                    break;
                case EmployeeControllerState_1.default.EMPLOYEE_EDIT_LIST:
                    this.currentState = this.operator.listEmployeeInfoOperation();
                    break;
                case EmployeeControllerState_1.default.EMPLOYEE_ROLES_CREATION:
                    this.currentState = yield this.operator.createEmployeeRoleOperation();
                    break;
                case EmployeeControllerState_1.default.EMPLOYEE_ROLES_REMOVAL:
                    this.currentState = yield this.operator.removeEmployeeRoleOperation();
                    break;
                default:
                    console.log(">>> Comando desconhecido");
                    this.currentState = EmployeeControllerState_1.default.RESET;
            }
            return this.runEmployeeCommands();
        });
    }
    startCommandInput(prompt) {
        return __awaiter(this, void 0, void 0, function* () {
            let receivedInput = yield this.inputHandler.getNumberInput(prompt);
            try {
                this.currentState = yield this.controlParser.parseInputForState(this.currentState, receivedInput);
            }
            catch (error) {
                console.log(`>>> Erro ao executar o comando. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
            }
        });
    }
}
exports.default = EmployeeController;
