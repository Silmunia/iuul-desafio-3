
import MenuRenderer from "./Interface/MenuRenderer";

class EmployeeMenuRenderer implements MenuRenderer {
    public renderMenu(expectedInputs: number[]): void {
        console.log("\n***Menu: Gerenciar Funcionários***");
        console.log(`${expectedInputs[0]}. Criar Funcionário`);
        console.log(`${expectedInputs[1]}. Editar Funcionários`);
        console.log(`${expectedInputs[2]}. Voltar para Menu Principal`);
        console.log(`${expectedInputs[3]}. Encerrar`);
    }
}

export default EmployeeMenuRenderer;