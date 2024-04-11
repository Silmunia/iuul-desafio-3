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
const Cliente_1 = __importDefault(require("../objects/classes/Cliente"));
const MenuRenderer_1 = __importDefault(require("./MenuRenderer"));
const ControllerState_1 = __importDefault(require("./ControllerState"));
const InputHandler_1 = __importDefault(require("./InputHandler"));
const Endereco_1 = __importDefault(require("../objects/classes/Endereco"));
const ContaPoupanca_1 = __importDefault(require("../objects/classes/ContaPoupanca"));
class ClientController {
    constructor(initialState, editedEmployee, dataManager) {
        this.inputHandler = new InputHandler_1.default();
        this.menuRenderer = new MenuRenderer_1.default();
        this.currentState = initialState;
        this.dataManager = dataManager;
        if (editedEmployee instanceof Cliente_1.default) {
            this.clientInEditing = editedEmployee;
        }
        else {
            let nilAddress = new Endereco_1.default("", "", "", "", "", "");
            let nilAccount = new ContaPoupanca_1.default("");
            this.clientInEditing = new Cliente_1.default("", "", "", false, nilAddress, nilAccount);
        }
    }
    runClientCommands() {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this.currentState) {
                case ControllerState_1.default.MAIN_MENU:
                    return ControllerState_1.default.MAIN_MENU;
                case ControllerState_1.default.SHUTDOWN:
                    return ControllerState_1.default.SHUTDOWN;
                case ControllerState_1.default.RESET:
                    console.log(">>> Voltando ao Menu de Clientes");
                    this.currentState = ControllerState_1.default.CLIENT_MENU;
                    return this.runClientCommands();
                case ControllerState_1.default.CLIENT_MENU:
                case ControllerState_1.default.CLIENT_EDITING:
                    this.displayMenu();
                    yield this.startCommandInput("Insira comando: ");
                    return this.runClientCommands();
                case ControllerState_1.default.CLIENT_LISTING:
                    this.dataManager.listClients();
                    if (this.dataManager.getClients().length === 0) {
                        console.log(">>> Voltando ao Menu de Clientes");
                        this.currentState = ControllerState_1.default.CLIENT_MENU;
                        return this.runClientCommands();
                    }
                    else {
                        this.currentState = ControllerState_1.default.CLIENT_SELECTION;
                        return this.runClientCommands();
                    }
                case ControllerState_1.default.CLIENT_SELECTION:
                    let selectedIndex = yield this.inputHandler.getNumberInput("Selecione um Cliente: ");
                    let parsedIndex = selectedIndex - 1;
                    if (parsedIndex >= 0
                        && parsedIndex < this.dataManager.getClients().length) {
                        console.log(`>>> Cliente ${selectedIndex} selecionado`);
                        this.dataManager.setEditedClient(parsedIndex);
                        let selectedClient = this.dataManager.getEditedClient();
                        if (selectedClient instanceof Cliente_1.default) {
                            this.clientInEditing = selectedClient;
                        }
                        else {
                            console.log(">>> Não foi possível encontrar o Cliente selecionado");
                        }
                        this.currentState = ControllerState_1.default.CLIENT_EDITING;
                    }
                    else {
                        console.log(">>> Cliente inválido");
                    }
                    return this.runClientCommands();
                case ControllerState_1.default.CLIENT_CREATION:
                    yield this.dataManager.addClient();
                    this.currentState = ControllerState_1.default.CLIENT_MENU;
                    return this.runClientCommands();
                case ControllerState_1.default.CLIENT_LISTING:
                    this.dataManager.listClients();
                    this.currentState = ControllerState_1.default.CLIENT_MENU;
                    return this.runClientCommands();
                case ControllerState_1.default.CLIENT_EDIT_LIST:
                    console.log(this.dataManager.listEditedClientInfo());
                    this.currentState = ControllerState_1.default.CLIENT_EDITING;
                    return this.runClientCommands();
                case ControllerState_1.default.CLIENT_EDIT_NAME:
                    console.log(`Nome atual do Cliente: ${this.clientInEditing.nome}`);
                    let newName = yield this.inputHandler.getStringInput("Insira o novo Nome do Cliente: ");
                    this.clientInEditing.nome = newName;
                    console.log(">>> Nome atualizado com sucesso");
                    this.currentState = ControllerState_1.default.CLIENT_EDITING;
                    return this.runClientCommands();
                case ControllerState_1.default.CLIENT_EDIT_PHONE:
                    console.log(`Telefone atual do Cliente: ${this.clientInEditing.telefone}`);
                    let newPhone = yield this.inputHandler.getStringInput("Insira o novo Telefone do Cliente: ");
                    this.clientInEditing.telefone = newPhone;
                    console.log(">>> Telefone atualizado com sucesso");
                    this.currentState = ControllerState_1.default.CLIENT_EDITING;
                    return this.runClientCommands();
                case ControllerState_1.default.CLIENT_EDIT_CPF:
                    console.log(`CPF atual do Cliente: ${this.clientInEditing.cpf}`);
                    let newCPF = yield this.inputHandler.getStringInput("Insira o novo CPF do Cliente: ");
                    this.clientInEditing.cpf = newCPF;
                    console.log(">>> CPF atualizado com sucesso");
                    this.currentState = ControllerState_1.default.CLIENT_EDITING;
                    return this.runClientCommands();
                case ControllerState_1.default.CLIENT_EDIT_VIP:
                    console.log(`Estado VIP atual do Cliente: ${this.clientInEditing.vip ? "VIP" : "Normal"}`);
                    let newVIP = yield this.inputHandler.getBooleanInput(`${this.clientInEditing.vip ? "O Cliente continua VIP? (s/n): " : "O Cliente se torna VIP? (s/n): "}`);
                    this.clientInEditing.vip = newVIP;
                    console.log(">>> Estado VIP atualizado com sucesso");
                    this.currentState = ControllerState_1.default.CLIENT_EDITING;
                    return this.runClientCommands();
                default:
                    console.log(">>> Comando desconhecido");
                    this.currentState = ControllerState_1.default.RESET;
                    return this.runClientCommands();
            }
        });
    }
    displayMenu() {
        let renderResult = this.menuRenderer.renderClientMenus(this.currentState);
        if (!renderResult) {
            console.log(">>> Menu desconhecido");
            console.log(">>> Voltando para o Menu de Clintes");
            this.currentState = ControllerState_1.default.CLIENT_MENU;
        }
    }
    startCommandInput(prompt) {
        return __awaiter(this, void 0, void 0, function* () {
            let receivedInput = yield this.inputHandler.getNumberInput(prompt);
            yield this.parseInputForState(receivedInput);
        });
    }
    parseInputForState(input) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this.currentState) {
                case ControllerState_1.default.CLIENT_MENU:
                    switch (input) {
                        case ControllerState_1.default.CLIENT_CREATION:
                            this.currentState = ControllerState_1.default.CLIENT_CREATION;
                            break;
                        case ControllerState_1.default.CLIENT_LISTING:
                            this.currentState = ControllerState_1.default.CLIENT_LISTING;
                            break;
                        case ControllerState_1.default.MAIN_MENU:
                            this.currentState = ControllerState_1.default.MAIN_MENU;
                            break;
                        case ControllerState_1.default.SHUTDOWN:
                            this.currentState = ControllerState_1.default.SHUTDOWN;
                            break;
                        default:
                            console.log(">>> Comando desconhecido");
                    }
                    break;
                case ControllerState_1.default.CLIENT_EDITING:
                    switch (input) {
                        case ControllerState_1.default.CLIENT_EDIT_LIST:
                            this.currentState = ControllerState_1.default.CLIENT_EDIT_LIST;
                            break;
                        case ControllerState_1.default.CLIENT_EDIT_NAME:
                            this.currentState = ControllerState_1.default.CLIENT_EDIT_NAME;
                            break;
                        case ControllerState_1.default.CLIENT_EDIT_PHONE:
                            this.currentState = ControllerState_1.default.CLIENT_EDIT_PHONE;
                            break;
                        case ControllerState_1.default.CLIENT_EDIT_CPF:
                            this.currentState = ControllerState_1.default.CLIENT_EDIT_CPF;
                            break;
                        case ControllerState_1.default.CLIENT_EDIT_VIP:
                            this.currentState = ControllerState_1.default.CLIENT_EDIT_VIP;
                            break;
                        case ControllerState_1.default.MAIN_MENU:
                            this.currentState = ControllerState_1.default.MAIN_MENU;
                            break;
                        case ControllerState_1.default.SHUTDOWN:
                            this.currentState = ControllerState_1.default.SHUTDOWN;
                            break;
                        default:
                            console.log(">>> Comando desconhecido");
                    }
                    break;
                default:
                    console.log(">>> Comando desconhecido");
                    this.currentState = ControllerState_1.default.RESET;
            }
        });
    }
}
exports.default = ClientController;
