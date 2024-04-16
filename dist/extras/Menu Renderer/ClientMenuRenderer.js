"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClientMenuRenderer {
    renderMenu(expectedInputs) {
        console.log("\n***Menu: Gerenciar Clientes***");
        console.log(`${expectedInputs[0]}. Criar Cliente`);
        console.log(`${expectedInputs[1]}. Editar Clientes`);
        console.log(`${expectedInputs[2]}. Voltar para Menu Principal`);
        console.log(`${expectedInputs[3]}. Encerrar`);
    }
}
exports.default = ClientMenuRenderer;
