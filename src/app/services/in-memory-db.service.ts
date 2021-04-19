import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDb implements InMemoryDbService{

  constructor() { }
  createDb() {
    let estoque = [
      {id: 1, nome: 'Perfume 1', estoque: 10, custo: 3, valorVenda: 15, lucro: 5},
      {id: 1, nome: 'Perfume 2', estoque: 10, custo: 5, valorVenda: 15, lucro: 5},
      {id: 1, nome: 'Perfume 3', estoque: 10, custo: 4, valorVenda: 15, lucro: 5},
      {id: 1, nome: 'Perfume 4', estoque: 10, custo: 9, valorVenda: 15, lucro: 5},
      {id: 1, nome: 'Creme 1', estoque: 10, custo: 3, valorVenda: 15, lucro: 5},
      {id: 1, nome: 'Creme 2', estoque: 10, custo: 3, valorVenda: 15, lucro: 5},
      {id: 1, nome: 'Creme 3', estoque: 10, custo: 3, valorVenda: 15, lucro: 5},
      {id: 1, nome: 'Brinco 1', estoque: 10, custo: 3, valorVenda: 15, lucro: 5},
    ];
    return {estoque};
  }
}
