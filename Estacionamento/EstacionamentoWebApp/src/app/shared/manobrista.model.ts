import { Carro } from "./carro.model";
import { Pessoa } from "./pessoa.model";

export class Manobrista {
  id: number;
  pessoa: Array<Pessoa>;
  carro: Array<Carro>;
  dataCriacao: string;

  constructor() {
    this.pessoa = new Array<Pessoa>();
    this.carro = new Array<Carro>();
  }
}
