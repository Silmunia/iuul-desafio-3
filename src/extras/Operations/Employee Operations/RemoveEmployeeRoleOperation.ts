import Funcionario from "../../../objects/classes/Funcionario";
import DataManager from "../../Commons/DataManager";
import InputHandler from "../../Commons/InputHandler";
import Operation from "../Abstract Operation/Operation";
import MainMenuOperation from "../MainMenuOperation";
import EmployeeRolesMenu from "./EmployeeRolesMenu";

class RemoveEmployeeRoleOperation extends Operation {

    private _editedEmployee: Funcionario;
    private _inputHandler: InputHandler = new InputHandler();

    constructor(dataManager: DataManager, editedEmployee: Funcionario) {
        super(dataManager);
        this._editedEmployee = editedEmployee;
    }

    public async runOperation(): Promise<Operation> {
        if (this._editedEmployee.cargos.length == 1) {
            console.log("\n>>> O Funcionário possui apenas um Cargo, portanto não é possível remover Cargos");
            console.log(">>> Voltando para o Menu de Editar Cargos do Funcionário");
            return new EmployeeRolesMenu(this._dataManager, this._editedEmployee);
        } else {
            let employeeRoles = this._dataManager.listEditedEmployeeRoles(this._editedEmployee);
            
            if (employeeRoles === "") {
                console.log("\n>>> ERRO FATAL: O Funcionário não possui nenhum Cargo");
                console.log(">>> O programa será encerrado");

                let termination = new MainMenuOperation(this._dataManager);
                termination.maintainExecution = false;
                return termination;
            } else {
                console.log(`O Funcionário possui os seguintes Cargos: ${employeeRoles}`);
                let removedRoleName = await this._inputHandler.getStringInput("Insira o nome do Cargo a remover: ");

                try {
                    this._dataManager.removeEmployeeRole(this._editedEmployee, removedRoleName);

                    console.log(">>> Cargo removido com sucesso");
                } catch (error) {
                    console.log(`>>> Falha na remoção do Cargo. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
                }

                return new EmployeeRolesMenu(this._dataManager, this._editedEmployee);
            }
        }
    }

}

export default RemoveEmployeeRoleOperation;