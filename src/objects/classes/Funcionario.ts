
import Pessoa from "../abstract classes/Pessoa";
import IUsuario from "../interfaces/IUsuario";
import Cargo from "./Cargo";

class Funcionario extends Pessoa implements IUsuario {

    public readonly cargos: Array<Cargo> = [];
    public readonly salario: number;

    constructor(nomeDoCargo: string, cpf: string, nome: string, telefone: string, salario: number) {
        super(cpf, nome, telefone);

        this.cargos.push(new Cargo(nomeDoCargo));
        this.salario = salario;
    }

    autenticar(): boolean {
        return true;
    }
}

export default Funcionario;