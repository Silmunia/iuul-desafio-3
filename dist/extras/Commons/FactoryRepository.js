"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cargo_1 = __importDefault(require("../../objects/classes/Cargo"));
const Cliente_1 = __importDefault(require("../../objects/classes/Cliente"));
const ContaCorrente_1 = __importDefault(require("../../objects/classes/ContaCorrente"));
const ContaPoupanca_1 = __importDefault(require("../../objects/classes/ContaPoupanca"));
const Endereco_1 = __importDefault(require("../../objects/classes/Endereco"));
const Funcionario_1 = __importDefault(require("../../objects/classes/Funcionario"));
class FactoryRepository {
    createEmployee(initialRole, cpf, employeeName, phone, salary, additionalRoles) {
        let newEmployee = new Funcionario_1.default(initialRole, cpf, employeeName, phone, salary, additionalRoles);
        return newEmployee;
    }
    createRole(roleName) {
        let newRole = new Cargo_1.default(roleName);
        return newRole;
    }
    createClient(cpf, clientName, phone, isVIP, initialAddress, initialAccount, additionalAccounts, additionalAddresses) {
        return new Cliente_1.default(cpf, clientName, phone, isVIP, initialAddress, initialAccount, additionalAccounts, additionalAddresses);
    }
    createAddress(zipCode, street, number, extraInfo, city, state) {
        let newAddress = new Endereco_1.default(zipCode, street, number, extraInfo, city, state);
        return newAddress;
    }
    createCheckingAccount(number, limit) {
        return new ContaCorrente_1.default(number, limit);
    }
    createSavingsAccount(number) {
        return new ContaPoupanca_1.default(number);
    }
}
exports.default = FactoryRepository;
