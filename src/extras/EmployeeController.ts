
import Funcionario from "../objects/classes/Funcionario";
import Cargo from "../objects/classes/Cargo";
import ControllerState from "./ControllerState";
import InputHandler from "./InputHandler";
import DataManager from "./DataManager";

class EmployeeController {

    private employeeInEditing: Funcionario;
    private dataManager: DataManager;
    private currentState: ControllerState;
    private inputHandler: InputHandler = new InputHandler();

    constructor(initialState: ControllerState, editedEmployee: Funcionario, dataManager: DataManager) {
        this.currentState = initialState
        this.employeeInEditing = editedEmployee;
        this.dataManager = dataManager;
    }

    public async runEmployeeCommands(): Promise<ControllerState> {
        switch (this.currentState) {
            case ControllerState.EMPLOYEE_EDIT_NAME:
                console.log(`Nome atual do Funcionário: ${this.employeeInEditing.nome}`);
                let newName = await this.inputHandler.getStringInput("Insira o novo Nome do Funcionário: ");
                this.employeeInEditing.nome = newName;
                console.log(">>> Nome atualizado com sucesso");
                return ControllerState.EMPLOYEE_EDITING;
            case ControllerState.EMPLOYEE_EDIT_PHONE:
                console.log(`Telefone atual do Funcionário: ${this.employeeInEditing.telefone}`);
                let newPhone = await this.inputHandler.getStringInput("Insira o novo Telefone do Funcionário: ");
                this.employeeInEditing.telefone = newPhone;
                console.log(">>> Telefone atualizado com sucesso");
                return ControllerState.EMPLOYEE_EDITING;
            case ControllerState.EMPLOYEE_EDIT_SALARY:
                console.log(`Salário atual do Funcionário: ${this.employeeInEditing.salario}`);
                let newSalary = await this.inputHandler.getNumberInput("Insira o novo Salário do Funcionário: ");
                this.employeeInEditing.salario = newSalary;
                console.log(">>> Salário atualizado com sucesso");
                return ControllerState.EMPLOYEE_EDITING;
            case ControllerState.EMPLOYEE_EDIT_CPF:
                console.log(`CPF atual do Funcionário: ${this.employeeInEditing.cpf}`);
                let newCPF = await this.inputHandler.getStringInput("Insira o novo CPF do Funcionário: ");
                this.employeeInEditing.cpf = newCPF;
                console.log(">>> CPF atualizado com sucesso");
                return ControllerState.EMPLOYEE_EDITING;
            case ControllerState.EMPLOYEE_EDIT_LIST:
                console.log(this.dataManager.listEditedEmployeeInfo());
                return ControllerState.EMPLOYEE_EDITING;
            case ControllerState.EMPLOYEE_ROLES_CREATION:
                console.log(">>> Iniciando adição de novo Cargo");
                let employeeRoles = this.dataManager.listEditedEmployeeRoles(this.employeeInEditing);
                console.log(`O Funcionário possui os seguintes Cargos: ${employeeRoles}`);
                let newRoleName = await this.inputHandler.getStringInput("Insira o nome do Cargo a adicionar: ");
                let newRole = new Cargo(newRoleName);
                this.employeeInEditing.cargos.push(newRole);
                console.log(">>> Cargo adicionado com sucesso")
                return ControllerState.EMPLOYEE_ROLES_MENU;
            case ControllerState.EMPLOYEE_ROLES_REMOVAL:
                if (this.employeeInEditing.cargos.length == 1) {
                    console.log(">>> O Funcionário possui apenas um Cargo, portanto não é possível remover Cargos");
                    console.log(">>> Voltando para o Menu de Editar Cargos do Funcionário");
                    return ControllerState.EMPLOYEE_ROLES_MENU;
                } else {
                    let employeeRoles = this.dataManager.listEditedEmployeeRoles(this.employeeInEditing);
                    if (employeeRoles === "") {
                        console.log(">>> ERRO FATAL: O Funcionário não possui nenhum Cargo");
                        console.log(">>> O programa será encerrado");
                        return ControllerState.SHUTDOWN;
                    } else {
                        console.log(`O Funcionário possui os seguintes Cargos: ${employeeRoles}`);
                        let removedRoleName = await this.inputHandler.getStringInput("Insira o nome do Cargo a remover: ");

                        let removedRole = this.dataManager.removeEditedEmployeeRole(removedRoleName);

                        if (removedRole) {
                            console.log(">>> Cargo removido com sucesso");
                            return ControllerState.EMPLOYEE_ROLES_MENU;
                        } else {
                            console.log(">>> O Funcionário não possui o Cargo escolhido");
                            return this.runEmployeeCommands();
                        }
                    }
                }
            default:
                console.log(">>> Comando desconhecido");
                return ControllerState.RESET;
        }
    }
}

export default EmployeeController;