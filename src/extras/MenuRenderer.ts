import ControllerState from "./ControllerState";

class MenuRenderer {
    public renderMenu(state: ControllerState): boolean {
        switch (state) {
            case ControllerState.MAIN_MENU:
                console.log("***Menu Principal***");
                console.log(`${ControllerState.EMPLOYEE_MENU}. Gerenciar Funcionários`);
                console.log(`${ControllerState.SHUTDOWN}. Encerrar`);
                break;
            case ControllerState.EMPLOYEE_MENU:
                console.log("***Menu: Gerenciar Funcionários***");
                console.log(`${ControllerState.EMPLOYEE_CREATION}. Criar Funcionário`);
                console.log(`${ControllerState.EMPLOYEE_LISTING}. Listar Funcionários`);
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