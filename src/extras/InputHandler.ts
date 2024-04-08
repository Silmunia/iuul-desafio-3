import * as readline from 'readline';

class InputHandler {
    getInput(message: string) {
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