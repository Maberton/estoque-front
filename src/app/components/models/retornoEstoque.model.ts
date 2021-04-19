import { Estoque } from "./estoque.model";

export class RetornoEstoque {
  soma: {
    custo: number;
    lucro: number;
  };
  dados: Array<Estoque>;
}
