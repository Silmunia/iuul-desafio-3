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
    CLIENT_MENU,
    CLIENT_CREATION,
    CLIENT_LISTING,
    SHUTDOWN = 999,
    RESET = 1000
}

export default ControllerState;