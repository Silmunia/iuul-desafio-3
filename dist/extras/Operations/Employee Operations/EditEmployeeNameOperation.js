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
const InputHandler_1 = __importDefault(require("../../Commons/InputHandler"));
const Operation_1 = __importDefault(require("../Abstract Operation/Operation"));
const EmployeeEditMenuOperation_1 = __importDefault(require("./EmployeeEditMenuOperation"));
class EditEmployeeNameOperation extends Operation_1.default {
    constructor(dataManager, editedEmployee) {
        super(dataManager);
        this._inputHandler = new InputHandler_1.default();
        this._editedEmployee = editedEmployee;
    }
    runOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n>>> Editando Nome do Funcionário");
            console.log(`Nome atual: ${this._editedEmployee.nome}`);
            let newName = yield this._inputHandler.getStringInput("Insira o novo Nome do Funcionário: ");
            this._editedEmployee.nome = newName;
            console.log(">>> Nome atualizado com sucesso");
            return new EmployeeEditMenuOperation_1.default(this._dataManager, this._editedEmployee);
        });
    }
}
exports.default = EditEmployeeNameOperation;
