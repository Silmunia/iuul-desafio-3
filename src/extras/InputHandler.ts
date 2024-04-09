import * as readline from 'readline';

class InputHandler {
    public async getStringInput(prompt: string): Promise<string> {
        return new Promise<string>(async (resolve) => {
            let input = await this.getInput(prompt);

            if (typeof input === 'string') {
                resolve(input);
            } else {
                console.log(">>> Valor inválido");
                return this.getStringInput(prompt);
            }
        });
    }

    public async getNumberInput(prompt: string): Promise<number> {
        return new Promise<number>(async (resolve) => {
            let input = await this.getInput(prompt);

            if (typeof input === 'string') {
                let parsed = parseInt(input);

                resolve(parsed);
            } else {
                console.log(">>> Valor inválido");
                return this.getNumberInput(prompt);
            }
        });
    }

    private getInput(message: string) {
        return new Promise(function(resolve) {
            let readingInterface = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
    
            readingInterface.question(message, input => {
                readingInterface.close();
                resolve(input);
            });
        });
    }
}

export default InputHandler;