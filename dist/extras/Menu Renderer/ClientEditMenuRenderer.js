"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClientEditMenuRenderer {
    renderMenu(expectedInputs) {
        console.log("\n***Menu: Editar Cliente***");
        console.log(`${expectedInputs[0]}. Listar informações do Cliente`);
        console.log(`${expectedInputs[1]}. Editar Nome`);
        console.log(`${expectedInputs[2]}. Editar Telefone`);
        console.log(`${expectedInputs[3]}. Editar CPF`);
        console.log(`${expectedInputs[4]}. Editar estado VIP`);
        console.log(`${expectedInputs[5]}. Gerenciar Endereço(s)`);
        console.log(`${expectedInputs[6]}. Gerenciar Conta(s)`);
        console.log(`${expectedInputs[7]}. Voltar para Menu Principal`);
        console.log(`${expectedInputs[8]}. Encerrar`);
    }
}
exports.default = ClientEditMenuRenderer;
