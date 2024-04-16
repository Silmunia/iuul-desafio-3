"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmployeeRoleMenuRenderer {
    renderMenu(expectedInputs) {
        console.log("\n***Menu: Editar Cargos do Funcionário***");
        console.log(`${expectedInputs[0]}. Adicionar Cargo ao Funcionário`);
        console.log(`${expectedInputs[1]}. Remover Cargo do Funcionário`);
        console.log(`${expectedInputs[2]}. Voltar para Menu de Editar Funcionário`);
        console.log(`${expectedInputs[3]}. Voltar para Menu Principal`);
        console.log(`${expectedInputs[4]}. Encerrar`);
    }
}
exports.default = EmployeeRoleMenuRenderer;
