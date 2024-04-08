import { parse } from "path";
import InputHandler from "./InputHandler";

enum ControllerState {
    INITIAL = 0,
    EMPLOYEE_MENU = 1,
    SHUTDOWN = 999,
    RESET = 1000
}

class Controller {
    private currentState: ControllerState = ControllerState.INITIAL;
    private inputHandler: InputHandler = new InputHandler();
    
    public startProgram() {
        this.inputLoop();
    }

    private async inputLoop() {
        switch (this.currentState) {
            case ControllerState.INITIAL:
                console.log("***Menu Principal***");
                console.log("1. Gerenciar Funcionários");
                console.log("999. Encerrar");
                let input = await this.inputHandler.getInput();
                this.processUserInput(input);
                break;
            case ControllerState.EMPLOYEE_MENU:
                console.log("***Menu: Gerenciar Funcionários***");
                console.log("1. Criar Funcionários");
                console.log("888. Voltar para Menu Principal");
                console.log("999. Encerrar");
                break;
            case ControllerState.SHUTDOWN:
                console.log(">>> Encerrando programa");
                return;
            case ControllerState.RESET:
                console.log(">>> Voltando para o Menu principal");
                this.currentState = ControllerState.INITIAL;
                this.inputLoop();
                break;
            default:
                console.log(">>> Comando desconhecido");
                this.currentState = ControllerState.RESET;
                this.inputLoop();
        }
    }

    private processUserInput(input: unknown) {
        if (typeof input === 'string') {
            let parsedInput: number = parseInt(input);
            
            this.currentState = parsedInput;

            this.inputLoop();
        } else {
            this.currentState = ControllerState.RESET;
            this.inputLoop();
        }
    }
}

export default Controller;