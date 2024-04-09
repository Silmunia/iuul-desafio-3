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

    private listData(dataArray: Array<Funcionario | Cliente>, nullMessage: string): string {
        if (dataArray.length === 0) {
            return nullMessage;
        }

        let resultList: string = "";

        for (let i = 0; i < dataArray.length; i++) {
            let current = dataArray[i];

            resultList += `${i+1}. ${current.nome}, CPF ${current.cpf}`;
        }

        return resultList;
    }
}

export default DataRepository;