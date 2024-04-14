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
const MenuRenderer_1 = __importDefault(require("../Commons/MenuRenderer"));
const ControllerState_1 = __importDefault(require("../Main/ControllerState"));
const InputHandler_1 = __importDefault(require("../Commons/InputHandler"));
const ClientControllerState_1 = __importDefault(require("./ClientControllerState"));
const ClientControlParser_1 = __importDefault(require("./ClientControlParser"));
const ClientOperator_1 = __importDefault(require("./ClientOperator"));
class ClientController {
    constructor(dataManager) {
        this.currentState = ClientControllerState_1.default.CLIENT_MENU;
        this.inputHandler = new InputHandler_1.default();
        this.menuRenderer = new MenuRenderer_1.default();
        this.controlParser = new ClientControlParser_1.default();
        this.operator = new ClientOperator_1.default(dataManager);
    }
    runClientCommands() {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this.currentState) {
                case ClientControllerState_1.default.RETURN_TO_MAIN:
                    return ControllerState_1.default.MAIN_MENU;
                case ClientControllerState_1.default.SHUTDOWN:
                    return ControllerState_1.default.SHUTDOWN;
                case ClientControllerState_1.default.RESET:
                    console.log(">>> Voltando ao Menu de Clientes");
                    this.currentState = ClientControllerState_1.default.CLIENT_MENU;
                    return this.runClientCommands();
                case ClientControllerState_1.default.CLIENT_MENU:
                case ClientControllerState_1.default.CLIENT_EDITING:
                case ClientControllerState_1.default.CLIENT_ADDRESS_MENU:
                case ClientControllerState_1.default.CLIENT_ACCOUNT_MENU:
                    try {
                        this.menuRenderer.renderClientMenus(this.currentState);
                        yield this.startCommandInput("Insira comando: ");
                    }
                    catch (error) {
                        console.log(`>>> ${error instanceof Error ? error.message : "Erro ao exibir o Menu"}`);
                        console.log(">>> Voltando para o Menu Principal");
                        this.currentState = ClientControllerState_1.default.RETURN_TO_MAIN;
                    }
                    return this.runClientCommands();
                case ClientControllerState_1.default.CLIENT_LISTING:
                    this.currentState = this.operator.listClientsOperation();
                    break;
                case ClientControllerState_1.default.CLIENT_SELECTION:
                    this.currentState = yield this.operator.selectClientOperation();
                    break;
                case ClientControllerState_1.default.CLIENT_CREATION:
                    this.currentState = yield this.operator.createClientOperation();
                    break;
                case ClientControllerState_1.default.CLIENT_EDIT_LIST:
                    this.currentState = this.operator.listClientInfoOperation();
                    break;
                case ClientControllerState_1.default.CLIENT_EDIT_NAME:
                    this.currentState = yield this.operator.editClientNameOperation();
                    break;
                case ClientControllerState_1.default.CLIENT_EDIT_PHONE:
                    this.currentState = yield this.operator.editClientPhoneOperation();
                    break;
                case ClientControllerState_1.default.CLIENT_EDIT_CPF:
                    this.currentState = yield this.operator.editClientCpfOperation();
                    break;
                case ClientControllerState_1.default.CLIENT_EDIT_VIP:
                    this.currentState = yield this.operator.editClientVipOperation();
                    break;
                case ClientControllerState_1.default.CLIENT_ADDRESS_CREATION:
                    this.currentState = yield this.operator.createClientAddressOperation();
                    break;
                case ClientControllerState_1.default.CLIENT_ADDRESS_REMOVAL:
                    this.currentState = yield this.operator.removeClientAddressOperation();
                    break;
                case ClientControllerState_1.default.CLIENT_ADDRESS_LIST:
                    this.currentState = this.operator.listClientAddressesOperation();
                    break;
                case ClientControllerState_1.default.CLIENT_ACCOUNT_LIST:
                    this.currentState = this.operator.listClientAccountsOperation();
                    break;
                case ClientControllerState_1.default.CLIENT_ACCOUNT_DEPOSIT:
                    this.currentState = yield this.operator.makeAccountDepositOperation();
                    break;
                case ClientControllerState_1.default.CLIENT_ACCOUNT_WITHDRAW:
                    this.currentState = yield this.operator.makeAccountWithdrawOperation();
                    break;
                case ClientControllerState_1.default.CLIENT_ACCOUNT_BALANCE:
                    this.currentState = yield this.operator.makeAccountBalanceOperation();
                    break;
                case ClientControllerState_1.default.CLIENT_ACCOUNT_TRANSFER:
                    this.currentState = yield this.operator.makeAccountTransferOperation();
                    break;
                default:
                    console.log(">>> Comando desconhecido");
                    this.currentState = ClientControllerState_1.default.RESET;
            }
            return this.runClientCommands();
        });
    }
    startCommandInput(prompt) {
        return __awaiter(this, void 0, void 0, function* () {
            let receivedInput = yield this.inputHandler.getNumberInput(prompt);
            this.currentState = yield this.controlParser.parseInputForState(this.currentState, receivedInput);
        });
    }
}
exports.default = ClientController;
