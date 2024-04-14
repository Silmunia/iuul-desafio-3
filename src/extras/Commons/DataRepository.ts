
import Cargo from "../../objects/classes/Cargo";
import Cliente from "../../objects/classes/Cliente";
import Funcionario from "../../objects/classes/Funcionario";

class DataRepository {
    private employees: Array<Funcionario> = [];
    private clients: Array<Cliente> = [];
    private roles: Array<Cargo> = [];

    public addEmployee(employee: Funcionario) {
        this.employees.push(employee);
    }

    public addClient(client: Cliente) {
        this.clients.push(client);
    }

    public addRole(newRole: Cargo) {
        this.roles.push(newRole);
    }

    public listEmployees(): string {
        return this.listData(this.employees, ">>> Sem Funcionários para listar");
    }

    public listClients(): string {
        return this.listData(this.clients, ">>> Sem Clientes para listar");
    }

    public getEmployee(index: number) {
        if (index >= 0 && index < this.employees.length) {
            return this.employees[index];
        } else {
            throw new Error("Não há Funcionário com o índice selecionado");
        }
    }

    public getClient(index: number) {
        if (index >= 0 && index < this.clients.length) {
            return this.clients[index];
        } else {
            throw new Error("Não há Cliente com o índice selecionado");
        }
    }

    public getRole(name: string) {
        for (let i = 0; i < this.roles.length; i++) {
            if (this.roles[i].nome === name) {
                return this.roles[i];
            }
        }

        throw new Error("Não há Cargo com o nome selecionado");
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

            resultList += `${i+1}. ${current.nome}, CPF ${current.cpf}`;

            if (i < dataArray.length-1) {
                resultList += "\n";
            }
        }

        return resultList;
    }
}

export default DataRepository;