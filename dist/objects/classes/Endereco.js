"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cliente_1 = __importDefault(require("./Cliente"));
class Endereco {
    constructor(cep, logradouro, numero, complemento, cidade, unidadeFederativa) {
        this._cep = cep;
        this._logradouro = logradouro;
        this._numero = numero;
        this._complemento = complemento;
        this._cidade = cidade;
        this._uf = unidadeFederativa;
    }
    set cliente(cliente) {
        this._cliente = cliente;
    }
    get cliente() {
        if (this._cliente instanceof Cliente_1.default) {
            return this._cliente;
        }
        else {
            throw Error("Endereço não possui Cliente associado");
        }
    }
    listarInformaçoes() {
        return `${this._uf}, ${this._cidade}, ${this._logradouro}, número ${this._numero}, ${this._complemento}, CEP ${this._cep}`;
    }
}
exports.default = Endereco;
