import * as readline from 'readline';

class InputHandler {
    getInput() {
        return new Promise(function(resolve) {
            let readingInterface = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
    
            readingInterface.question("Insira comando:", input => {
                readingInterface.close();
                resolve(input);
            });
        });
    }
}

export default InputHandler;