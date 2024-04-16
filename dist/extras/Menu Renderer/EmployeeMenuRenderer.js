"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmployeeMenuRenderer {
    renderMenu(expectedInputs) {
        console.log("\n***Menu: Gerenciar Funcionários***");
        console.log(`${expectedInputs[0]}. Criar Funcionário`);
        console.log(`${expectedInputs[1]}. Editar Funcionários`);
        console.log(`${expectedInputs[2]}. Voltar para Menu Principal`);
        console.log(`${expectedInputs[3]}. Encerrar`);
    }
}
exports.default = EmployeeMenuRenderer;
