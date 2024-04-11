"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ControllerState;
(function (ControllerState) {
    ControllerState[ControllerState["MAIN_MENU"] = 0] = "MAIN_MENU";
    ControllerState[ControllerState["EMPLOYEE_MENU"] = 1] = "EMPLOYEE_MENU";
    ControllerState[ControllerState["EMPLOYEE_CREATION"] = 2] = "EMPLOYEE_CREATION";
    ControllerState[ControllerState["EMPLOYEE_LISTING"] = 3] = "EMPLOYEE_LISTING";
    ControllerState[ControllerState["EMPLOYEE_SELECTION"] = 4] = "EMPLOYEE_SELECTION";
    ControllerState[ControllerState["EMPLOYEE_EDITING"] = 5] = "EMPLOYEE_EDITING";
    ControllerState[ControllerState["EMPLOYEE_EDIT_LIST"] = 6] = "EMPLOYEE_EDIT_LIST";
    ControllerState[ControllerState["EMPLOYEE_EDIT_NAME"] = 7] = "EMPLOYEE_EDIT_NAME";
    ControllerState[ControllerState["EMPLOYEE_EDIT_PHONE"] = 8] = "EMPLOYEE_EDIT_PHONE";
    ControllerState[ControllerState["EMPLOYEE_EDIT_SALARY"] = 9] = "EMPLOYEE_EDIT_SALARY";
    ControllerState[ControllerState["EMPLOYEE_EDIT_CPF"] = 10] = "EMPLOYEE_EDIT_CPF";
    ControllerState[ControllerState["EMPLOYEE_ROLES_MENU"] = 11] = "EMPLOYEE_ROLES_MENU";
    ControllerState[ControllerState["EMPLOYEE_ROLES_CREATION"] = 12] = "EMPLOYEE_ROLES_CREATION";
    ControllerState[ControllerState["EMPLOYEE_ROLES_REMOVAL"] = 13] = "EMPLOYEE_ROLES_REMOVAL";
    ControllerState[ControllerState["CLIENT_MENU"] = 14] = "CLIENT_MENU";
    ControllerState[ControllerState["CLIENT_CREATION"] = 15] = "CLIENT_CREATION";
    ControllerState[ControllerState["CLIENT_LISTING"] = 16] = "CLIENT_LISTING";
    ControllerState[ControllerState["CLIENT_SELECTION"] = 17] = "CLIENT_SELECTION";
    ControllerState[ControllerState["CLIENT_EDITING"] = 18] = "CLIENT_EDITING";
    ControllerState[ControllerState["CLIENT_EDIT_LIST"] = 19] = "CLIENT_EDIT_LIST";
    ControllerState[ControllerState["CLIENT_EDIT_NAME"] = 20] = "CLIENT_EDIT_NAME";
    ControllerState[ControllerState["CLIENT_EDIT_PHONE"] = 21] = "CLIENT_EDIT_PHONE";
    ControllerState[ControllerState["CLIENT_EDIT_CPF"] = 22] = "CLIENT_EDIT_CPF";
    ControllerState[ControllerState["CLIENT_EDIT_VIP"] = 23] = "CLIENT_EDIT_VIP";
    ControllerState[ControllerState["CLIENT_ADDRESS_MENU"] = 24] = "CLIENT_ADDRESS_MENU";
    ControllerState[ControllerState["CLIENT_ADDRESS_LIST"] = 25] = "CLIENT_ADDRESS_LIST";
    ControllerState[ControllerState["CLIENT_ADDRESS_CREATION"] = 26] = "CLIENT_ADDRESS_CREATION";
    ControllerState[ControllerState["CLIENT_ADDRESS_REMOVAL"] = 27] = "CLIENT_ADDRESS_REMOVAL";
    ControllerState[ControllerState["CLIENT_ACCOUNT_MENU"] = 28] = "CLIENT_ACCOUNT_MENU";
    ControllerState[ControllerState["CLIENT_ACCOUNT_LIST"] = 29] = "CLIENT_ACCOUNT_LIST";
    ControllerState[ControllerState["CLIENT_ACCOUNT_WITHDRAW"] = 30] = "CLIENT_ACCOUNT_WITHDRAW";
    ControllerState[ControllerState["CLIENT_ACCOUNT_DEPOSIT"] = 31] = "CLIENT_ACCOUNT_DEPOSIT";
    ControllerState[ControllerState["CLIENT_ACCOUNT_BALANCE"] = 32] = "CLIENT_ACCOUNT_BALANCE";
    ControllerState[ControllerState["CLIENT_ACCOUNT_TRANSFER"] = 33] = "CLIENT_ACCOUNT_TRANSFER";
    ControllerState[ControllerState["SHUTDOWN"] = 999] = "SHUTDOWN";
    ControllerState[ControllerState["RESET"] = 1000] = "RESET";
})(ControllerState || (ControllerState = {}));
exports.default = ControllerState;
