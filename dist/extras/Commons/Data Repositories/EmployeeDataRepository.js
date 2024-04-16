"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmployeeDataRepository {
    constructor() {
        this.employees = [];
        this.roles = [];
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    addRole(newRole) {
        this.roles.push(newRole);
    }
    listEmployees() {
        try {
            return this.listData(this.employees, "Sem Funcionários para listar");
        }
        catch (error) {
            throw error;
        }
    }
    getEmployee(index) {
        if (index >= 0 && index < this.employees.length) {
            return this.employees[index];
        }
        else {
            throw new Error("Não há Funcionário com o índice selecionado");
        }
    }
    getRole(name) {
        for (let i = 0; i < this.roles.length; i++) {
            if (this.roles[i].nome === name) {
                return this.roles[i];
            }
        }
        throw new Error("Não há Cargo com o nome selecionado");
    }
    listData(dataArray, errorMessage) {
        if (dataArray.length === 0) {
            throw new Error(errorMessage);
        }
        let resultList = "";
        for (let i = 0; i < dataArray.length; i++) {
            let current = dataArray[i];
            resultList += `${i + 1}. ${current.nome}, CPF ${current.cpf}`;
            if (i < dataArray.length - 1) {
                resultList += "\n";
            }
        }
        return resultList;
    }
}
exports.default = EmployeeDataRepository;
