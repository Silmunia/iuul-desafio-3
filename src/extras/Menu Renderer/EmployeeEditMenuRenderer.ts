
import MenuRenderer from "./Interface/MenuRenderer";

class EmployeeEditMenuRenderer implements MenuRenderer {
    public renderMenu(expectedInputs: number[]): void {
        console.log("\n***Menu: Editar Funcionário***");
        console.log(`${expectedInputs[0]}. Listar informações do Funcionário`);
        console.log(`${expectedInputs[1]}. Editar Nome`);
        console.log(`${expectedInputs[2]}. Editar Telefone`);
        console.log(`${expectedInputs[3]}. Editar Salário`);
        console.log(`${expectedInputs[4]}. Editar CPF`);
        console.log(`${expectedInputs[5]}. Editar Cargos`);
        console.log(`${expectedInputs[6]}. Voltar para Menu Principal`);
        console.log(`${expectedInputs[7]}. Encerrar`);
    }
}

export default EmployeeEditMenuRenderer;