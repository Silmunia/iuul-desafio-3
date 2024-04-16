
import MenuRenderer from "./Interface/MenuRenderer";

class EmployeeRoleMenuRenderer implements MenuRenderer {
    public renderMenu(expectedInputs: number[]): void {
        console.log("\n***Menu: Editar Cargos do Funcionário***");
        console.log(`${expectedInputs[0]}. Adicionar Cargo ao Funcionário`);
        console.log(`${expectedInputs[1]}. Remover Cargo do Funcionário`);
        console.log(`${expectedInputs[2]}. Voltar para Menu de Editar Funcionário`);
        console.log(`${expectedInputs[3]}. Voltar para Menu Principal`);
        console.log(`${expectedInputs[4]}. Encerrar`);
    }
}

export default EmployeeRoleMenuRenderer;