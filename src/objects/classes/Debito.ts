class Debito {
    public readonly valor: number
    public readonly data: Date

    constructor(valor: number, data: Date) {
        this.valor = valor;
        this.data = data;
    }
}

export default Debito;