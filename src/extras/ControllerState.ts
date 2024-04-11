enum ControllerState {
    MAIN_MENU = 0,
    EMPLOYEE_MENU = 1,
    EMPLOYEE_CREATION,
    EMPLOYEE_LISTING,
    EMPLOYEE_SELECTION,
    EMPLOYEE_EDITING,
    EMPLOYEE_EDIT_LIST,
    EMPLOYEE_EDIT_NAME,
    EMPLOYEE_EDIT_PHONE,
    EMPLOYEE_EDIT_SALARY,
    EMPLOYEE_EDIT_CPF,
    EMPLOYEE_ROLES_MENU,
    EMPLOYEE_ROLES_CREATION,
    EMPLOYEE_ROLES_REMOVAL,
    CLIENT_MENU,
    CLIENT_CREATION,
    CLIENT_LISTING,
    CLIENT_SELECTION,
    CLIENT_EDITING,
    CLIENT_EDIT_LIST,
    CLIENT_EDIT_NAME,
    CLIENT_EDIT_PHONE,
    CLIENT_EDIT_CPF,
    CLIENT_EDIT_VIP,
    SHUTDOWN = 999,
    RESET = 1000
}

export default ControllerState;