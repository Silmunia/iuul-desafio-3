"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DataRepository {
    constructor() {
        this.employees = [];
        this.clients = [];
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    addClient(client) {
        this.clients.push(client);
    }
    listEmployees() {
        return this.listData(this.employees, ">>> Sem Funcionários para listar");
    }
    listClients() {
        return this.listData(this.clients, ">>> Sem Clientes para listar");
    }
    getEmployee(index) {
        if (index >= 0 && index < this.employees.length) {
            return this.employees[index];
        }
        else {
            throw new Error(">>> Não há Funcionário com o índice selecionado");
        }
    }
    getClient(index) {
        if (index >= 0 && index < this.clients.length) {
            return this.clients[index];
        }
        else {
            throw new Error(">>> Não há Cliente com o índice selecionado");
        }
    }
    getAllEmployees() {
        return this.employees;
    }
    getAllClients() {
        return this.clients;
    }
    listData(dataArray, nullMessage) {
        if (dataArray.length === 0) {
            return nullMessage;
        }
        let resultList = "";
        for (let i = 0; i < dataArray.length; i++) {
            let current = dataArray[i];
            resultList += `${i + 1}. ${current.nome}, CPF ${current.cpf}\n`;
        }
        return resultList;
    }
}
exports.default = DataRepository;
