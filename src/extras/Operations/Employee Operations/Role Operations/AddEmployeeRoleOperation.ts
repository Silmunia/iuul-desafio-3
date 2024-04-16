
import DataManager from "../../../Commons/DataManager";
import EmployeeRolesMenu from "./EmployeeRolesMenu";
import Funcionario from "../../../../objects/classes/Funcionario";
import InputHandler from "../../../Commons/InputHandler";
import MainMenuOperation from "../../MainMenuOperation";
import Operation from "../../Abstract Operation/Operation";

class AddEmployeeRoleOperation extends Operation {

    private _editedEmployee: Funcionario;
    private _inputHandler: InputHandler = new InputHandler();

    constructor(dataManager: DataManager, editedEmployee: Funcionario) {
        super(dataManager);
        this._editedEmployee = editedEmployee;
    }

    public async runOperation(): Promise<Operation> {
        console.log("\n>>> Iniciando adição de novo Cargo");

        let employeeRoles = this._dataManager.listEmployeeRoles(this._editedEmployee);

        if (employeeRoles === "") {
            console.log("\n>>> ERRO FATAL: O Funcionário não possui nenhum Cargo");
            console.log(">>> O programa será encerrado");

            let termination = new MainMenuOperation(this._dataManager);
            termination.maintainExecution = false;
            return termination;
        } else {
            console.log(`O Funcionário possui os seguintes Cargos: ${employeeRoles}`);
            let newRoleName = await this._inputHandler.getStringInput("Insira o nome do Cargo a adicionar: ");

            try {
                this._dataManager.addRoleToEmployee(this._editedEmployee, newRoleName);

                console.log(">>> Cargo adicionado com sucesso");
            } catch (error) {
                console.log(`Falha na adição de Cargo ao Funcionário. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
            }
            
            return new EmployeeRolesMenu(this._dataManager, this._editedEmployee);
        }
    }

}

export default AddEmployeeRoleOperation;