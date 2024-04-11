import Funcionario from "../objects/classes/Funcionario";
import Cliente from "../objects/classes/Cliente";

class DataRepository {
    private employees: Array<Funcionario> = [];
    private clients: Array<Cliente> = [];

    public addEmployee(employee: Funcionario) {
        this.employees.push(employee);
    }

    public addClient(client: Cliente) {
        this.clients.push(client);
    }

    public listEmployees(): string {
        return this.listData(this.employees, ">>> Sem funcionários para listar");
    }

    public listClients(): string {
        return this.listData(this.clients, ">>> Sem clientes para listar");
    }

    public getEmployee(index: number) {
        if (index >= 0 && index < this.employees.length) {
            return this.employees[index];
        } else {
            return undefined;
        }
    }

    public getClient(index: number) {
        if (index >= 0 && index < this.clients.length) {
            return this.clients[index];
        } else {
            return undefined;
        }
    }

    public getAllEmployees(): Array<Funcionario> {
        return this.employees;
    }

    public getAllClients(): Array<Cliente> {
        return this.clients;
    }

    private listData(dataArray: Array<Funcionario | Cliente>, nullMessage: string): string {
        if (dataArray.length === 0) {
            return nullMessage;
        }

        let resultList: string = "";

        for (let i = 0; i < dataArray.length; i++) {
            let current = dataArray[i];

            resultList += `${i+1}. ${current.nome}, CPF ${current.cpf}\n`;
        }

        return resultList;
    }
}

export default DataRepository;