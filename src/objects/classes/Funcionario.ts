
import Pessoa from "../abstract classes/Pessoa";
import IUsuario from "../interfaces/IUsuario";
import Cargo from "./Cargo";

class Funcionario extends Pessoa implements IUsuario {

    public readonly cargos: Array<Cargo> = [];
    public salario: number;

    constructor(cargos: Array<Cargo>, cpf: string, nome: string, telefone: string, salario: number) {
        super(cpf, nome, telefone);

        this.cargos = cargos;
        this.salario = salario;

        for (let i = 0; i < this.cargos.length; i++) {
            let cargoAtual = this.cargos[i];
            cargoAtual.adicionarFuncionario(this);
        }
    }

    autenticar(): boolean {
        return true;
    }
}

export default Funcionario;