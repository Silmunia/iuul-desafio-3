"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ControllerState_1 = __importDefault(require("./ControllerState"));
class MenuRenderer {
    renderMainMenu(state) {
        switch (state) {
            case ControllerState_1.default.MAIN_MENU:
                console.log("\n***Menu Principal***");
                console.log(`${ControllerState_1.default.EMPLOYEE_MENU}. Gerenciar Funcionários`);
                console.log(`${ControllerState_1.default.CLIENT_MENU}. Gerenciar Clientes`);
                console.log(`${ControllerState_1.default.SHUTDOWN}. Encerrar`);
                break;
            default:
                return false;
        }
        return true;
    }
    renderEmployeeMenus(state) {
        switch (state) {
            case ControllerState_1.default.EMPLOYEE_MENU:
                console.log("\n***Menu: Gerenciar Funcionários***");
                console.log(`${ControllerState_1.default.EMPLOYEE_CREATION}. Criar Funcionário`);
                console.log(`${ControllerState_1.default.EMPLOYEE_LISTING}. Editar Funcionários`);
                console.log(`${ControllerState_1.default.MAIN_MENU}. Voltar para Menu Principal`);
                console.log(`${ControllerState_1.default.SHUTDOWN}. Encerrar`);
                break;
            case ControllerState_1.default.EMPLOYEE_EDITING:
                console.log("\n***Menu: Editar Funcionário***");
                console.log(`${ControllerState_1.default.EMPLOYEE_EDIT_LIST}. Listar informações do Funcionário`);
                console.log(`${ControllerState_1.default.EMPLOYEE_EDIT_NAME}. Editar Nome`);
                console.log(`${ControllerState_1.default.EMPLOYEE_EDIT_PHONE}. Editar Telefone`);
                console.log(`${ControllerState_1.default.EMPLOYEE_EDIT_SALARY}. Editar Salário`);
                console.log(`${ControllerState_1.default.EMPLOYEE_EDIT_CPF}. Editar CPF`);
                console.log(`${ControllerState_1.default.EMPLOYEE_ROLES_MENU}. Editar Cargos`);
                console.log(`${ControllerState_1.default.MAIN_MENU}. Voltar para Menu Principal`);
                console.log(`${ControllerState_1.default.SHUTDOWN}. Encerrar`);
                break;
            case ControllerState_1.default.EMPLOYEE_ROLES_MENU:
                console.log("\n***Menu: Editar Cargos do Funcionário***");
                console.log(`${ControllerState_1.default.EMPLOYEE_ROLES_CREATION}. Adicionar Cargo ao Funcionário`);
                console.log(`${ControllerState_1.default.EMPLOYEE_ROLES_REMOVAL}. Remover Cargo do Funcionário`);
                console.log(`${ControllerState_1.default.EMPLOYEE_EDITING}. Voltar para Menu de Editar Funcionário`);
                console.log(`${ControllerState_1.default.MAIN_MENU}. Voltar para Menu Principal`);
                console.log(`${ControllerState_1.default.SHUTDOWN}. Encerrar`);
                break;
            default:
                return false;
        }
        return true;
    }
    renderClientMenus(state) {
        switch (state) {
            case ControllerState_1.default.CLIENT_MENU:
                console.log("\n***Menu: Gerenciar Clientes***");
                console.log(`${ControllerState_1.default.CLIENT_CREATION}. Criar Cliente`);
                console.log(`${ControllerState_1.default.CLIENT_LISTING}. Editar Clientes`);
                console.log(`${ControllerState_1.default.MAIN_MENU}. Voltar para Menu Principal`);
                console.log(`${ControllerState_1.default.SHUTDOWN}. Encerrar`);
                break;
            case ControllerState_1.default.CLIENT_EDITING:
                console.log("\n***Menu: Editar Cliente***");
                console.log(`${ControllerState_1.default.CLIENT_EDIT_LIST}. Listar informações do Cliente`);
                console.log(`${ControllerState_1.default.CLIENT_EDIT_NAME}. Editar Nome`);
                console.log(`${ControllerState_1.default.CLIENT_EDIT_PHONE}. Editar Telefone`);
                console.log(`${ControllerState_1.default.CLIENT_EDIT_CPF}. Editar CPF`);
                console.log(`${ControllerState_1.default.CLIENT_EDIT_VIP}. Editar estado VIP`);
                console.log(`X. Gerenciar Endereço(s)`);
                console.log(`X. Gerenciar Conta(s)`);
                console.log(`${ControllerState_1.default.MAIN_MENU}. Voltar para Menu Principal`);
                console.log(`${ControllerState_1.default.SHUTDOWN}. Encerrar`);
                break;
            default:
                return false;
        }
        return true;
    }
}
exports.default = MenuRenderer;
