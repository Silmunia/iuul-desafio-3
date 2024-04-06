class Test {
    public testProperty: number;

    constructor(test: number) {
        this.testProperty = test;
    }
}

let test = new Test(1);

console.log(test);