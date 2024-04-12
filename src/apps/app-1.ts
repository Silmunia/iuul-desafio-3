
import Cargo from "../objects/classes/Cargo";
import Funcionario from "../objects/classes/Funcionario";

let cargoAtendente = new Cargo("Atendente");
let atendente = new Funcionario(cargoAtendente, [], "123.456.789-10", "Fun A", "(12) 3456-7890", 2500);
console.log("Novo Funcionário criado:");
console.log(atendente);

let cargoGerente = new Cargo("Gerente");
let gerente = new Funcionario(cargoGerente, [], "109.876.543-21", "Fun B", "(10) 9876-5432", 5000);
console.log("Novo Funcionário criado:");
console.log(gerente);
