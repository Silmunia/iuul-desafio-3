
class MenuRenderer {
    public renderMainMenu(expectedInputs: Array<number>) {
        console.log("\n***Menu Principal***");
        console.log(`${expectedInputs[0]}. Gerenciar Funcionários`);
        console.log(`${expectedInputs[1]}. Gerenciar Clientes`);
        console.log(`${expectedInputs[2]}. Encerrar`);
    }

    public renderMainEmployeeMenu(expectedInputs: Array<number>) {
        console.log("\n***Menu: Gerenciar Funcionários***");
        console.log(`${expectedInputs[0]}. Criar Funcionário`);
        console.log(`${expectedInputs[1]}. Editar Funcionários`);
        console.log(`${expectedInputs[2]}. Voltar para Menu Principal`);
        console.log(`${expectedInputs[3]}. Encerrar`);
    }

    public renderEditEmployeeMenu(expectedInputs: Array<number>) {
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

    public renderEditEmployeeRolesMenu(expectedInputs: Array<number>) {
        console.log("\n***Menu: Editar Cargos do Funcionário***");
        console.log(`${expectedInputs[0]}. Adicionar Cargo ao Funcionário`);
        console.log(`${expectedInputs[1]}. Remover Cargo do Funcionário`);
        console.log(`${expectedInputs[2]}. Voltar para Menu de Editar Funcionário`);
        console.log(`${expectedInputs[3]}. Voltar para Menu Principal`);
        console.log(`${expectedInputs[4]}. Encerrar`);
    }

    public renderMainClientMenu(expectedInputs: Array<number>) {
        console.log("\n***Menu: Gerenciar Clientes***");
        console.log(`${expectedInputs[0]}. Criar Cliente`);
        console.log(`${expectedInputs[1]}. Editar Clientes`);
        console.log(`${expectedInputs[2]}. Voltar para Menu Principal`);
        console.log(`${expectedInputs[3]}. Encerrar`);
    }

    public renderEditClientMenu(expectedInputs: Array<number>) {
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

    public manageClientAddressesMenu(expectedInputs: Array<number>) {
        console.log("\n***Menu: Gerenciar Endereços do Cliente***");
        console.log(`${expectedInputs[0]}. Listar Endereços do Cliente`);
        console.log(`${expectedInputs[1]}. Adicionar Endereço`);
        console.log(`${expectedInputs[2]}. Remover Endereço`);
        console.log(`${expectedInputs[3]}. Voltar para Menu de Editar Cliente`);
        console.log(`${expectedInputs[4]}. Voltar para Menu Principal`);
        console.log(`${expectedInputs[5]}. Encerrar`);
    }

    public manageClientAccountsMenu(expectedInputs: Array<number>) {
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

export default MenuRenderer;