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
    ControllerState[ControllerState["CLIENT_MENU"] = 11] = "CLIENT_MENU";
    ControllerState[ControllerState["CLIENT_CREATION"] = 12] = "CLIENT_CREATION";
    ControllerState[ControllerState["CLIENT_LISTING"] = 13] = "CLIENT_LISTING";
    ControllerState[ControllerState["SHUTDOWN"] = 999] = "SHUTDOWN";
    ControllerState[ControllerState["RESET"] = 1000] = "RESET";
})(ControllerState || (ControllerState = {}));
exports.default = ControllerState;
