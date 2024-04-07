class Endereco {
    public readonly cep: string
    public readonly logradouro: string
    public readonly numero: string
    public readonly complemento: string
    public readonly cidade: string
    public readonly uf: string

    constructor(cep: string, logradouro: string, numero: string, complemento: string, cidade: string, unidadeFederativa: string) {
        this.cep = cep;
        this.logradouro = logradouro;
        this.numero = numero;
        this.complemento = complemento;
        this.cidade = cidade;
        this.uf = unidadeFederativa;
    }
}

export default Endereco;