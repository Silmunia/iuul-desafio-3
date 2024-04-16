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
const InputHandler_1 = __importDefault(require("../Commons/InputHandler"));
const Operation_1 = __importDefault(require("./Abstract Operation/Operation"));
const EmployeeMenuOperation_1 = __importDefault(require("./EmployeeMenuOperation"));
class CreateEmployeeOperation extends Operation_1.default {
    constructor() {
        super(...arguments);
        this._inputHandler = new InputHandler_1.default();
    }
    runOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n>>> Iniciando criação de Funcionário");
            let employeeName = yield this._inputHandler.getStringInput("Insira o nome do Funcionário: ");
            let cpf = yield this._inputHandler.getStringInput("Insira o CPF do Funcionário: ");
            let phone = yield this._inputHandler.getStringInput("Insira o telefone do Funcionário: ");
            let salary = yield this._inputHandler.getNumberInput("Insira o salário do Funcionário: ");
            let roleName = yield this._inputHandler.getStringInput("Insira o cargo inicial do Funcionário: ");
            let numberOfRoles = yield this._inputHandler.getNumberInput("Insira o número de Cargos adicionais do Funcionário: ");
            let additionalRoles = [];
            for (let i = 0; i < numberOfRoles; i++) {
                let newRoleName = yield this._inputHandler.getStringInput(`Insira o nome do Cargo adicional ${i + 1}/${numberOfRoles}: `);
                additionalRoles.push(newRoleName);
            }
            this._dataManager.createEmployee(roleName, cpf, employeeName, phone, salary, additionalRoles);
            return new EmployeeMenuOperation_1.default(this._dataManager);
        });
    }
}
exports.default = CreateEmployeeOperation;
