"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmployeeControllerState_1 = __importDefault(require("./EmployeeControllerState"));
class EmployeeControlParser {
    parseInputForState(state, input) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (state) {
                case EmployeeControllerState_1.default.EMPLOYEE_MENU:
                    switch (input) {
                        case EmployeeControllerState_1.default.EMPLOYEE_CREATION:
                            return EmployeeControllerState_1.default.EMPLOYEE_CREATION;
                        case EmployeeControllerState_1.default.EMPLOYEE_LISTING:
                            return EmployeeControllerState_1.default.EMPLOYEE_LISTING;
                        case EmployeeControllerState_1.default.RETURN_TO_MAIN:
                            return EmployeeControllerState_1.default.RETURN_TO_MAIN;
                        case EmployeeControllerState_1.default.SHUTDOWN:
                            return EmployeeControllerState_1.default.SHUTDOWN;
                        default:
                            throw new Error("Comando desconhecido");
                    }
                case EmployeeControllerState_1.default.EMPLOYEE_EDITING:
                    switch (input) {
                        case EmployeeControllerState_1.default.EMPLOYEE_EDIT_LIST:
                            return EmployeeControllerState_1.default.EMPLOYEE_EDIT_LIST;
                        case EmployeeControllerState_1.default.EMPLOYEE_EDIT_NAME:
                            return EmployeeControllerState_1.default.EMPLOYEE_EDIT_NAME;
                        case EmployeeControllerState_1.default.EMPLOYEE_EDIT_PHONE:
                            return EmployeeControllerState_1.default.EMPLOYEE_EDIT_PHONE;
                        case EmployeeControllerState_1.default.EMPLOYEE_EDIT_SALARY:
                            return EmployeeControllerState_1.default.EMPLOYEE_EDIT_SALARY;
                        case EmployeeControllerState_1.default.EMPLOYEE_EDIT_CPF:
                            return EmployeeControllerState_1.default.EMPLOYEE_EDIT_CPF;
                        case EmployeeControllerState_1.default.EMPLOYEE_ROLES_MENU:
                            return EmployeeControllerState_1.default.EMPLOYEE_ROLES_MENU;
                        case EmployeeControllerState_1.default.RETURN_TO_MAIN:
                            return EmployeeControllerState_1.default.RETURN_TO_MAIN;
                        case EmployeeControllerState_1.default.SHUTDOWN:
                            return EmployeeControllerState_1.default.SHUTDOWN;
                        default:
                            throw new Error("Comando desconhecido");
                    }
                case EmployeeControllerState_1.default.EMPLOYEE_ROLES_MENU:
                    switch (input) {
                        case EmployeeControllerState_1.default.EMPLOYEE_ROLES_CREATION:
                            return EmployeeControllerState_1.default.EMPLOYEE_ROLES_CREATION;
                        case EmployeeControllerState_1.default.EMPLOYEE_ROLES_REMOVAL:
                            return EmployeeControllerState_1.default.EMPLOYEE_ROLES_REMOVAL;
                        case EmployeeControllerState_1.default.EMPLOYEE_EDITING:
                            return EmployeeControllerState_1.default.EMPLOYEE_EDITING;
                        case EmployeeControllerState_1.default.RETURN_TO_MAIN:
                            return EmployeeControllerState_1.default.RETURN_TO_MAIN;
                        case EmployeeControllerState_1.default.SHUTDOWN:
                            return EmployeeControllerState_1.default.SHUTDOWN;
                        default:
                            throw new Error("Comando desconhecido");
                    }
                default:
                    throw new Error("Comando desconhecido");
            }
        });
    }
}
exports.default = EmployeeControlParser;
