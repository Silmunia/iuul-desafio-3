
import Cargo from "../../objects/classes/Cargo";
import Cliente from "../../objects/classes/Cliente";
import Conta from "../../objects/abstract classes/Conta";
import Endereco from "../../objects/classes/Endereco";
import Funcionario from "../../objects/classes/Funcionario";
import DataRepository from "./DataRepository";
import FactoryRepository from "./FactoryRepository";

class DataManager {
    private factoryRepository = new FactoryRepository();
    private dataRepository = new DataRepository();

    private editedEmployee: Funcionario | undefined;
    private editedClient: Cliente | undefined;

    public getTargetAccountForTransfer(accountNumber: string): Conta {
        let allClients = this.dataRepository.getAllClients();

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

    public getEditedClientAccount(accountNumber: string): Conta {
        if (this.editedClient instanceof Cliente) {
            for (let i = 0; i < this.editedClient.contas.length; i++) {
                if (this.editedClient.contas[i].numero === accountNumber) {
                    return this.editedClient.contas[i];
                }
            }

            throw new Error("Não há conta com o número inserido");
        } else {
            throw new Error("Não foi possível encontrar as contas do Cliente");
        }
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

        this.dataRepository.addEmployee(newEmployee);
    }

    public getRole(roleName: string): Cargo {
        try {
            let foundRole = this.dataRepository.getRole(roleName);

            return foundRole;
        } catch {
            let newRole = this.factoryRepository.createRole(roleName);
            this.dataRepository.addRole(newRole);

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

    public addRoleToEditedEmployee(roleName: string) {
        if (this.editedEmployee instanceof Funcionario) {
            
        } else {
            throw new Error("Não foi possível encontrar o Funcionário");
        }
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

        this.dataRepository.addClient(newClient);
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

    public getEmployees(): Array<Funcionario> {
        return this.dataRepository.getAllEmployees();
    }

    public getClients(): Array<Cliente> {
        return this.dataRepository.getAllClients();
    }

    public listEmployees(): string {
        try {
            return this.dataRepository.listEmployees();
        } catch (error) {
            throw error;
        }
    }

    public setEditedEmployee(index: number) {
        try {
            this.editedEmployee = this.dataRepository.getEmployee(index);
        } catch (error) {
            throw error;
        }
    }

    public getEmployeeFromRepository(index: number): Funcionario {
        try {
            return this.dataRepository.getEmployee(index);
        } catch (error) {
            throw error;
        }
    }

    public getClientFromRepository(index: number): Cliente {
        try {
            return this.dataRepository.getClient(index);
        } catch (error) {
            throw error;
        }
    }

    public getEditedEmployee(): Funcionario | undefined {
        return this.editedEmployee;
    }

    public setEditedClient(index: number) {
        try {
            this.editedClient = this.dataRepository.getClient(index);
        } catch (error) {
            throw error;
        }
    }

    public getEditedClient(): Cliente | undefined {
        return this.editedClient;
    }

    public listEmployeeInfo(employee: Funcionario): string {
        return `Nome: ${employee.nome}\nCPF: ${employee.cpf}\nCargos: ${this.listEditedEmployeeRoles(employee)}\nTelefone: ${employee.telefone}\nSalário: ${employee.salario}`;
    }

    public listEditedEmployeeInfo(): string {
        if (this.editedEmployee instanceof Funcionario) {
            return `Nome: ${this.editedEmployee.nome}\nCPF: ${this.editedEmployee.cpf}\nCargos: ${this.listEditedEmployeeRoles(this.editedEmployee)}\nTelefone: ${this.editedEmployee.telefone}\nSalário: ${this.editedEmployee.salario}`;
        } else {
            throw new Error("Não foi possível encontrar o Funcionário");
        }
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

    public listEditedClientInfo(): string {
        if (this.editedClient instanceof Cliente) {
            try {
                let clientAccounts = this.listEditedClientAccounts();
                let clientAddresses = this.listEditedClientAddresses();

                return `Nome: ${this.editedClient.nome}\nCPF: ${this.editedClient.cpf}\nTelefone: ${this.editedClient.telefone}\nVIP: ${this.editedClient.vip ? "Sim" : "Não"}\nContas:\n${clientAccounts}\nEndereços:\n${clientAddresses}`;
            } catch (error) {
                throw error;
            }
        } else {
            throw new Error("Não foi possível encontrar o Cliente");
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

    public listEditedClientAccounts(): string {
        if (this.editedClient instanceof Cliente) {

            let accountString = "";

            for (let i = 0; i < this.editedClient.contas.length; i++) {
                accountString += `${i+1}. Conta número ${this.editedClient.contas[i].numero}`; 

                if (i < this.editedClient.contas.length-1) {
                    accountString += "\n";
                }
            }

            return accountString;
        } else {
            throw new Error("Não foi possível encontrar o Cliente");
        }
    }

    public listEditedClientAddresses(): string {
        if (this.editedClient instanceof Cliente) {

            let addressString = "";

            for (let i = 0; i < this.editedClient.enderecos.length; i++) {

                let currentAddress = this.editedClient.enderecos[i];

                addressString += `${i+1}. UF ${currentAddress.uf}, Cidade ${currentAddress.cidade}, ${currentAddress.logradouro}, número ${currentAddress.numero}, ${currentAddress.complemento}, CEP ${currentAddress.cep}`; 

                if (i < this.editedClient.enderecos.length-1) {
                    addressString += "\n";
                }
            }

            return addressString;
        } else {
            throw new Error("Não foi possível encontrar o Cliente");
        }
    }

    public addAddressToClient(client: Cliente, newAddress: Endereco) {
        client.adicionarEnderecos([newAddress]);
    }

    public async addAddressToEditedClient(newAddress: Endereco) {
        if (this.editedClient instanceof Cliente) {
            this.editedClient.adicionarEnderecos([newAddress]);
        } else {
            throw new Error("Não foi possível adicionar o Endereço ao Cliente selecionado");
        }
    }

    public async addAccountToClient(client: Cliente, newAccount: Conta) {
        client.adicionarContas([newAccount]);
    }

    public async addAccountToEditedClient(newAccount: Conta) {
        if (this.editedClient instanceof Cliente) {
            this.editedClient.adicionarContas([newAccount]);
        } else {
            throw new Error("Não foi possível adicionar a Conta ao Cliente selecionado");
        }
    }

    public listEditedEmployeeRoles(employee: Funcionario): string {
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

    public removeEditedEmployeeRole(roleName: string) {
        if (this.editedEmployee instanceof Funcionario) {
            try {
                this.editedEmployee.removerCargo(roleName);
            } catch (error) {
                throw error;
            }
        } else {
            throw new Error("Não foi possível encontrar o Funcionário");
        }
    }

    public removeClientAddress(client: Cliente, index: number) {
        try {
            client.removerEndereco(index);
        } catch (error) {
            throw error;
        }
    }

    public removeEditedClientAddress(index: number) {
        if (this.editedClient instanceof Cliente) {
            try {
                this.editedClient.removerEndereco(index);
            } catch (error) {
                throw error;
            }
        } else {
            throw new Error("Não foi possível encontrar o Cliente");
        }
    }

    public async removeClientAccount(client: Cliente, index: number) {
        try {
            client.removerConta(index);
        } catch (error) {
            throw error;
        }
    }

    public removeEditedClientAccount(index: number) {
        if (this.editedClient instanceof Cliente) {
            try {
                this.editedClient.removerConta(index);
            } catch (error) {
                throw error;
            }
        } else {
            throw new Error("Não foi possível encontrar o Cliente");
        }
    }

    public listClients(): string {
        try {
            return this.dataRepository.listClients();
        } catch (error) {
            throw error;
        }
    }
}

export default DataManager;