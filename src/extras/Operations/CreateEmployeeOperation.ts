
import InputHandler from "../Commons/InputHandler";
import Operation from "./Abstract Operation/Operation";
import EmployeeMenuOperation from "./EmployeeMenuOperation";

class CreateEmployeeOperation extends Operation {

    private _inputHandler: InputHandler = new InputHandler();

    public async runOperation(): Promise<Operation> {
        console.log("\n>>> Iniciando criação de Funcionário");

        let employeeName: string = await this._inputHandler.getStringInput("Insira o nome do Funcionário: ");
        let cpf: string = await this._inputHandler.getStringInput("Insira o CPF do Funcionário: ");
        let phone: string = await this._inputHandler.getStringInput("Insira o telefone do Funcionário: ");
        let salary: number = await this._inputHandler.getNumberInput("Insira o salário do Funcionário: ");
        let roleName: string = await this._inputHandler.getStringInput("Insira o cargo inicial do Funcionário: ");

        let numberOfRoles: number = await this._inputHandler.getNumberInput("Insira o número de Cargos adicionais do Funcionário: ");

        let additionalRoles: Array<string> = [];
        for (let i = 0; i < numberOfRoles; i++) {
            let newRoleName = await this._inputHandler.getStringInput(`Insira o nome do Cargo adicional ${i+1}/${numberOfRoles}: `);

            additionalRoles.push(newRoleName);
        }

        this._dataManager.createEmployee(roleName, cpf, employeeName, phone, salary, additionalRoles);
        console.log(">>> Funcionário criado com sucesso");

        return new EmployeeMenuOperation(this._dataManager);
    }
}

export default CreateEmployeeOperation;