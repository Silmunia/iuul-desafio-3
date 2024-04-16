
import Cargo from "../../objects/classes/Cargo";
import Cliente from "../../objects/classes/Cliente";
import Conta from "../../objects/abstract classes/Conta";
import Endereco from "../../objects/classes/Endereco";
import Funcionario from "../../objects/classes/Funcionario";
import FactoryRepository from "./FactoryRepository";
import ClientDataModel from "./Data Model/ClientDataRepository";
import EmployeeDataModel from "./Data Model/EmployeeDataRepository";

class DataManager {
    private factoryRepository = new FactoryRepository();
    private clientRepository = new ClientDataModel();
    private employeeRepository = new EmployeeDataModel();

    public getTargetAccountForTransfer(accountNumber: string): Conta {
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

    public getClientAccount(client: Cliente, accountNumber: string): Conta {
        for (let i = 0; i < client.contas.length; i++) {
            if (client.contas[i].numero === accountNumber) {
                return client.contas[i];
            }
        }

        throw new Error("O Cliente não possui Conta com o número inserido");
    }

    public createEmployee(
        initialRoleName: string, 
        cpf: string, 
        employeeName: string, 
        phone: string, 
        salary: number, 
        additionalRoleNames: Array<string>
    ) {

        let initialRole = this.getRole(initialRoleName);

        let additionalRoles: Array<Cargo> = [];
        for (let i = 0; i < additionalRoleNames.length; i++) {
            let extraRole = this.getRole(additionalRoleNames[i]);

            additionalRoles.push(extraRole);
        }

        let newEmployee = this.factoryRepository.createEmployee(initialRole, cpf, employeeName, phone, salary, additionalRoles);

        this.employeeRepository.addEmployee(newEmployee);
    }

    public getRole(roleName: string): Cargo {
        try {
            let foundRole = this.employeeRepository.getRole(roleName);

            return foundRole;
        } catch {
            let newRole = this.factoryRepository.createRole(roleName);
            this.employeeRepository.addRole(newRole);

            return newRole;
        }
    }

    public addRoleToEmployee(employee: Funcionario, roleName: string) {
        for (let i = 0; i < employee.cargos.length; i++) {
            if (roleName === employee.cargos[i].nome) {
                throw new Error("Funcionário já contém o Cargo");
            }
        }

        let addingRole = this.getRole(roleName);

        employee.adicionarCargo(addingRole);
    }

    public createClient(
        cpf: string, 
        clientName: string, 
        phone: string, 
        isVIP: boolean, 
        initialAddress: Endereco, 
        initialAccount: Conta, 
        additionalAccounts: Array<Conta>, 
        additionalAddresses: Array<Endereco>
    ) {

        let newClient = this.factoryRepository.createClient(cpf, clientName, phone, isVIP, initialAddress, initialAccount, additionalAccounts, additionalAddresses);

        this.clientRepository.addClient(newClient);
    }

    public createAddress(
        zipCode: string, 
        street: string, 
        number: string, 
        extraInfo: string, 
        city: string, 
        state: string
    ): Endereco {
        return this.factoryRepository.createAddress(zipCode, street, number, extraInfo, city, state);
    }

    public createCheckingAccount(number: string, limit: number) {
        return this.factoryRepository.createCheckingAccount(number, limit);
    }

    public createSavingsAccount(number: string) {
        return this.factoryRepository.createSavingsAccount(number);
    }

    public listEmployees(): string {
        try {
            return this.employeeRepository.listEmployees();
        } catch (error) {
            throw error;
        }
    }

    public getEmployeeFromRepository(index: number): Funcionario {
        try {
            return this.employeeRepository.getEmployee(index);
        } catch (error) {
            throw error;
        }
    }

    public getClientFromRepository(index: number): Cliente {
        try {
            return this.clientRepository.getClient(index);
        } catch (error) {
            throw error;
        }
    }

    public listEmployeeInfo(employee: Funcionario): string {
        return `Nome: ${employee.nome}\nCPF: ${employee.cpf}\nCargos: ${this.listEmployeeRoles(employee)}\nTelefone: ${employee.telefone}\nSalário: ${employee.salario}`;
    }

    public listClientInfo(client: Cliente): string {
        try {
            let clientAccounts = this.listClientAccounts(client);
            let clientAddresses = this.listClientAddresses(client);

            return `Nome: ${client.nome}\nCPF: ${client.cpf}\nTelefone: ${client.telefone}\nVIP: ${client.vip ? "Sim" : "Não"}\nContas:\n${clientAccounts}\nEndereços:\n${clientAddresses}`;
        } catch (error) {
            throw error;
        }
    }

    public listClientAccounts(client: Cliente): string {
        let accountString = "";

        for (let i = 0; i < client.contas.length; i++) {
            accountString += `${i+1}. Conta número ${client.contas[i].numero}`; 

            if (i < client.contas.length-1) {
                accountString += "\n";
            }
        }

        if (accountString === "") {
            throw new Error("ERRO FATAL: o Cliente não possui nenhuma Conta associada");
        } else {
            return accountString;
        }
    }

    public listClientAddresses(cliente: Cliente): string {
        let addressString = "";

        for (let i = 0; i < cliente.enderecos.length; i++) {

            let currentAddress = cliente.enderecos[i];

            addressString += `${i+1}. UF ${currentAddress.uf}, Cidade ${currentAddress.cidade}, ${currentAddress.logradouro}, número ${currentAddress.numero}, ${currentAddress.complemento}, CEP ${currentAddress.cep}`; 

            if (i < cliente.enderecos.length-1) {
                addressString += "\n";
            }
        }

        if (addressString === "") {
            throw new Error("ERRO FATAL: o Cliente não possui nenhum Endereço associado");
        } else {
            return addressString;
        }
    }

    public addAddressToClient(client: Cliente, newAddress: Endereco) {
        client.adicionarEnderecos([newAddress]);
    }

    public async addAccountToClient(client: Cliente, newAccount: Conta) {
        client.adicionarContas([newAccount]);
    }

    public listEmployeeRoles(employee: Funcionario): string {
        let resultString = "";

        for (let i = 0; i < employee.cargos.length; i++) {
            resultString += employee.cargos[i].nome;

            if (i != employee.cargos.length-1) {
                resultString += ", ";
            }
        }

        return resultString;
    }

    public removeEmployeeRole(employee: Funcionario, roleName: string) {
        try {
            employee.removerCargo(roleName);
        } catch (error) {
            throw error;
        }
    }

    public removeClientAddress(client: Cliente, index: number) {
        try {
            client.removerEndereco(index);
        } catch (error) {
            throw error;
        }
    }

    public async removeClientAccount(client: Cliente, index: number) {
        try {
            client.removerConta(index);
        } catch (error) {
            throw error;
        }
    }

    public listClients(): string {
        try {
            return this.clientRepository.listClients();
        } catch (error) {
            throw error;
        }
    }
}

export default DataManager;