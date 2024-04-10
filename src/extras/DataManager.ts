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