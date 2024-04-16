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
const InputHandler_1 = __importDefault(require("../../../Commons/InputHandler"));
const Operation_1 = __importDefault(require("../../Abstract Operation/Operation"));
const MainMenuOperation_1 = __importDefault(require("../../MainMenuOperation"));
const EmployeeRolesMenu_1 = __importDefault(require("./EmployeeRolesMenu"));
class RemoveEmployeeRoleOperation extends Operation_1.default {
    constructor(dataManager, editedEmployee) {
        super(dataManager);
        this._inputHandler = new InputHandler_1.default();
        this._editedEmployee = editedEmployee;
    }
    runOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._editedEmployee.cargos.length == 1) {
                console.log("\n>>> O Funcionário possui apenas um Cargo, portanto não é possível remover Cargos");
                console.log(">>> Voltando para o Menu de Editar Cargos do Funcionário");
                return new EmployeeRolesMenu_1.default(this._dataManager, this._editedEmployee);
            }
            else {
                let employeeRoles = this._dataManager.listEmployeeRoles(this._editedEmployee);
                if (employeeRoles === "") {
                    console.log("\n>>> ERRO FATAL: O Funcionário não possui nenhum Cargo");
                    console.log(">>> O programa será encerrado");
                    let termination = new MainMenuOperation_1.default(this._dataManager);
                    termination.maintainExecution = false;
                    return termination;
                }
                else {
                    console.log(`O Funcionário possui os seguintes Cargos: ${employeeRoles}`);
                    let removedRoleName = yield this._inputHandler.getStringInput("Insira o nome do Cargo a remover: ");
                    try {
                        this._dataManager.removeEmployeeRole(this._editedEmployee, removedRoleName);
                        console.log(">>> Cargo removido com sucesso");
                    }
                    catch (error) {
                        console.log(`>>> Falha na remoção do Cargo. ${error instanceof Error ? error.message : "Erro desconhecido"}`);
                    }
                    return new EmployeeRolesMenu_1.default(this._dataManager, this._editedEmployee);
                }
            }
        });
    }
}
exports.default = RemoveEmployeeRoleOperation;
