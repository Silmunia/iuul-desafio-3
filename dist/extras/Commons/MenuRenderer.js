"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClientControllerState_1 = __importDefault(require("../Client/ClientControllerState"));
class MenuRenderer {
    renderMainMenu(expectedInputs) {
        console.log("\n***Menu Principal***");
        console.log(`${expectedInputs[0]}. Gerenciar Funcionários`);
        console.log(`${expectedInputs[1]}. Gerenciar Clientes`);
        console.log(`${expectedInputs[2]}. Encerrar`);
    }
    renderMainEmployeeMenu(expectedInputs) {
        console.log("\n***Menu: Gerenciar Funcionários***");
        console.log(`${expectedInputs[0]}. Criar Funcionário`);
        console.log(`${expectedInputs[1]}. Editar Funcionários`);
        console.log(`${expectedInputs[2]}. Voltar para Menu Principal`);
        console.log(`${expectedInputs[3]}. Encerrar`);
    }
    renderEditEmployeeMenu(expectedInputs) {
        console.log("\n***Menu: Editar Funcionário***");
        console.log(`${expectedInputs[0]}. Listar informações do Funcionário`);
        console.log(`${expectedInputs[1]}. Editar Nome`);
        console.log(`${expectedInputs[2]}. Editar Telefone`);
        console.log(`${expectedInputs[3]}. Editar Salário`);
        console.log(`${expectedInputs[4]}. Editar CPF`);
        console.log(`${expectedInputs[5]}. Editar Cargos`);
        console.log(`${expectedInputs[6]}. Voltar para Menu Principal`);
        console.log(`${expectedInputs[7]}. Encerrar`);
    }
    renderEditEmployeeRolesMenu(expectedInputs) {
        console.log("\n***Menu: Editar Cargos do Funcionário***");
        console.log(`${expectedInputs[0]}. Adicionar Cargo ao Funcionário`);
        console.log(`${expectedInputs[1]}. Remover Cargo do Funcionário`);
        console.log(`${expectedInputs[2]}. Voltar para Menu de Editar Funcionário`);
        console.log(`${expectedInputs[3]}. Voltar para Menu Principal`);
        console.log(`${expectedInputs[4]}. Encerrar`);
    }
    renderMainClientMenu(expectedInputs) {
        console.log("\n***Menu: Gerenciar Clientes***");
        console.log(`${expectedInputs[0]}. Criar Cliente`);
        console.log(`${expectedInputs[1]}. Editar Clientes`);
        console.log(`${expectedInputs[2]}. Voltar para Menu Principal`);
        console.log(`${expectedInputs[3]}. Encerrar`);
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
                console.log(`${ClientControllerState_1.default.CLIENT_ACCOUNT_CREATION}. Adicionar Contas ao Cliente`);
                console.log(`${ClientControllerState_1.default.CLIENT_ACCOUNT_REMOVAL}. Remover Contas do Cliente`);
                console.log(`${ClientControllerState_1.default.CLIENT_ACCOUNT_DEPOSIT}. Fazer depósito`);
                console.log(`${ClientControllerState_1.default.CLIENT_ACCOUNT_WITHDRAW}. Fazer saque`);
                console.log(`${ClientControllerState_1.default.CLIENT_ACCOUNT_BALANCE}. Calcular saldo`);
                console.log(`${ClientControllerState_1.default.CLIENT_ACCOUNT_TRANSFER}. Fazer transferência`);
                console.log(`${ClientControllerState_1.default.CLIENT_EDITING}. Voltar para Menu de Editar Cliente`);
                console.log(`${ClientControllerState_1.default.RETURN_TO_MAIN}. Voltar para Menu Principal`);
                console.log(`${ClientControllerState_1.default.SHUTDOWN}. Encerrar`);
                break;
            default:
                throw new Error("Não foi possível exibir o Menu de Clientes");
        }
    }
}
exports.default = MenuRenderer;
