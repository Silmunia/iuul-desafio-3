"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DataRepository {
    constructor() {
        this.employees = [];
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    listEmployees() {
        if (this.employees.length === 0) {
            return ">>> Sem funcionários para listar";
        }
        let resultList = "";
        for (let i = 0; i < this.employees.length; i++) {
            let current = this.employees[i];
            resultList += `${i + 1}. ${current.nome}, CPF ${current.cpf}`;
        }
        return resultList;
    }
}
exports.default = DataRepository;
