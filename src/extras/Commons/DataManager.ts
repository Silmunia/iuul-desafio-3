
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

    public addEmployee(
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

    public addRoleToEditedEmployee(roleName: string) {
        if (this.editedEmployee instanceof Funcionario) {
            for (let i = 0; i < this.editedEmployee.cargos.length; i++) {
                if (roleName === this.editedEmployee.cargos[i].nome) {
                    throw new Error("Funcionário já contém o Cargo");
                }
            }

            let addingRole = this.getRole(roleName);

            this.editedEmployee.adicionarCargo(addingRole);
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
        return this.dataRepository.listEmployees();
    }

    public setEditedEmployee(index: number) {
        try {
            this.editedEmployee = this.dataRepository.getEmployee(index);
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

    public listEditedEmployeeInfo(): string {
        if (this.editedEmployee instanceof Funcionario) {
            return `Nome: ${this.editedEmployee.nome}\nCPF: ${this.editedEmployee.cpf}\nCargos: ${this.listEditedEmployeeRoles(this.editedEmployee)}\nTelefone: ${this.editedEmployee.telefone}\nSalário: ${this.editedEmployee.salario}`;
        } else {
            throw new Error("Não foi possível encontrar o Funcionário");
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

    public async addAddressToEditedClient(newAddress: Endereco) {
        if (this.editedClient instanceof Cliente) {
            this.editedClient.adicionarEnderecos([newAddress]);
        } else {
            throw new Error("Não foi possível adicionar o Endereço ao Cliente selecionado");
        }
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
        return this.dataRepository.listClients();
    }
}

export default DataManager;