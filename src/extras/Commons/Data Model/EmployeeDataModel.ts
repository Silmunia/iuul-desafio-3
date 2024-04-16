
import Cargo from "../../../objects/classes/Cargo";
import Funcionario from "../../../objects/classes/Funcionario";

class EmployeeDataModel {
    private employees: Array<Funcionario> = [];
    private roles: Array<Cargo> = [];

    public addEmployee(employee: Funcionario) {
        this.employees.push(employee);
    }

    public listEmployees(): string {
        try {
            return this.listData(this.employees, "Sem Funcionários para listar");
        } catch (error) {
            throw error;
        }
    }

    public getEmployee(index: number) {
        if (index >= 0 && index < this.employees.length) {
            return this.employees[index];
        } else {
            throw new Error("Não há Funcionário com o índice selecionado");
        }
    }

    public addRole(newRole: Cargo) {
        this.roles.push(newRole);
    }

    public getRole(name: string) {
        for (let i = 0; i < this.roles.length; i++) {
            if (this.roles[i].nome === name) {
                return this.roles[i];
            }
        }

        throw new Error("Não há Cargo com o nome selecionado");
    }

    private listData(dataArray: Array<Funcionario>, errorMessage: string): string {
        if (dataArray.length === 0) {
            throw new Error(errorMessage);
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

export default EmployeeDataModel;