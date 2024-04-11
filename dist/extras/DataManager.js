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
const Funcionario_1 = __importDefault(require("../objects/classes/Funcionario"));
const Cliente_1 = __importDefault(require("../objects/classes/Cliente"));
const DataRepository_1 = __importDefault(require("./DataRepository"));
const FactoryRepository_1 = __importDefault(require("./FactoryRepository"));
class DataManager {
    constructor() {
        this.factoryRepository = new FactoryRepository_1.default();
        this.dataRepository = new DataRepository_1.default();
    }
    getTargetAccountForTransfer(accountNumber) {
        let allClients = this.dataRepository.getAllClients();
        for (let i = 0; i < allClients.length; i++) {
            let currentAccounts = allClients[i].contas;
            for (let j = 0; j < currentAccounts.length; j++) {
                if (accountNumber === currentAccounts[j].numero) {
                    return currentAccounts[j];
                }
            }
        }
        return undefined;
    }
    getEditedClientAccount(accountNumber) {
        if (this.editedClient instanceof Cliente_1.default) {
            for (let i = 0; i < this.editedClient.contas.length; i++) {
                if (this.editedClient.contas[i].numero === accountNumber) {
                    return this.editedClient.contas[i];
                }
            }
            return undefined;
        }
        else {
            return undefined;
        }
    }
    addEmployee() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(">>> Iniciando criação de Funcionário");
            this.dataRepository.addEmployee(yield this.factoryRepository.startEmployeeCreation());
        });
    }
    getEmployees() {
        return this.dataRepository.getAllEmployees();
    }
    getClients() {
        return this.dataRepository.getAllClients();
    }
    listEmployees() {
        console.log(">>> Listando Funcionários");
        console.log(this.dataRepository.listEmployees());
    }
    setEditedEmployee(index) {
        this.editedEmployee = this.dataRepository.getEmployee(index);
    }
    getEditedEmployee() {
        return this.editedEmployee;
    }
    setEditedClient(index) {
        this.editedClient = this.dataRepository.getClient(index);
    }
    getEditedClient() {
        return this.editedClient;
    }
    listEditedEmployeeInfo() {
        if (this.editedEmployee instanceof Funcionario_1.default) {
            return `\n>>> Listando informações do Funcionário\nNome: ${this.editedEmployee.nome}\nCPF: ${this.editedEmployee.cpf}\nCargos: ${this.listEditedEmployeeRoles(this.editedEmployee)}\nTelefone: ${this.editedEmployee.telefone}\nSalário: ${this.editedEmployee.salario}`;
        }
        else {
            return ">>> Não foi possível encontrar o Funcionário";
        }
    }
    listEditedClientInfo() {
        if (this.editedClient instanceof Cliente_1.default) {
            return `\n>>> Listando informações do Cliente\nNome: ${this.editedClient.nome}\nCPF: ${this.editedClient.cpf}\nTelefone: ${this.editedClient.telefone}\nVIP: ${this.editedClient.vip ? "Sim" : "Não"}\nContas: ${this.listEditedClientAccounts()}\nEndereços: ${this.listEditedClientAddresses()}`;
        }
        else {
            return ">>> Não foi possível encontrar o Cliente";
        }
    }
    listEditedClientAccounts() {
        if (this.editedClient instanceof Cliente_1.default) {
            let accountString = "";
            for (let i = 0; i < this.editedClient.contas.length; i++) {
                accountString += `\n${i + 1}. Conta número ${this.editedClient.contas[i].numero}`;
            }
            return accountString;
        }
        else {
            return ">>> Não foi possível encontrar o Cliente";
        }
    }
    listEditedClientAddresses() {
        if (this.editedClient instanceof Cliente_1.default) {
            let addressString = "";
            for (let i = 0; i < this.editedClient.enderecos.length; i++) {
                let currentAddress = this.editedClient.enderecos[i];
                addressString += `\n${i + 1}. UF ${currentAddress.uf}, Cidade ${currentAddress.cidade}, ${currentAddress.logradouro}, número ${currentAddress.numero}, ${currentAddress.complemento}, CEP ${currentAddress.cep}`;
            }
            return addressString;
        }
        else {
            return ">>> Não foi possível encontrar o Cliente";
        }
    }
    addAddressToEditedClient() {
        return __awaiter(this, void 0, void 0, function* () {
            let newAddress = yield this.factoryRepository.startAddressCreation();
            if (this.editedClient instanceof Cliente_1.default) {
                this.editedClient.enderecos.push(newAddress);
                return true;
            }
            else {
                return false;
            }
        });
    }
    listEditedEmployeeRoles(employee) {
        let resultString = "";
        for (let i = 0; i < employee.cargos.length; i++) {
            resultString += employee.cargos[i].nome;
            if (i != employee.cargos.length - 1) {
                resultString += ", ";
            }
        }
        return resultString;
    }
    removeEditedEmployeeRole(roleName) {
        if (this.editedEmployee instanceof Funcionario_1.default) {
            for (let i = 0; i < this.editedEmployee.cargos.length; i++) {
                if (this.editedEmployee.cargos[i].nome === roleName) {
                    this.editedEmployee.cargos.splice(i, 1);
                    return true;
                }
            }
            return false;
        }
        else {
            return false;
        }
    }
    removeEditedClientAddress(index) {
        if (this.editedClient instanceof Cliente_1.default) {
            if (this.editedClient.enderecos.length > 1 && index >= 0 && index < this.editedClient.enderecos.length) {
                this.editedClient.enderecos.splice(index, 1);
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    addClient() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(">>> Iniciando criação de Cliente");
            this.dataRepository.addClient(yield this.factoryRepository.startClientCreation());
        });
    }
    listClients() {
        console.log(">>> Listando Clientes");
        console.log(this.dataRepository.listClients());
    }
}
exports.default = DataManager;
