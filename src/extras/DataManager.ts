import Funcionario from "../objects/classes/Funcionario";
import Cliente from "../objects/classes/Cliente";
import DataRepository from "./DataRepository";
import FactoryRepository from "./FactoryRepository";
import Conta from "../objects/abstract classes/Conta";

class DataManager {
    private factoryRepository = new FactoryRepository();
    private dataRepository = new DataRepository();

    private editedEmployee: Funcionario | undefined;
    private editedClient: Cliente | undefined;

    public getTargetAccountForTransfer(accountNumber: string): Conta | undefined {
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

    public getEditedClientAccount(accountNumber: string): Conta | undefined {
        if (this.editedClient instanceof Cliente) {
            for (let i = 0; i < this.editedClient.contas.length; i++) {
                if (this.editedClient.contas[i].numero === accountNumber) {
                    return this.editedClient.contas[i];
                }
            }

            return undefined;
        } else {
            return undefined;
        }
    }

    public async addEmployee() {
        console.log(">>> Iniciando criação de Funcionário");
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

    public listEmployees() {
        console.log(">>> Listando Funcionários");
        console.log(this.dataRepository.listEmployees());
    }

    public setEditedEmployee(index: number) {
        this.editedEmployee = this.dataRepository.getEmployee(index);
    }

    public getEditedEmployee(): Funcionario | undefined {
        return this.editedEmployee;
    }

    public setEditedClient(index: number) {
        this.editedClient = this.dataRepository.getClient(index);
    }

    public getEditedClient(): Cliente | undefined {
        return this.editedClient;
    }

    public listEditedEmployeeInfo(): string {
        if (this.editedEmployee instanceof Funcionario) {
            return `\n>>> Listando informações do Funcionário\nNome: ${this.editedEmployee.nome}\nCPF: ${this.editedEmployee.cpf}\nCargos: ${this.listEditedEmployeeRoles(this.editedEmployee)}\nTelefone: ${this.editedEmployee.telefone}\nSalário: ${this.editedEmployee.salario}`;
        } else {
            return ">>> Não foi possível encontrar o Funcionário";
        }
    }

    public listEditedClientInfo(): string {
        if (this.editedClient instanceof Cliente) {
            return `\n>>> Listando informações do Cliente\nNome: ${this.editedClient.nome}\nCPF: ${this.editedClient.cpf}\nTelefone: ${this.editedClient.telefone}\nVIP: ${this.editedClient.vip ? "Sim" : "Não"}\nContas: ${this.listEditedClientAccounts()}\nEndereços: ${this.listEditedClientAddresses()}`;
        } else {
            return ">>> Não foi possível encontrar o Cliente";
        }
    }

    public listEditedClientAccounts(): string {
        if (this.editedClient instanceof Cliente) {

            let accountString = "";

            for (let i = 0; i < this.editedClient.contas.length; i++) {
                accountString += `\n${i+1}. Conta número ${this.editedClient.contas[i].numero}`; 
            }

            return accountString;
        } else {
            return ">>> Não foi possível encontrar o Cliente";
        }
    }

    public listEditedClientAddresses(): string {
        if (this.editedClient instanceof Cliente) {

            let addressString = "";

            for (let i = 0; i < this.editedClient.enderecos.length; i++) {

                let currentAddress = this.editedClient.enderecos[i];

                addressString += `\n${i+1}. UF ${currentAddress.uf}, Cidade ${currentAddress.cidade}, ${currentAddress.logradouro}, número ${currentAddress.numero}, ${currentAddress.complemento}, CEP ${currentAddress.cep}`; 
            }

            return addressString;
        } else {
            return ">>> Não foi possível encontrar o Cliente";
        }
    }

    public async addAddressToEditedClient(): Promise<boolean> {
        let newAddress = await this.factoryRepository.startAddressCreation();

        if (this.editedClient instanceof Cliente) {
            this.editedClient.enderecos.push(newAddress);
            return true;
        } else {
            return false;
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

    public removeEditedEmployeeRole(roleName: string): boolean {
        if (this.editedEmployee instanceof Funcionario) {
            for (let i = 0; i < this.editedEmployee.cargos.length; i++) {
                if (this.editedEmployee.cargos[i].nome === roleName) {
                    this.editedEmployee.cargos.splice(i, 1);
                    return true;
                }
            }

            return false;
        } else {
            return false;
        }
    }

    public removeEditedClientAddress(index: number): boolean {
        if (this.editedClient instanceof Cliente) {
            if (this.editedClient.enderecos.length > 1 && index >= 0 && index < this.editedClient.enderecos.length) {
                this.editedClient.enderecos.splice(index, 1);
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public async addClient() {
        console.log(">>> Iniciando criação de Cliente");
        this.dataRepository.addClient(
            await this.factoryRepository.startClientCreation()
        );
    }

    public listClients() {
        console.log(">>> Listando Clientes");
        console.log(this.dataRepository.listClients());
    }
}

export default DataManager;