import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Estoque } from '../components/models/estoque.model';
import { Produto } from '../components/models/produto.model';
import { RetornoEstoque } from '../components/models/retornoEstoque.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

  apiBase = 'http://192.168.1.26:3333'

  constructor(
    private http: HttpClient
  ) { }

  listarProdutos(): Observable<Array<Produto>> {
    return this.http.get<Array<Produto>>(`${this.apiBase}/produtos`, {headers: this.headers});
  }

  listarEstoque(): Observable<RetornoEstoque> {
    return this.http.get<RetornoEstoque>(`${this.apiBase}/estoque`, {headers: this.headers});
  }

  gravarEstoque(produto:Estoque): Observable<any> {
    return this.http.post<any>(`${this.apiBase}/estoque`, produto, {headers: this.headers});
  }

  atualizaEstoque(estoque: Estoque): Observable<any> {
    return this.http.put<any>(`${this.apiBase}/estoque`, estoque, {headers: this.headers});
  }
}
