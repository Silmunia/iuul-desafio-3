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
const ControllerState_1 = __importDefault(require("../ControllerState"));
const EmployeeController_1 = __importDefault(require("../../Employee/EmployeeController"));
const MainMenuOperation_1 = __importDefault(require("./MainMenuOperation"));
const MainOperationTemplate_1 = __importDefault(require("./Abstract Operation/MainOperationTemplate"));
class EmployeeMenuOperation extends MainOperationTemplate_1.default {
    runOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            this._employeeController = new EmployeeController_1.default(this._dataManager);
            let result = yield this._employeeController.runEmployeeCommands();
            if (result === ControllerState_1.default.MAIN_MENU) {
                return new MainMenuOperation_1.default(this._dataManager);
            }
            else if (result === ControllerState_1.default.SHUTDOWN) {
                let termination = new MainMenuOperation_1.default(this._dataManager);
                termination.maintainExecution = false;
                return termination;
            }
            else {
                return this;
            }
        });
    }
}
exports.default = EmployeeMenuOperation;
