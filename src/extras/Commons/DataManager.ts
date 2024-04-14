import Funcionario from "../../objects/classes/Funcionario";
import Cliente from "../../objects/classes/Cliente";
import DataRepository from "./DataRepository";
import FactoryRepository from "./FactoryRepository";
import Conta from "../../objects/abstract classes/Conta";

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

        throw new Error("Não há conta com o número inserido");
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
            throw new Error("Não há conta com o número inserido");
        }
    }

    public async addEmployee() {
        this.dataRepository.addEmployee(
            await this.factoryRepository.startEmployeeCreation()
        );
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

    public async addAddressToEditedClient() {
        let newAddress = await this.factoryRepository.startAddressCreation("\n>>> Criando novo Endereço");

        if (this.editedClient instanceof Cliente) {
            this.editedClient.adicionarEnderecos([newAddress]);
        } else {
            throw new Error("Não foi possível adicionar o Endereço ao Cliente selecionado");
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

    public async addClient() {
        this.dataRepository.addClient(
            await this.factoryRepository.startClientCreation()
        );
    }

    public listClients(): string {
        return this.dataRepository.listClients();
    }
}

export default DataManager;