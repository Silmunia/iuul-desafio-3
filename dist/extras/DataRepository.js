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
        return this.listData(this.employees, ">>> Sem funcionários para listar");
    }
    listClients() {
        return this.listData(this.clients, ">>> Sem clientes para listar");
    }
    listData(dataArray, nullMessage) {
        if (dataArray.length === 0) {
            return nullMessage;
        }
        let resultList = "";
        for (let i = 0; i < dataArray.length; i++) {
            let current = dataArray[i];
            resultList += `${i + 1}. ${current.nome}, CPF ${current.cpf}`;
        }
        return resultList;
    }
}
exports.default = DataRepository;
