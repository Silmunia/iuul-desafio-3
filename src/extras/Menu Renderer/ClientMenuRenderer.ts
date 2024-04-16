
import MenuRenderer from "./Interface/MenuRenderer";

class ClientMenuRenderer implements MenuRenderer {
    public renderMenu(expectedInputs: number[]): void {
        console.log("\n***Menu: Gerenciar Clientes***");
        console.log(`${expectedInputs[0]}. Criar Cliente`);
        console.log(`${expectedInputs[1]}. Editar Clientes`);
        console.log(`${expectedInputs[2]}. Voltar para Menu Principal`);
        console.log(`${expectedInputs[3]}. Encerrar`);
    }
}

export default ClientMenuRenderer;