
import MenuRenderer from "./Interface/MenuRenderer";

class ClientAccountsMenuRenderer implements MenuRenderer {
    public renderMenu(expectedInputs: number[]): void {
        console.log("\n***Menu: Gerenciar Contas do Cliente***");
        console.log(`${expectedInputs[0]}. Listar Contas do Cliente`);
        console.log(`${expectedInputs[1]}. Adicionar Contas ao Cliente`);
        console.log(`${expectedInputs[2]}. Remover Contas do Cliente`);
        console.log(`${expectedInputs[3]}. Fazer depósito`);
        console.log(`${expectedInputs[4]}. Fazer saque`);
        console.log(`${expectedInputs[5]}. Calcular saldo`);
        console.log(`${expectedInputs[6]}. Fazer transferência`);
        console.log(`${expectedInputs[7]}. Voltar para Menu de Editar Cliente`);
        console.log(`${expectedInputs[8]}. Voltar para Menu Principal`);
        console.log(`${expectedInputs[9]}. Encerrar`);
    }
}

export default ClientAccountsMenuRenderer;