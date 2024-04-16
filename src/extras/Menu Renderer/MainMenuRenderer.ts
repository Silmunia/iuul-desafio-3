
import MenuRenderer from "./Interface/MenuRenderer";

class MainMenuRenderer implements MenuRenderer {
    public renderMenu(expectedInputs: number[]): void {
        console.log("\n***Menu Principal***");
        console.log(`${expectedInputs[0]}. Gerenciar Funcionários`);
        console.log(`${expectedInputs[1]}. Gerenciar Clientes`);
        console.log(`${expectedInputs[2]}. Encerrar`);
    }
}

export default MainMenuRenderer;