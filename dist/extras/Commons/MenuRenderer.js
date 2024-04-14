"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ControllerState_1 = __importDefault(require("../Main/ControllerState"));
const EmployeeControllerState_1 = __importDefault(require("../Employee/EmployeeControllerState"));
const ClientControllerState_1 = __importDefault(require("../Client/ClientControllerState"));
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
                throw new Error(">>> Não foi possível exibir o Menu Principal");
        }
    }
    renderEmployeeMenus(state) {
        switch (state) {
            case EmployeeControllerState_1.default.EMPLOYEE_MENU:
                console.log("\n***Menu: Gerenciar Funcionários***");
                console.log(`${EmployeeControllerState_1.default.EMPLOYEE_CREATION}. Criar Funcionário`);
                console.log(`${EmployeeControllerState_1.default.EMPLOYEE_LISTING}. Editar Funcionários`);
                console.log(`${EmployeeControllerState_1.default.RETURN_TO_MAIN}. Voltar para Menu Principal`);
                console.log(`${EmployeeControllerState_1.default.SHUTDOWN}. Encerrar`);
                break;
            case EmployeeControllerState_1.default.EMPLOYEE_EDITING:
                console.log("\n***Menu: Editar Funcionário***");
                console.log(`${EmployeeControllerState_1.default.EMPLOYEE_EDIT_LIST}. Listar informações do Funcionário`);
                console.log(`${EmployeeControllerState_1.default.EMPLOYEE_EDIT_NAME}. Editar Nome`);
                console.log(`${EmployeeControllerState_1.default.EMPLOYEE_EDIT_PHONE}. Editar Telefone`);
                console.log(`${EmployeeControllerState_1.default.EMPLOYEE_EDIT_SALARY}. Editar Salário`);
                console.log(`${EmployeeControllerState_1.default.EMPLOYEE_EDIT_CPF}. Editar CPF`);
                console.log(`${EmployeeControllerState_1.default.EMPLOYEE_ROLES_MENU}. Editar Cargos`);
                console.log(`${EmployeeControllerState_1.default.RETURN_TO_MAIN}. Voltar para Menu Principal`);
                console.log(`${EmployeeControllerState_1.default.SHUTDOWN}. Encerrar`);
                break;
            case EmployeeControllerState_1.default.EMPLOYEE_ROLES_MENU:
                console.log("\n***Menu: Editar Cargos do Funcionário***");
                console.log(`${EmployeeControllerState_1.default.EMPLOYEE_ROLES_CREATION}. Adicionar Cargo ao Funcionário`);
                console.log(`${EmployeeControllerState_1.default.EMPLOYEE_ROLES_REMOVAL}. Remover Cargo do Funcionário`);
                console.log(`${EmployeeControllerState_1.default.EMPLOYEE_EDITING}. Voltar para Menu de Editar Funcionário`);
                console.log(`${EmployeeControllerState_1.default.RETURN_TO_MAIN}. Voltar para Menu Principal`);
                console.log(`${EmployeeControllerState_1.default.SHUTDOWN}. Encerrar`);
                break;
            default:
                throw new Error(">>> Não foi possível exibir o Menu de Funcionários");
        }
    }
    renderClientMenus(state) {
        switch (state) {
            case ClientControllerState_1.default.CLIENT_MENU:
                console.log("\n***Menu: Gerenciar Clientes***");
                console.log(`${ClientControllerState_1.default.CLIENT_CREATION}. Criar Cliente`);
                console.log(`${ClientControllerState_1.default.CLIENT_LISTING}. Editar Clientes`);
                console.log(`${ClientControllerState_1.default.RETURN_TO_MAIN}. Voltar para Menu Principal`);
                console.log(`${ClientControllerState_1.default.SHUTDOWN}. Encerrar`);
                break;
            case ClientControllerState_1.default.CLIENT_EDITING:
                console.log("\n***Menu: Editar Cliente***");
                console.log(`${ClientControllerState_1.default.CLIENT_EDIT_LIST}. Listar informações do Cliente`);
                console.log(`${ClientControllerState_1.default.CLIENT_EDIT_NAME}. Editar Nome`);
                console.log(`${ClientControllerState_1.default.CLIENT_EDIT_PHONE}. Editar Telefone`);
                console.log(`${ClientControllerState_1.default.CLIENT_EDIT_CPF}. Editar CPF`);
                console.log(`${ClientControllerState_1.default.CLIENT_EDIT_VIP}. Editar estado VIP`);
                console.log(`${ClientControllerState_1.default.CLIENT_ADDRESS_MENU}. Gerenciar Endereço(s)`);
                console.log(`${ClientControllerState_1.default.CLIENT_ACCOUNT_MENU}. Gerenciar Conta(s)`);
                console.log(`${ClientControllerState_1.default.RETURN_TO_MAIN}. Voltar para Menu Principal`);
                console.log(`${ClientControllerState_1.default.SHUTDOWN}. Encerrar`);
                break;
            case ClientControllerState_1.default.CLIENT_ADDRESS_MENU:
                console.log("\n***Menu: Gerenciar Endereços do Cliente***");
                console.log(`${ClientControllerState_1.default.CLIENT_ADDRESS_LIST}. Listar Endereços do Cliente`);
                console.log(`${ClientControllerState_1.default.CLIENT_ADDRESS_CREATION}. Adicionar Endereço`);
                console.log(`${ClientControllerState_1.default.CLIENT_ADDRESS_REMOVAL}. Remover Endereço`);
                console.log(`${ClientControllerState_1.default.CLIENT_EDITING}. Voltar para Menu de Editar Cliente`);
                console.log(`${ClientControllerState_1.default.RETURN_TO_MAIN}. Voltar para Menu Principal`);
                console.log(`${ClientControllerState_1.default.SHUTDOWN}. Encerrar`);
                break;
            case ClientControllerState_1.default.CLIENT_ACCOUNT_MENU:
                console.log("\n***Menu: Gerenciar Contas do Cliente***");
                console.log(`${ClientControllerState_1.default.CLIENT_ACCOUNT_LIST}. Listar Contas do Cliente`);
                console.log(`${ClientControllerState_1.default.CLIENT_ACCOUNT_DEPOSIT}. Fazer depósito`);
                console.log(`${ClientControllerState_1.default.CLIENT_ACCOUNT_WITHDRAW}. Fazer saque`);
                console.log(`${ClientControllerState_1.default.CLIENT_ACCOUNT_BALANCE}. Calcular saldo`);
                console.log(`${ClientControllerState_1.default.CLIENT_ACCOUNT_TRANSFER}. Fazer transferência`);
                console.log(`${ClientControllerState_1.default.CLIENT_EDITING}. Voltar para Menu de Editar Cliente`);
                console.log(`${ClientControllerState_1.default.RETURN_TO_MAIN}. Voltar para Menu Principal`);
                console.log(`${ClientControllerState_1.default.SHUTDOWN}. Encerrar`);
                break;
            default:
                throw new Error(">>> Não foi possível exibir o Menu de Clientes");
        }
    }
}
exports.default = MenuRenderer;
