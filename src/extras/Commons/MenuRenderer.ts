
import ClientControllerState from "../Client/ClientControllerState";
import EmployeeControllerState from "../Employee/EmployeeControllerState";

class MenuRenderer {
    public renderMainMenu(expectedInputs: Array<number>) {
        console.log("\n***Menu Principal***");
        console.log(`${expectedInputs[0]}. Gerenciar Funcionários`);
        console.log(`${expectedInputs[1]}. Gerenciar Clientes`);
        console.log(`${expectedInputs[2]}. Encerrar`);
    }

    public renderMainEmployeeMenu(expectedInputs: Array<number>) {
        console.log("\n***Menu: Gerenciar Funcionários***");
        console.log(`${expectedInputs[0]}. Criar Funcionário`);
        console.log(`${expectedInputs[1]}. Editar Funcionários`);
        console.log(`${expectedInputs[2]}. Voltar para Menu Principal`);
        console.log(`${expectedInputs[3]}. Encerrar`);
    }

    public renderEditEmployeeMenu(expectedInputs: Array<number>) {
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

    public renderEditEmployeeRolesMenu(expectedInputs: Array<number>) {
        console.log("\n***Menu: Editar Cargos do Funcionário***");
        console.log(`${expectedInputs[0]}. Adicionar Cargo ao Funcionário`);
        console.log(`${expectedInputs[1]}. Remover Cargo do Funcionário`);
        console.log(`${expectedInputs[2]}. Voltar para Menu de Editar Funcionário`);
        console.log(`${expectedInputs[3]}. Voltar para Menu Principal`);
        console.log(`${expectedInputs[4]}. Encerrar`);
    }

    public renderMainClientMenu(expectedInputs: Array<number>) {
        console.log("\n***Menu: Gerenciar Clientes***");
        console.log(`${expectedInputs[0]}. Criar Cliente`);
        console.log(`${expectedInputs[1]}. Editar Clientes`);
        console.log(`${expectedInputs[2]}. Voltar para Menu Principal`);
        console.log(`${expectedInputs[3]}. Encerrar`);
    }

    public renderEmployeeMenus(state: EmployeeControllerState) {
        switch (state) {
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