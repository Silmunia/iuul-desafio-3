
import Pessoa from "../abstract classes/Pessoa";
import IUsuario from "../interfaces/IUsuario";
import Cargo from "./Cargo";

class Funcionario extends Pessoa implements IUsuario {

    private _cargos: Array<Cargo> = [];
    private _salario: number;

    constructor(cargoInicial: Cargo, cpf: string, nome: string, telefone: string, salario: number, outrosCargos: Array<Cargo> = []) {
        super(cpf, nome, telefone);

        this._cargos.push(cargoInicial);
        this._cargos = this._cargos.concat(outrosCargos);
        this._salario = salario;

        for (let i = 0; i < this._cargos.length; i++) {
            let cargoAtual = this._cargos[i];
            cargoAtual.novoFuncionario = this;
        }
    }

    public get cargos(): Array<Cargo> {
        return this._cargos;
    }

    public get salario(): number {
        return this._salario;
    }

    public set salario(novoSalario: number) {
        this._salario = novoSalario;
    }

    public adicionarCargo(novoCargo: Cargo) {
        this._cargos.push(novoCargo);
        novoCargo.novoFuncionario = this;
    }

    public removerCargo(nomeDoCargo: string) {
        if (this.cargos.length === 1) {
            throw new Error("Não é possível remover o Cargo de um Funcionário com apenas um Cargo");
        } else {
            for (let i = 0; i < this._cargos.length; i++) {
                if (this._cargos[i].nome === nomeDoCargo) {
                    try {
                        this._cargos[i].removerFuncionario(this);
                        this._cargos.splice(i, 1);
                        return;
                    } catch (error) {
                        throw error;
                    }
                }

                throw new Error("O Funcionário não possui o Cargo escolhido para remoção");
            }
        }
    }

    public autenticar(): boolean {
        return true;
    }
}

export default Funcionario;