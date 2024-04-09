"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ControllerState;
(function (ControllerState) {
    ControllerState[ControllerState["MAIN_MENU"] = 0] = "MAIN_MENU";
    ControllerState[ControllerState["EMPLOYEE_MENU"] = 1] = "EMPLOYEE_MENU";
    ControllerState[ControllerState["EMPLOYEE_CREATION"] = 2] = "EMPLOYEE_CREATION";
    ControllerState[ControllerState["EMPLOYEE_LISTING"] = 3] = "EMPLOYEE_LISTING";
    ControllerState[ControllerState["CLIENT_MENU"] = 4] = "CLIENT_MENU";
    ControllerState[ControllerState["CLIENT_CREATION"] = 5] = "CLIENT_CREATION";
    ControllerState[ControllerState["CLIENT_LISTING"] = 6] = "CLIENT_LISTING";
    ControllerState[ControllerState["SHUTDOWN"] = 999] = "SHUTDOWN";
    ControllerState[ControllerState["RESET"] = 1000] = "RESET";
})(ControllerState || (ControllerState = {}));
exports.default = ControllerState;
