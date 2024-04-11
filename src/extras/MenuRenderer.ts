import ControllerState from "./ControllerState";

class MenuRenderer {
    public renderMainMenu(state: ControllerState): boolean {
        switch (state) {
            case ControllerState.MAIN_MENU:
                console.log("\n***Menu Principal***");
                console.log(`${ControllerState.EMPLOYEE_MENU}. Gerenciar Funcionários`);
                console.log(`${ControllerState.CLIENT_MENU}. Gerenciar Clientes`);
                console.log(`${ControllerState.SHUTDOWN}. Encerrar`);
                break;
            default:
                return false;
        }

        return true;
    }

    public renderEmployeeMenus(state: ControllerState): boolean {
        switch (state) {
            case ControllerState.EMPLOYEE_MENU:
                console.log("\n***Menu: Gerenciar Funcionários***");
                console.log(`${ControllerState.EMPLOYEE_CREATION}. Criar Funcionário`);
                console.log(`${ControllerState.EMPLOYEE_LISTING}. Editar Funcionários`);
                console.log(`${ControllerState.MAIN_MENU}. Voltar para Menu Principal`);
                console.log(`${ControllerState.SHUTDOWN}. Encerrar`);
                break;
            case ControllerState.EMPLOYEE_EDITING:
                console.log("\n***Menu: Editar Funcionário***");
                console.log(`${ControllerState.EMPLOYEE_EDIT_LIST}. Listar informações do Funcionário`);
                console.log(`${ControllerState.EMPLOYEE_EDIT_NAME}. Editar Nome`);
                console.log(`${ControllerState.EMPLOYEE_EDIT_PHONE}. Editar Telefone`);
                console.log(`${ControllerState.EMPLOYEE_EDIT_SALARY}. Editar Salário`);
                console.log(`${ControllerState.EMPLOYEE_EDIT_CPF}. Editar CPF`);
                console.log(`${ControllerState.EMPLOYEE_ROLES_MENU}. Editar Cargos`);
                console.log(`${ControllerState.MAIN_MENU}. Voltar para Menu Principal`);
                console.log(`${ControllerState.SHUTDOWN}. Encerrar`);
                break;
            case ControllerState.EMPLOYEE_ROLES_MENU:
                console.log("\n***Menu: Editar Cargos do Funcionário***");
                console.log(`${ControllerState.EMPLOYEE_ROLES_CREATION}. Adicionar Cargo ao Funcionário`);
                console.log(`${ControllerState.EMPLOYEE_ROLES_REMOVAL}. Remover Cargo do Funcionário`);
                console.log(`${ControllerState.EMPLOYEE_EDITING}. Voltar para Menu de Editar Funcionário`);
                console.log(`${ControllerState.MAIN_MENU}. Voltar para Menu Principal`);
                console.log(`${ControllerState.SHUTDOWN}. Encerrar`);
                break;
            default:
                return false;
        }

        return true;
    }

    public renderClientMenus(state: ControllerState): boolean {
        switch (state) {
            case ControllerState.CLIENT_MENU:
                console.log("\n***Menu: Gerenciar Clientes***");
                console.log(`${ControllerState.CLIENT_CREATION}. Criar Cliente`);
                console.log(`${ControllerState.CLIENT_LISTING}. Editar Clientes`);
                console.log(`${ControllerState.MAIN_MENU}. Voltar para Menu Principal`);
                console.log(`${ControllerState.SHUTDOWN}. Encerrar`);
                break;
            case ControllerState.CLIENT_EDITING:
                console.log("\n***Menu: Editar Cliente***");
                console.log(`${ControllerState.CLIENT_EDIT_LIST}. Listar informações do Cliente`);
                console.log(`${ControllerState.CLIENT_EDIT_NAME}. Editar Nome`);
                console.log(`${ControllerState.CLIENT_EDIT_PHONE}. Editar Telefone`);
                console.log(`${ControllerState.CLIENT_EDIT_CPF}. Editar CPF`);
                console.log(`${ControllerState.CLIENT_EDIT_VIP}. Editar estado VIP`);
                console.log(`${ControllerState.CLIENT_ADDRESS_MENU}. Gerenciar Endereço(s)`);
                console.log(`${ControllerState.CLIENT_ACCOUNT_MENU}. Gerenciar Conta(s)`);
                console.log(`${ControllerState.MAIN_MENU}. Voltar para Menu Principal`);
                console.log(`${ControllerState.SHUTDOWN}. Encerrar`);
                break;
            case ControllerState.CLIENT_ADDRESS_MENU:
                console.log("\n***Menu: Gerenciar Endereços do Cliente***");
                console.log(`${ControllerState.CLIENT_ADDRESS_LIST}. Listar Endereços do Cliente`);
                console.log(`${ControllerState.CLIENT_ADDRESS_CREATION}. Adicionar Endereço`);
                console.log(`${ControllerState.CLIENT_ADDRESS_REMOVAL}. Remover Endereço`);
                console.log(`${ControllerState.CLIENT_EDITING}. Voltar para Menu de Editar Cliente`);
                console.log(`${ControllerState.MAIN_MENU}. Voltar para Menu Principal`);
                console.log(`${ControllerState.SHUTDOWN}. Encerrar`);
                break;
            case ControllerState.CLIENT_ACCOUNT_MENU:
                console.log("\n***Menu: Gerenciar Contas do Cliente***");
                console.log(`${ControllerState.CLIENT_ACCOUNT_LIST}. Listar Contas do Cliente`);
                console.log(`${ControllerState.CLIENT_ACCOUNT_DEPOSIT}. Fazer depósito`);
                console.log(`${ControllerState.CLIENT_ACCOUNT_WITHDRAW}. Fazer saque`);
                console.log(`${ControllerState.CLIENT_ACCOUNT_BALANCE}. Calcular saldo`);
                console.log(`${ControllerState.CLIENT_EDITING}. Voltar para Menu de Editar Cliente`);
                console.log(`${ControllerState.MAIN_MENU}. Voltar para Menu Principal`);
                console.log(`${ControllerState.SHUTDOWN}. Encerrar`);
                break;
            default:
                return false;
        }

        return true;
    }
}

export default MenuRenderer;