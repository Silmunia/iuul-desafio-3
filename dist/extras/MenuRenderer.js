"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ControllerState_1 = __importDefault(require("./ControllerState"));
class MenuRenderer {
    renderMenu(state) {
        switch (state) {
            case ControllerState_1.default.MAIN_MENU:
                console.log("***Menu Principal***");
                console.log(`${ControllerState_1.default.EMPLOYEE_MENU}. Gerenciar Funcionários`);
                console.log(`${ControllerState_1.default.CLIENT_MENU}. Gerenciar Clientes`);
                console.log(`${ControllerState_1.default.SHUTDOWN}. Encerrar`);
                break;
            case ControllerState_1.default.EMPLOYEE_MENU:
                console.log("***Menu: Gerenciar Funcionários***");
                console.log(`${ControllerState_1.default.EMPLOYEE_CREATION}. Criar Funcionário`);
                console.log(`${ControllerState_1.default.EMPLOYEE_LISTING}. Listar Funcionários`);
                console.log(`${ControllerState_1.default.MAIN_MENU}. Voltar para Menu Principal`);
                console.log(`${ControllerState_1.default.SHUTDOWN}. Encerrar`);
                break;
            case ControllerState_1.default.CLIENT_MENU:
                console.log("***Menu: Gerenciar Clientes***");
                console.log(`${ControllerState_1.default.CLIENT_CREATION}. Criar Cliente`);
                console.log(`${ControllerState_1.default.CLIENT_LISTING}. Listar Clientes`);
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
