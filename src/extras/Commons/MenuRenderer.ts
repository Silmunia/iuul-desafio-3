import ControllerState from "../Main/ControllerState";
import EmployeeControllerState from "../Employee/EmployeeControllerState";
import ClientControllerState from "../Client/ClientControllerState";

class MenuRenderer {
    public renderMainMenu(state: ControllerState) {
        switch (state) {
            case ControllerState.MAIN_MENU:
                console.log("\n***Menu Principal***");
                console.log(`${ControllerState.EMPLOYEE_MENU}. Gerenciar Funcionários`);
                console.log(`${ControllerState.CLIENT_MENU}. Gerenciar Clientes`);
                console.log(`${ControllerState.SHUTDOWN}. Encerrar`);
                break;
            default:
                throw new Error("Não foi possível exibir o Menu Principal");
        }
    }

    public renderEmployeeMenus(state: EmployeeControllerState) {
        switch (state) {
            case EmployeeControllerState.EMPLOYEE_MENU:
                console.log("\n***Menu: Gerenciar Funcionários***");
                console.log(`${EmployeeControllerState.EMPLOYEE_CREATION}. Criar Funcionário`);
                console.log(`${EmployeeControllerState.EMPLOYEE_LISTING}. Editar Funcionários`);
                console.log(`${EmployeeControllerState.RETURN_TO_MAIN}. Voltar para Menu Principal`);
                console.log(`${EmployeeControllerState.SHUTDOWN}. Encerrar`);
                break;
            case EmployeeControllerState.EMPLOYEE_EDITING:
                console.log("\n***Menu: Editar Funcionário***");
                console.log(`${EmployeeControllerState.EMPLOYEE_EDIT_LIST}. Listar informações do Funcionário`);
                console.log(`${EmployeeControllerState.EMPLOYEE_EDIT_NAME}. Editar Nome`);
                console.log(`${EmployeeControllerState.EMPLOYEE_EDIT_PHONE}. Editar Telefone`);
                console.log(`${EmployeeControllerState.EMPLOYEE_EDIT_SALARY}. Editar Salário`);
                console.log(`${EmployeeControllerState.EMPLOYEE_EDIT_CPF}. Editar CPF`);
                console.log(`${EmployeeControllerState.EMPLOYEE_ROLES_MENU}. Editar Cargos`);
                console.log(`${EmployeeControllerState.RETURN_TO_MAIN}. Voltar para Menu Principal`);
                console.log(`${EmployeeControllerState.SHUTDOWN}. Encerrar`);
                break;
            case EmployeeControllerState.EMPLOYEE_ROLES_MENU:
                console.log("\n***Menu: Editar Cargos do Funcionário***");
                console.log(`${EmployeeControllerState.EMPLOYEE_ROLES_CREATION}. Adicionar Cargo ao Funcionário`);
                console.log(`${EmployeeControllerState.EMPLOYEE_ROLES_REMOVAL}. Remover Cargo do Funcionário`);
                console.log(`${EmployeeControllerState.EMPLOYEE_EDITING}. Voltar para Menu de Editar Funcionário`);
                console.log(`${EmployeeControllerState.RETURN_TO_MAIN}. Voltar para Menu Principal`);
                console.log(`${EmployeeControllerState.SHUTDOWN}. Encerrar`);
                break;
            default:
                throw new Error("Não foi possível exibir o Menu de Funcionários");
        }
    }

    public renderClientMenus(state: ClientControllerState) {
        switch (state) {
            case ClientControllerState.CLIENT_MENU:
                console.log("\n***Menu: Gerenciar Clientes***");
                console.log(`${ClientControllerState.CLIENT_CREATION}. Criar Cliente`);
                console.log(`${ClientControllerState.CLIENT_LISTING}. Editar Clientes`);
                console.log(`${ClientControllerState.RETURN_TO_MAIN}. Voltar para Menu Principal`);
                console.log(`${ClientControllerState.SHUTDOWN}. Encerrar`);
                break;
            case ClientControllerState.CLIENT_EDITING:
                console.log("\n***Menu: Editar Cliente***");
                console.log(`${ClientControllerState.CLIENT_EDIT_LIST}. Listar informações do Cliente`);
                console.log(`${ClientControllerState.CLIENT_EDIT_NAME}. Editar Nome`);
                console.log(`${ClientControllerState.CLIENT_EDIT_PHONE}. Editar Telefone`);
                console.log(`${ClientControllerState.CLIENT_EDIT_CPF}. Editar CPF`);
                console.log(`${ClientControllerState.CLIENT_EDIT_VIP}. Editar estado VIP`);
                console.log(`${ClientControllerState.CLIENT_ADDRESS_MENU}. Gerenciar Endereço(s)`);
                console.log(`${ClientControllerState.CLIENT_ACCOUNT_MENU}. Gerenciar Conta(s)`);
                console.log(`${ClientControllerState.RETURN_TO_MAIN}. Voltar para Menu Principal`);
                console.log(`${ClientControllerState.SHUTDOWN}. Encerrar`);
                break;
            case ClientControllerState.CLIENT_ADDRESS_MENU:
                console.log("\n***Menu: Gerenciar Endereços do Cliente***");
                console.log(`${ClientControllerState.CLIENT_ADDRESS_LIST}. Listar Endereços do Cliente`);
                console.log(`${ClientControllerState.CLIENT_ADDRESS_CREATION}. Adicionar Endereço`);
                console.log(`${ClientControllerState.CLIENT_ADDRESS_REMOVAL}. Remover Endereço`);
                console.log(`${ClientControllerState.CLIENT_EDITING}. Voltar para Menu de Editar Cliente`);
                console.log(`${ClientControllerState.RETURN_TO_MAIN}. Voltar para Menu Principal`);
                console.log(`${ClientControllerState.SHUTDOWN}. Encerrar`);
                break;
            case ClientControllerState.CLIENT_ACCOUNT_MENU:
                console.log("\n***Menu: Gerenciar Contas do Cliente***");
                console.log(`${ClientControllerState.CLIENT_ACCOUNT_LIST}. Listar Contas do Cliente`);
                console.log(`${ClientControllerState.CLIENT_ACCOUNT_CREATION}. Adicionar Contas ao Cliente`);
                console.log(`${ClientControllerState.CLIENT_ACCOUNT_REMOVAL}. Remover Contas do Cliente`);
                console.log(`${ClientControllerState.CLIENT_ACCOUNT_DEPOSIT}. Fazer depósito`);
                console.log(`${ClientControllerState.CLIENT_ACCOUNT_WITHDRAW}. Fazer saque`);
                console.log(`${ClientControllerState.CLIENT_ACCOUNT_BALANCE}. Calcular saldo`);
                console.log(`${ClientControllerState.CLIENT_ACCOUNT_TRANSFER}. Fazer transferência`);
                console.log(`${ClientControllerState.CLIENT_EDITING}. Voltar para Menu de Editar Cliente`);
                console.log(`${ClientControllerState.RETURN_TO_MAIN}. Voltar para Menu Principal`);
                console.log(`${ClientControllerState.SHUTDOWN}. Encerrar`);
                break;
            default:
                throw new Error("Não foi possível exibir o Menu de Clientes");
        }
    }
}

export default MenuRenderer;