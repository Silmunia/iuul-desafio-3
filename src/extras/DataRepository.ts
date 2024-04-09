import Funcionario from "../objects/classes/Funcionario";

class DataRepository {
    private employees: Array<Funcionario> = [];

    addEmployee(employee: Funcionario) {
        this.employees.push(employee);
    }

    getEmployees(): Array<Funcionario> {
        return [...this.employees];
    }

    clearEmployees() {
        this.employees = [];
    }
}

export default DataRepository;