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
const Funcionario_1 = __importDefault(require("../objects/classes/Funcionario"));
const InputHandler_1 = __importDefault(require("./InputHandler"));
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
}
exports.default = FactoryRepository;
