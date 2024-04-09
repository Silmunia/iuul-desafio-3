import Funcionario from "../objects/classes/Funcionario";

class DataRepository {
    private employees: Array<Funcionario> = [];

    addEmployee(employee: Funcionario) {
        this.employees.push(employee);
    }

    listEmployees(): string {

        if (this.employees.length === 0) {
            return ">>> Sem funcionários para listar";
        }

        let resultList: string = "";

        for (let i = 0; i < this.employees.length; i++) {

            let current = this.employees[i];

            resultList += `${i+1}. ${current.nome}, CPF ${current.cpf}`;
        }

        return resultList;
    }
}

export default DataRepository;