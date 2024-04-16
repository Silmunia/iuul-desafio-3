"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MainMenuRenderer {
    renderMenu(expectedInputs) {
        console.log("\n***Menu Principal***");
        console.log(`${expectedInputs[0]}. Gerenciar Funcionários`);
        console.log(`${expectedInputs[1]}. Gerenciar Clientes`);
        console.log(`${expectedInputs[2]}. Encerrar`);
    }
}
exports.default = MainMenuRenderer;
