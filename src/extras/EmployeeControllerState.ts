
enum EmployeeControllerState {
    RETURN_TO_MAIN = 0,
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
    SHUTDOWN = 999,
    RESET = 1000
}

export default EmployeeControllerState;