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
const Cargo_1 = __importDefault(require("../../objects/classes/Cargo"));
const Cliente_1 = __importDefault(require("../../objects/classes/Cliente"));
const Endereco_1 = __importDefault(require("../../objects/classes/Endereco"));
const ContaCorrente_1 = __importDefault(require("../../objects/classes/ContaCorrente"));
const Funcionario_1 = __importDefault(require("../../objects/classes/Funcionario"));
const InputHandler_1 = __importDefault(require("./InputHandler"));
const ContaPoupanca_1 = __importDefault(require("../../objects/classes/ContaPoupanca"));
class FactoryRepository {
    constructor() {
        this.inputHandler = new InputHandler_1.default();
    }
    startEmployeeCreation() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                let employeeName = yield this.inputHandler.getStringInput("Insira o nome do Funcionário: ");
                let cpf = yield this.inputHandler.getStringInput("Insira o CPF do Funcionário: ");
                let phone = yield this.inputHandler.getStringInput("Insira o telefone do Funcionário: ");
                let salary = yield this.inputHandler.getNumberInput("Insira o salário do Funcionário: ");
                let roleName = yield this.inputHandler.getStringInput("Insira o cargo inicial do Funcionário: ");
                let initialRole = new Cargo_1.default(roleName);
                let numberOfRoles = yield this.inputHandler.getNumberInput("Insira o número de Cargos adicionais do Funcionário: ");
                let additionalRoles = [];
                for (let i = 0; i < numberOfRoles; i++) {
                    let newRoleName = yield this.inputHandler.getStringInput(`Insira o nome do Cargo adicional ${i + 1}/${numberOfRoles}: `);
                    additionalRoles.push(new Cargo_1.default(newRoleName));
                }
                let newEmployee = new Funcionario_1.default(initialRole, cpf, employeeName, phone, salary, additionalRoles);
                console.log(">>> Funcionário criado com sucesso");
                resolve(newEmployee);
            }));
        });
    }
    startClientCreation() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                let clientName = yield this.inputHandler.getStringInput("Insira o nome do Cliente: ");
                let cpf = yield this.inputHandler.getStringInput("Insira o CPF do Cliente: ");
                let phone = yield this.inputHandler.getStringInput("Insira o telefone do Cliente: ");
                let isVIP = yield this.inputHandler.getBooleanInput("O Cliente é VIP? (s/n) ");
                let initialAddress = yield this.startAddressCreation("\n>>> Criando Endereço inicial do Cliente");
                let numberOfAddresses = yield this.inputHandler.getNumberInput("Insira o número de Endereços adicionais do Cliente: ");
                let additionalAddresses = [];
                for (let i = 0; i < numberOfAddresses; i++) {
                    let newAddress = yield this.startAddressCreation(`\n>>> Criando Endereço adicional ${i + 1}/${numberOfAddresses}`);
                    additionalAddresses.push(newAddress);
                }
                let initialAccount = yield this.startAccountCreation("\n>>> Criando Conta inicial do Cliente");
                let numberOfAccounts = yield this.inputHandler.getNumberInput("Insira o número de Contas adicionais do Cliente: ");
                let additionalAccounts = [];
                for (let j = 0; j < numberOfAccounts; j++) {
                    let newAccount = yield this.startAccountCreation(`\n>>> Criando Conta adicional ${j + 1}/${numberOfAccounts}`);
                    additionalAccounts.push(newAccount);
                }
                let newClient = new Cliente_1.default(cpf, clientName, phone, isVIP, initialAddress, initialAccount, additionalAccounts, additionalAddresses);
                console.log(">>> Cliente criado com sucesso");
                resolve(newClient);
            }));
        });
    }
    startAddressCreation(startingMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                console.log(startingMessage);
                let state = yield this.inputHandler.getStringInput("Insira a Unidade Federativa do Endereço: ");
                let city = yield this.inputHandler.getStringInput("Insira a cidade do Endereço: ");
                let street = yield this.inputHandler.getStringInput("Insira o logradouro do Endereço: ");
                let number = yield this.inputHandler.getStringInput("Insira o número do Endereço: ");
                let extraInfo = yield this.inputHandler.getStringInput("Insira o complemento do Endereço: ");
                let zipCode = yield this.inputHandler.getStringInput("Insira o CEP do Endereço: ");
                let newAddress = new Endereco_1.default(zipCode, street, number, extraInfo, city, state);
                resolve(newAddress);
            }));
        });
    }
    startAccountCreation(startingMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(startingMessage);
            return this.inputHandler.getNumberInput("Escolha um tipo de conta para criar\n1. Conta Corrente\n2. Conta Poupança\nInsira um comando: ").then((input) => __awaiter(this, void 0, void 0, function* () {
                if (input == 1) {
                    return this.startCheckingAccountCreation();
                }
                else if (input == 2) {
                    return this.startSavingsAccountCreation();
                }
                else {
                    console.log(">>> Comando inválido");
                    return this.startAccountCreation(startingMessage);
                }
            }));
        });
    }
    startCheckingAccountCreation() {
        return __awaiter(this, void 0, void 0, function* () {
            let number = yield this.inputHandler.getStringInput("Insira o número da Conta Corrente: ");
            let limit = yield this.inputHandler.getNumberInput("Insira o limite da Conta Corrente: ");
            let newAccount = new ContaCorrente_1.default(number, limit);
            return Promise.resolve(newAccount);
        });
    }
    startSavingsAccountCreation() {
        return __awaiter(this, void 0, void 0, function* () {
            let number = yield this.inputHandler.getStringInput("Insira o número da Conta Poupança: ");
            let newAccount = new ContaPoupanca_1.default(number);
            return Promise.resolve(newAccount);
        });
    }
}
exports.default = FactoryRepository;
