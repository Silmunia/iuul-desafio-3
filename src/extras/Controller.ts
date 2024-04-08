import ControllerState from "./ControllerState";
import InputHandler from "./InputHandler";

class Controller {
    private currentState: ControllerState = ControllerState.MAIN_MENU;
    private inputHandler: InputHandler = new InputHandler();
    
    public startProgram() {
        this.runControlLoop();
    }

    private runControlLoop() {
        switch (this.currentState) {
            case ControllerState.MAIN_MENU:
            case ControllerState.EMPLOYEE_MENU:
                this.displayMenu();
                this.startUserInput();
                break;
            case ControllerState.SHUTDOWN:
                console.log(">>> Encerrando programa");
                return;
            case ControllerState.RESET:
                console.log(">>> Voltando para o Menu principal");
                this.currentState = ControllerState.MAIN_MENU;
                this.runControlLoop();
                break;
            default:
                console.log(">>> Comando desconhecido");
                this.currentState = ControllerState.RESET;
                this.runControlLoop();
        }
    }

    private displayMenu() {
        switch (this.currentState) {
            case ControllerState.MAIN_MENU:
                console.log("***Menu Principal***");
                console.log(`${ControllerState.EMPLOYEE_MENU}. Gerenciar Funcionários`);
                console.log(`${ControllerState.SHUTDOWN}. Encerrar`);
                break;
            case ControllerState.EMPLOYEE_MENU:
                console.log("***Menu: Gerenciar Funcionários***");
                console.log("1. Criar Funcionários");
                console.log(`${ControllerState.MAIN_MENU}. Voltar para Menu Principal`);
                console.log(`${ControllerState.SHUTDOWN}. Encerrar`);
                break;
            default:
                console.log(">>> Menu desconhecido");
                console.log(">>> Voltando para o Menu Principal");
                this.currentState = ControllerState.MAIN_MENU;
                this.runControlLoop();
        }
    }

    private async startUserInput() {
        this.parseUserInput(await this.inputHandler.getInput());
    }

    private parseUserInput(input: unknown) {
        if (typeof input === 'string') {
            let parsedInput: number = parseInt(input);
            
            this.currentState = parsedInput;

            this.runControlLoop();
        } else {
            this.currentState = ControllerState.RESET;
            this.runControlLoop();
        }
    }
}

export default Controller;