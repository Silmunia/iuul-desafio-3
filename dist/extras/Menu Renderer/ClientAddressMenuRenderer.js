"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClientAddressMenuRenderer {
    renderMenu(expectedInputs) {
        console.log("\n***Menu: Gerenciar Endereços do Cliente***");
        console.log(`${expectedInputs[0]}. Listar Endereços do Cliente`);
        console.log(`${expectedInputs[1]}. Adicionar Endereço`);
        console.log(`${expectedInputs[2]}. Remover Endereço`);
        console.log(`${expectedInputs[3]}. Voltar para Menu de Editar Cliente`);
        console.log(`${expectedInputs[4]}. Voltar para Menu Principal`);
        console.log(`${expectedInputs[5]}. Encerrar`);
    }
}
exports.default = ClientAddressMenuRenderer;
