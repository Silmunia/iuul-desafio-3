
import Cliente from "../../../objects/classes/Cliente";

class ClientDataModel {
    private clients: Array<Cliente> = [];

    public addClient(client: Cliente) {
        this.clients.push(client);
    }

    public listClients(): string {
        try {
            return this.listData(this.clients, "Sem Clientes para listar");
        } catch (error) {
            throw error;
        }
    }

    public getClient(index: number) {
        if (index >= 0 && index < this.clients.length) {
            return this.clients[index];
        } else {
            throw new Error("Não há Cliente com o índice selecionado");
        }
    }

    public getAllClients(): Array<Cliente> {
        return this.clients;
    }

    private listData(dataArray: Array<Cliente>, errorMessage: string): string {
        if (dataArray.length === 0) {
            throw new Error(errorMessage);
        }

        let resultList: string = "";

        for (let i = 0; i < dataArray.length; i++) {
            let current = dataArray[i];

            resultList += `${i+1}. ${current.nome}, CPF ${current.cpf}`;

            if (i < dataArray.length-1) {
                resultList += "\n";
            }
        }

        return resultList;
    }
}

export default ClientDataModel;