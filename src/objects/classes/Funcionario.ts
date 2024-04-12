
import Pessoa from "../abstract classes/Pessoa";
import IUsuario from "../interfaces/IUsuario";
import Cargo from "./Cargo";

class Funcionario extends Pessoa implements IUsuario {

    private _cargos: Array<Cargo> = [];
    private _salario: number;

    constructor(cargoInicial: Cargo, outrosCargos: Array<Cargo> = [], cpf: string, nome: string, telefone: string, salario: number) {
        super(cpf, nome, telefone);

        this._cargos.push(cargoInicial);
        this._cargos.concat(outrosCargos);
        this._salario = salario;

        for (let i = 0; i < this._cargos.length; i++) {
            let cargoAtual = this._cargos[i];
            cargoAtual.novoFuncionario = this;
        }
    }

    autenticar(): boolean {
        return true;
    }
}

export default Funcionario;