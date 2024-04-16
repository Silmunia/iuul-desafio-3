"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FactoryRepository_1 = __importDefault(require("./FactoryRepository"));
const ClientDataModel_1 = __importDefault(require("./Data Model/ClientDataModel"));
const EmployeeDataModel_1 = __importDefault(require("./Data Model/EmployeeDataModel"));
class DataManager {
    constructor() {
        this.factoryRepository = new FactoryRepository_1.default();
        this.clientRepository = new ClientDataModel_1.default();
        this.employeeRepository = new EmployeeDataModel_1.default();
    }
    getTargetAccountForTransfer(accountNumber) {
        let allClients = this.clientRepository.getAllClients();
        for (let i = 0; i < allClients.length; i++) {
            let currentAccounts = allClients[i].contas;
            for (let j = 0; j < currentAccounts.length; j++) {
                if (accountNumber === currentAccounts[j].numero) {
                    return currentAccounts[j];
                }
            }
        }
        throw new Error("Não há conta com o número inserido para a conta de destino");
    }
    getClientAccount(client, accountNumber) {
        for (let i = 0; i < client.contas.length; i++) {
            if (client.contas[i].numero === accountNumber) {
                return client.contas[i];
            }
        }
        throw new Error("O Cliente não possui Conta com o número inserido");
    }
    createEmployee(initialRoleName, cpf, employeeName, phone, salary, additionalRoleNames) {
        let initialRole = this.getRole(initialRoleName);
        let additionalRoles = [];
        for (let i = 0; i < additionalRoleNames.length; i++) {
            let extraRole = this.getRole(additionalRoleNames[i]);
            additionalRoles.push(extraRole);
        }
        let newEmployee = this.factoryRepository.createEmployee(initialRole, cpf, employeeName, phone, salary, additionalRoles);
        this.employeeRepository.addEmployee(newEmployee);
    }
    getRole(roleName) {
        try {
            let foundRole = this.employeeRepository.getRole(roleName);
            return foundRole;
        }
        catch (_a) {
            let newRole = this.factoryRepository.createRole(roleName);
            this.employeeRepository.addRole(newRole);
            return newRole;
        }
    }
    addRoleToEmployee(employee, roleName) {
        for (let i = 0; i < employee.cargos.length; i++) {
            if (roleName === employee.cargos[i].nome) {
                throw new Error("Funcionário já contém o Cargo");
            }
        }
        let addingRole = this.getRole(roleName);
        employee.adicionarCargo(addingRole);
    }
    createClient(cpf, clientName, phone, isVIP, initialAddress, initialAccount, additionalAccounts, additionalAddresses) {
        let newClient = this.factoryRepository.createClient(cpf, clientName, phone, isVIP, initialAddress, initialAccount, additionalAccounts, additionalAddresses);
        this.clientRepository.addClient(newClient);
    }
    createAddress(zipCode, street, number, extraInfo, city, state) {
        return this.factoryRepository.createAddress(zipCode, street, number, extraInfo, city, state);
    }
    createCheckingAccount(number, limit) {
        return this.factoryRepository.createCheckingAccount(number, limit);
    }
    createSavingsAccount(number) {
        return this.factoryRepository.createSavingsAccount(number);
    }
    listEmployees() {
        try {
            return this.employeeRepository.listEmployees();
        }
        catch (error) {
            throw error;
        }
    }
    getEmployeeFromRepository(index) {
        try {
            return this.employeeRepository.getEmployee(index);
        }
        catch (error) {
            throw error;
        }
    }
    getClientFromRepository(index) {
        try {
            return this.clientRepository.getClient(index);
        }
        catch (error) {
            throw error;
        }
    }
    listEmployeeInfo(employee) {
        return `Nome: ${employee.nome}\nCPF: ${employee.cpf}\nCargos: ${this.listEmployeeRoles(employee)}\nTelefone: ${employee.telefone}\nSalário: ${employee.salario}`;
    }
    listClientInfo(client) {
        try {
            let clientAccounts = this.listClientAccounts(client);
            let clientAddresses = this.listClientAddresses(client);
            return `Nome: ${client.nome}\nCPF: ${client.cpf}\nTelefone: ${client.telefone}\nVIP: ${client.vip ? "Sim" : "Não"}\nContas:\n${clientAccounts}\nEndereços:\n${clientAddresses}`;
        }
        catch (error) {
            throw error;
        }
    }
    listClientAccounts(client) {
        let accountString = "";
        for (let i = 0; i < client.contas.length; i++) {
            accountString += `${i + 1}. Conta número ${client.contas[i].numero}`;
            if (i < client.contas.length - 1) {
                accountString += "\n";
            }
        }
        if (accountString === "") {
            throw new Error("ERRO FATAL: o Cliente não possui nenhuma Conta associada");
        }
        else {
            return accountString;
        }
    }
    listClientAddresses(cliente) {
        let addressString = "";
        for (let i = 0; i < cliente.enderecos.length; i++) {
            let currentAddress = cliente.enderecos[i];
            addressString += `${i + 1}. UF ${currentAddress.uf}, Cidade ${currentAddress.cidade}, ${currentAddress.logradouro}, número ${currentAddress.numero}, ${currentAddress.complemento}, CEP ${currentAddress.cep}`;
            if (i < cliente.enderecos.length - 1) {
                addressString += "\n";
            }
        }
        if (addressString === "") {
            throw new Error("ERRO FATAL: o Cliente não possui nenhum Endereço associado");
        }
        else {
            return addressString;
        }
    }
    addAddressToClient(client, newAddress) {
        client.adicionarEnderecos([newAddress]);
    }
    addAccountToClient(client, newAccount) {
        return __awaiter(this, void 0, void 0, function* () {
            client.adicionarContas([newAccount]);
        });
    }
    listEmployeeRoles(employee) {
        let resultString = "";
        for (let i = 0; i < employee.cargos.length; i++) {
            resultString += employee.cargos[i].nome;
            if (i != employee.cargos.length - 1) {
                resultString += ", ";
            }
        }
        return resultString;
    }
    removeEmployeeRole(employee, roleName) {
        try {
            employee.removerCargo(roleName);
        }
        catch (error) {
            throw error;
        }
    }
    removeClientAddress(client, index) {
        try {
            client.removerEndereco(index);
        }
        catch (error) {
            throw error;
        }
    }
    removeClientAccount(client, index) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                client.removerConta(index);
            }
            catch (error) {
                throw error;
            }
        });
    }
    listClients() {
        try {
            return this.clientRepository.listClients();
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = DataManager;
