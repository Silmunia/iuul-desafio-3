import * as readline from 'readline';

class InputHandler {
    public async getStringInput(prompt: string): Promise<string> {
        return this.getInput(prompt).then((input) => {
            if (typeof input === 'string') {
                return Promise.resolve(input);
            } else {
                console.log(">>> Valor inválido");
                return this.getStringInput(prompt);
            }
        });
    }

    public async getNumberInput(prompt: string): Promise<number> {
        return this.getInput(prompt).then((input) => {
            if (typeof input === 'string') {
                let parsed = parseInt(input);

                return Promise.resolve(parsed);
            } else {
                console.log(">>> Valor inválido");
                return this.getNumberInput(prompt);
            }
        });
    }

    public async getBooleanInput(prompt: string): Promise<boolean> {
        return this.getInput(prompt).then((input) => {
            if (typeof input === 'string') {
                let lowerCaseInput = input.toLowerCase();

                if (lowerCaseInput.startsWith('s')) {
                    return Promise.resolve(true);
                } else if (lowerCaseInput.startsWith('n')) {
                    return Promise.resolve(false);
                } else {
                    console.log(">>> Valor inválido");
                    return this.getBooleanInput(prompt);
                }
            } else {
                console.log(">>> Valor inválido");
                return this.getBooleanInput(prompt);
            }
        });
    }

    private getInput(message: string) {
        let readingInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise(function(resolve) {
            readingInterface.question(message, input => {
                readingInterface.close();
                resolve(input);
            });
        });
    }
}

export default InputHandler;