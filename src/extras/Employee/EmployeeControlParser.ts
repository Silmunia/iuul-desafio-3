import EmployeeControllerState from "./EmployeeControllerState";

class EmployeeControlParser {

    public async parseInputForState(state: EmployeeControllerState, input: number): Promise<EmployeeControllerState> {
        switch(state) {
            case EmployeeControllerState.EMPLOYEE_MENU:
                switch (input) {
                    case EmployeeControllerState.EMPLOYEE_CREATION:
                        return EmployeeControllerState.EMPLOYEE_CREATION;
                    case EmployeeControllerState.EMPLOYEE_LISTING:
                        return EmployeeControllerState.EMPLOYEE_LISTING;
                    case EmployeeControllerState.RETURN_TO_MAIN:
                        return EmployeeControllerState.RETURN_TO_MAIN;
                    case EmployeeControllerState.SHUTDOWN:
                        return EmployeeControllerState.SHUTDOWN;
                    default:
                        console.log(">>> Comando desconhecido");
                        return state;
                }
            case EmployeeControllerState.EMPLOYEE_EDITING:
                switch (input) {
                    case EmployeeControllerState.EMPLOYEE_EDIT_LIST:
                        return EmployeeControllerState.EMPLOYEE_EDIT_LIST;
                    case EmployeeControllerState.EMPLOYEE_EDIT_NAME:
                        return EmployeeControllerState.EMPLOYEE_EDIT_NAME;
                    case EmployeeControllerState.EMPLOYEE_EDIT_PHONE:
                        return EmployeeControllerState.EMPLOYEE_EDIT_PHONE;
                    case EmployeeControllerState.EMPLOYEE_EDIT_SALARY:
                        return EmployeeControllerState.EMPLOYEE_EDIT_SALARY;
                    case EmployeeControllerState.EMPLOYEE_EDIT_CPF:
                        return EmployeeControllerState.EMPLOYEE_EDIT_CPF;
                    case EmployeeControllerState.EMPLOYEE_ROLES_MENU:
                        return EmployeeControllerState.EMPLOYEE_ROLES_MENU;
                    case EmployeeControllerState.RETURN_TO_MAIN:
                        return EmployeeControllerState.RETURN_TO_MAIN;
                    case EmployeeControllerState.SHUTDOWN:
                        return EmployeeControllerState.SHUTDOWN;
                    default:
                        console.log(">>> Comando desconhecido");
                        return state;
                }
            case EmployeeControllerState.EMPLOYEE_ROLES_MENU:
                switch (input) {
                    case EmployeeControllerState.EMPLOYEE_ROLES_CREATION:
                        return EmployeeControllerState.EMPLOYEE_ROLES_CREATION;
                    case EmployeeControllerState.EMPLOYEE_ROLES_REMOVAL:
                        return EmployeeControllerState.EMPLOYEE_ROLES_REMOVAL;
                    case EmployeeControllerState.EMPLOYEE_EDITING:
                        return EmployeeControllerState.EMPLOYEE_EDITING;
                    case EmployeeControllerState.RETURN_TO_MAIN:
                        return EmployeeControllerState.RETURN_TO_MAIN;
                    case EmployeeControllerState.SHUTDOWN:
                        return EmployeeControllerState.SHUTDOWN;
                    default:
                        console.log(">>> Comando desconhecido");
                        return state;
                }
            default:
                console.log(">>> Comando desconhecido");
                return EmployeeControllerState.RESET;
        }
    }

}

export default EmployeeControlParser;