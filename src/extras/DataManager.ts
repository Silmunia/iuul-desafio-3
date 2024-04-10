import Funcionario from "../objects/classes/Funcionario";
import DataRepository from "./DataRepository";
import FactoryRepository from "./FactoryRepository";

class DataManager {
    private factoryRepository = new FactoryRepository();
    private dataRepository = new DataRepository();

    private editedEmployee: Funcionario | undefined;

    public async addEmployee() {
        console.log(">>> Iniciando criação de Funcionário");
        this.dataRepository.addEmployee(
            await this.factoryRepository.startEmployeeCreation()
        );
    }

    public getEmployees(): Array<Funcionario> {
        return this.dataRepository.getAllEmployees();
    }

    public listEmployees() {
        console.log(">>> Listando Funcionários");
        console.log(this.dataRepository.listEmployees());
    }

    public setEditedEmployee(index: number) {
        this.editedEmployee = this.dataRepository.getEmployee(index);
    }

    public getEditedEmployee(): Funcionario | undefined {
        return this.editedEmployee;
    }

    public listEditedEmployeeInfo(): string {
        if (this.editedEmployee instanceof Funcionario) {
            return `\n>>> Listando informações do Funcionário\nNome: ${this.editedEmployee.nome}\nCPF: ${this.editedEmployee.cpf}\nCargos: ${this.listEditedEmployeeRoles(this.editedEmployee)}\nTelefone: ${this.editedEmployee.telefone}\nSalário: ${this.editedEmployee.salario}`;
        } else {
            return ">>> Não foi possível encontrar o Funcionário";
        }
    }

    public listEditedEmployeeRoles(employee: Funcionario | undefined): string {
        let resultString = "";

        if (employee instanceof Funcionario) {
            for (let i = 0; i < employee.cargos.length; i++) {
                resultString += employee.cargos[i].nome;
    
                if (i != employee.cargos.length-1) {
                    resultString += ", ";
                }
            }
        }

        return resultString;
    }

    public removeEditedEmployeeRole(roleName: string): boolean {
        if (this.editedEmployee instanceof Funcionario) {
            for (let i = 0; i < this.editedEmployee.cargos.length; i++) {
                if (this.editedEmployee.cargos[i].nome === roleName) {
                    this.editedEmployee.cargos.splice(i, 1);
                    return true;
                }
            }

            return false;
        } else {
            return false;
        }
    }

    public async addClient() {
        console.log(">>> Iniciando criação de Cliente");
        this.dataRepository.addClient(
            await this.factoryRepository.startClientCreation()
        );
    }

    public listClients() {
        console.log(">>> Listando Clientes");
        console.log(this.dataRepository.listClients());
    }
}

export default DataManager;