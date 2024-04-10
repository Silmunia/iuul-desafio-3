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
const Cliente_1 = __importDefault(require("../objects/classes/Cliente"));
const Endereco_1 = __importDefault(require("../objects/classes/Endereco"));
const ContaCorrente_1 = __importDefault(require("../objects/classes/ContaCorrente"));
const Funcionario_1 = __importDefault(require("../objects/classes/Funcionario"));
const InputHandler_1 = __importDefault(require("./InputHandler"));
const ContaPoupanca_1 = __importDefault(require("../objects/classes/ContaPoupanca"));
class FactoryRepository {
    constructor() {
        this.inputHandler = new InputHandler_1.default();
    }
    startEmployeeCreation() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                let employeeName = yield this.inputHandler.getStringInput("Insira o nome do Funcionário: ");
                let roleName = yield this.inputHandler.getStringInput("Insira o cargo do Funcionário: ");
                let cpf = yield this.inputHandler.getStringInput("Insira o CPF do Funcionário: ");
                let phone = yield this.inputHandler.getStringInput("Insira o telefone do Funcionário: ");
                let salary = yield this.inputHandler.getNumberInput("Insira o salário do Funcionário: ");
                let newEmployee = new Funcionario_1.default(roleName, cpf, employeeName, phone, salary);
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
                let address = yield this.startAddressCreation();
                let account = yield this.startAccountCreation();
                let isVIP = yield this.inputHandler.getBooleanInput("O Cliente é VIP? (s/n) ");
                let newClient = new Cliente_1.default(cpf, clientName, phone, isVIP, address, account);
                console.log(">>> Cliente criado com sucesso");
                resolve(newClient);
            }));
        });
    }
    startAddressCreation() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                console.log(">>> Criando Endereço");
                let state = yield this.inputHandler.getStringInput("Insira a Unidade Federativa do Endereço: ");
                let city = yield this.inputHandler.getStringInput("Insira a cidade do Endereço: ");
                let street = yield this.inputHandler.getStringInput("Insira o logradouro do Endereço: ");
                let number = yield this.inputHandler.getStringInput("Insira o número do Endereço: ");
                let extraInfo = yield this.inputHandler.getStringInput("Insira o complemento do Endereço: ");
                let zipCode = yield this.inputHandler.getStringInput("Insira o CEP do Endereço: ");
                let newAddress = new Endereco_1.default(zipCode, street, number, extraInfo, city, state);
                console.log(">>> Endereço criado com sucesso");
                resolve(newAddress);
            }));
        });
    }
    startAccountCreation() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.inputHandler.getNumberInput("Escolha um tipo de conta para criar:\n1. Conta Corrente\n2. Conta Poupança\nInsira um comando: ").then((input) => __awaiter(this, void 0, void 0, function* () {
                if (input == 1) {
                    return this.startCheckingAccountCreation();
                }
                else if (input == 2) {
                    return this.startSavingsAccountCreation();
                }
                else {
                    console.log(">>> Comando inválido");
                    return this.startAccountCreation();
                }
            }));
        });
    }
    startCheckingAccountCreation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(">>> Criando Conta Corrente");
            let number = yield this.inputHandler.getStringInput("Insira o número da Conta Corrente: ");
            let limit = yield this.inputHandler.getNumberInput("Insira o limite da Conta Corrente: ");
            let newAccount = new ContaCorrente_1.default(number, limit);
            return Promise.resolve(newAccount);
        });
    }
    startSavingsAccountCreation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(">>> Criando Conta Poupança");
            let number = yield this.inputHandler.getStringInput("Insira o número da Conta Poupança: ");
            let newAccount = new ContaPoupanca_1.default(number);
            return Promise.resolve(newAccount);
        });
    }
}
exports.default = FactoryRepository;
