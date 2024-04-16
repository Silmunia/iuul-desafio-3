
import Cargo from "../../objects/classes/Cargo";
import Cliente from "../../objects/classes/Cliente";
import Conta from "../../objects/abstract classes/Conta";
import ContaCorrente from "../../objects/classes/ContaCorrente";
import ContaPoupanca from "../../objects/classes/ContaPoupanca";
import Endereco from "../../objects/classes/Endereco";
import Funcionario from "../../objects/classes/Funcionario";

class FactoryRepository {

    public createEmployee(
        initialRole: Cargo, 
        cpf: string, 
        employeeName: string, 
        phone: string, 
        salary: number, 
        additionalRoles: Array<Cargo>
    ): Funcionario {
        let newEmployee = new Funcionario(initialRole, cpf, employeeName, phone, salary, additionalRoles);

        return newEmployee;
    }

    public createRole(roleName: string): Cargo {
        let newRole: Cargo = new Cargo(roleName);

        return newRole;
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
    ): Cliente {
        return new Cliente(cpf, clientName, phone, isVIP, initialAddress, initialAccount, additionalAccounts, additionalAddresses);
    }

    public createAddress(
        zipCode: string, 
        street: string, 
        number: string, 
        extraInfo: string, 
        city: string, 
        state: string
    ): Endereco {
        let newAddress = new Endereco(zipCode, street, number, extraInfo, city, state);

        return newAddress;
    }

    public createCheckingAccount(number: string, limit: number): ContaCorrente {
        return new ContaCorrente(number, limit);
    }

    public createSavingsAccount(number: string): ContaPoupanca {
        return new ContaPoupanca(number);
    }
}

export default FactoryRepository;