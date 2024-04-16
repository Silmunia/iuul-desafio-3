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
const ClientControllerState_1 = __importDefault(require("./ClientControllerState"));
class ClientControlParser {
    parseInputForState(state, input) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (state) {
                case ClientControllerState_1.default.CLIENT_MENU:
                    switch (input) {
                        case ClientControllerState_1.default.CLIENT_CREATION:
                            return ClientControllerState_1.default.CLIENT_CREATION;
                        case ClientControllerState_1.default.CLIENT_LISTING:
                            return ClientControllerState_1.default.CLIENT_LISTING;
                        case ClientControllerState_1.default.RETURN_TO_MAIN:
                            return ClientControllerState_1.default.RETURN_TO_MAIN;
                        case ClientControllerState_1.default.SHUTDOWN:
                            return ClientControllerState_1.default.SHUTDOWN;
                        default:
                            throw new Error("Comando desconhecido");
                    }
                case ClientControllerState_1.default.CLIENT_EDITING:
                    switch (input) {
                        case ClientControllerState_1.default.CLIENT_EDIT_LIST:
                            return ClientControllerState_1.default.CLIENT_EDIT_LIST;
                        case ClientControllerState_1.default.CLIENT_EDIT_NAME:
                            return ClientControllerState_1.default.CLIENT_EDIT_NAME;
                        case ClientControllerState_1.default.CLIENT_EDIT_PHONE:
                            return ClientControllerState_1.default.CLIENT_EDIT_PHONE;
                        case ClientControllerState_1.default.CLIENT_EDIT_CPF:
                            return ClientControllerState_1.default.CLIENT_EDIT_CPF;
                        case ClientControllerState_1.default.CLIENT_EDIT_VIP:
                            return ClientControllerState_1.default.CLIENT_EDIT_VIP;
                        case ClientControllerState_1.default.CLIENT_ADDRESS_MENU:
                            return ClientControllerState_1.default.CLIENT_ADDRESS_MENU;
                        case ClientControllerState_1.default.CLIENT_ACCOUNT_MENU:
                            return ClientControllerState_1.default.CLIENT_ACCOUNT_MENU;
                        case ClientControllerState_1.default.RETURN_TO_MAIN:
                            return ClientControllerState_1.default.RETURN_TO_MAIN;
                        case ClientControllerState_1.default.SHUTDOWN:
                            return ClientControllerState_1.default.SHUTDOWN;
                        default:
                            throw new Error("Comando desconhecido");
                    }
                case ClientControllerState_1.default.CLIENT_ADDRESS_MENU:
                    switch (input) {
                        case ClientControllerState_1.default.CLIENT_ADDRESS_CREATION:
                            return ClientControllerState_1.default.CLIENT_ADDRESS_CREATION;
                        case ClientControllerState_1.default.CLIENT_ADDRESS_REMOVAL:
                            return ClientControllerState_1.default.CLIENT_ADDRESS_REMOVAL;
                        case ClientControllerState_1.default.CLIENT_ADDRESS_LIST:
                            return ClientControllerState_1.default.CLIENT_ADDRESS_LIST;
                        case ClientControllerState_1.default.CLIENT_EDITING:
                            return ClientControllerState_1.default.CLIENT_EDITING;
                        case ClientControllerState_1.default.RETURN_TO_MAIN:
                            return ClientControllerState_1.default.RETURN_TO_MAIN;
                        case ClientControllerState_1.default.SHUTDOWN:
                            return ClientControllerState_1.default.SHUTDOWN;
                        default:
                            throw new Error("Comando desconhecido");
                    }
                case ClientControllerState_1.default.CLIENT_ACCOUNT_MENU:
                    switch (input) {
                        case ClientControllerState_1.default.CLIENT_ACCOUNT_LIST:
                            return ClientControllerState_1.default.CLIENT_ACCOUNT_LIST;
                        case ClientControllerState_1.default.CLIENT_ACCOUNT_CREATION:
                            return ClientControllerState_1.default.CLIENT_ACCOUNT_CREATION;
                        case ClientControllerState_1.default.CLIENT_ACCOUNT_REMOVAL:
                            return ClientControllerState_1.default.CLIENT_ACCOUNT_REMOVAL;
                        case ClientControllerState_1.default.CLIENT_ACCOUNT_WITHDRAW:
                            return ClientControllerState_1.default.CLIENT_ACCOUNT_WITHDRAW;
                        case ClientControllerState_1.default.CLIENT_ACCOUNT_TRANSFER:
                            return ClientControllerState_1.default.CLIENT_ACCOUNT_TRANSFER;
                        case ClientControllerState_1.default.CLIENT_ACCOUNT_DEPOSIT:
                            return ClientControllerState_1.default.CLIENT_ACCOUNT_DEPOSIT;
                        case ClientControllerState_1.default.CLIENT_ACCOUNT_BALANCE:
                            return ClientControllerState_1.default.CLIENT_ACCOUNT_BALANCE;
                        case ClientControllerState_1.default.CLIENT_EDITING:
                            return ClientControllerState_1.default.CLIENT_EDITING;
                        case ClientControllerState_1.default.RETURN_TO_MAIN:
                            return ClientControllerState_1.default.RETURN_TO_MAIN;
                        case ClientControllerState_1.default.SHUTDOWN:
                            return ClientControllerState_1.default.SHUTDOWN;
                        default:
                            throw new Error("Comando desconhecido");
                    }
                default:
                    throw new Error("Comando desconhecido");
            }
        });
    }
}
exports.default = ClientControlParser;
