
import Funcionario from "../objects/classes/Funcionario";
import InputHandler from "./InputHandler";

class FactoryRepository {

    private inputHandler: InputHandler = new InputHandler();

    public async startEmployeeCreation(): Promise<Funcionario> {
        return new Promise<Funcionario>(async (resolve) => {
            let employeeName: string = await this.inputHandler.getStringInput("Insira o nome do Funcionário: ");
            let roleName: string = await this.inputHandler.getStringInput("Insira o cargo do Funcionário: ");
            let cpf: string = await this.inputHandler.getStringInput("Insira o CPF do Funcionário: ");
            let phone: string = await this.inputHandler.getStringInput("Insira o telefone do Funcionário: ");
            let salary: number = await this.inputHandler.getNumberInput("Insira o salário do Funcionário: ");

            let newEmployee = new Funcionario(roleName, cpf, employeeName, phone, salary);

            console.log(">>> Funcionário criado com sucesso");
            
            resolve(newEmployee);
        });
    }
}

export default FactoryRepository;