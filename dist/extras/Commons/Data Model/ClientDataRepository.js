"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClientDataModel {
    constructor() {
        this.clients = [];
    }
    addClient(client) {
        this.clients.push(client);
    }
    listClients() {
        try {
            return this.listData(this.clients, "Sem Clientes para listar");
        }
        catch (error) {
            throw error;
        }
    }
    getClient(index) {
        if (index >= 0 && index < this.clients.length) {
            return this.clients[index];
        }
        else {
            throw new Error("Não há Cliente com o índice selecionado");
        }
    }
    getAllClients() {
        return this.clients;
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
exports.default = ClientDataModel;
