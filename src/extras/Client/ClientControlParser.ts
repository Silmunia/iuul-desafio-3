import ClientControllerState from "./ClientControllerState";

class ClientControlParser {

    public async parseInputForState(state: ClientControllerState, input: number): Promise<ClientControllerState> {
        switch(state) {
            case ClientControllerState.CLIENT_MENU:
                switch(input) {
                    case ClientControllerState.CLIENT_CREATION:
                        return ClientControllerState.CLIENT_CREATION;
                    case ClientControllerState.CLIENT_LISTING:
                        return ClientControllerState.CLIENT_LISTING;
                    case ClientControllerState.RETURN_TO_MAIN:
                        return ClientControllerState.RETURN_TO_MAIN;
                    case ClientControllerState.SHUTDOWN:
                        return ClientControllerState.SHUTDOWN;
                    default:
                        throw new Error("Comando desconhecido");
                }
            case ClientControllerState.CLIENT_EDITING:
                switch (input) {
                    case ClientControllerState.CLIENT_EDIT_LIST:
                        return ClientControllerState.CLIENT_EDIT_LIST;
                    case ClientControllerState.CLIENT_EDIT_NAME:
                        return ClientControllerState.CLIENT_EDIT_NAME;
                    case ClientControllerState.CLIENT_EDIT_PHONE:
                        return ClientControllerState.CLIENT_EDIT_PHONE;
                    case ClientControllerState.CLIENT_EDIT_CPF:
                        return ClientControllerState.CLIENT_EDIT_CPF;
                    case ClientControllerState.CLIENT_EDIT_VIP:
                        return ClientControllerState.CLIENT_EDIT_VIP;
                    case ClientControllerState.CLIENT_ADDRESS_MENU:
                        return ClientControllerState.CLIENT_ADDRESS_MENU;
                    case ClientControllerState.CLIENT_ACCOUNT_MENU:
                        return ClientControllerState.CLIENT_ACCOUNT_MENU;
                    case ClientControllerState.RETURN_TO_MAIN:
                        return ClientControllerState.RETURN_TO_MAIN;
                    case ClientControllerState.SHUTDOWN:
                        return ClientControllerState.SHUTDOWN;
                    default:
                        throw new Error("Comando desconhecido");
                }
            case ClientControllerState.CLIENT_ADDRESS_MENU:
                switch (input) {
                    case ClientControllerState.CLIENT_ADDRESS_CREATION:
                        return ClientControllerState.CLIENT_ADDRESS_CREATION;
                    case ClientControllerState.CLIENT_ADDRESS_REMOVAL:
                        return ClientControllerState.CLIENT_ADDRESS_REMOVAL;
                    case ClientControllerState.CLIENT_ADDRESS_LIST:
                        return ClientControllerState.CLIENT_ADDRESS_LIST;
                    case ClientControllerState.CLIENT_EDITING:
                        return ClientControllerState.CLIENT_EDITING;
                    case ClientControllerState.RETURN_TO_MAIN:
                        return ClientControllerState.RETURN_TO_MAIN;
                    case ClientControllerState.SHUTDOWN:
                        return ClientControllerState.SHUTDOWN;
                    default:
                        throw new Error("Comando desconhecido");
                }
            case ClientControllerState.CLIENT_ACCOUNT_MENU:
                switch(input) {
                    case ClientControllerState.CLIENT_ACCOUNT_LIST:
                        return ClientControllerState.CLIENT_ACCOUNT_LIST;
                    case ClientControllerState.CLIENT_ACCOUNT_WITHDRAW:
                        return ClientControllerState.CLIENT_ACCOUNT_WITHDRAW;
                    case ClientControllerState.CLIENT_ACCOUNT_TRANSFER:
                        return ClientControllerState.CLIENT_ACCOUNT_TRANSFER;
                    case ClientControllerState.CLIENT_ACCOUNT_DEPOSIT:
                        return ClientControllerState.CLIENT_ACCOUNT_DEPOSIT;
                    case ClientControllerState.CLIENT_ACCOUNT_BALANCE:
                        return ClientControllerState.CLIENT_ACCOUNT_BALANCE;
                    case ClientControllerState.CLIENT_EDITING:
                        return ClientControllerState.CLIENT_EDITING;
                    case ClientControllerState.RETURN_TO_MAIN:
                        return ClientControllerState.RETURN_TO_MAIN;
                    case ClientControllerState.SHUTDOWN:
                        return ClientControllerState.SHUTDOWN;
                    default:
                        throw new Error("Comando desconhecido");
                }
            default:
                throw new Error("Comando desconhecido");
        }
    }

}

export default ClientControlParser;