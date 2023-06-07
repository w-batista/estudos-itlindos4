import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor( private http: HttpClient) { }

  readonly apiUrl: string = 'http://localhost:3000/';

  getTodosProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl + 'produtos')
  }

  getProdutoPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(this.apiUrl + 'produtos/' + id)
  }

  insereNovoProduto(prod: Produto): Observable<Produto>{
    return this.http.post<Produto>(this.apiUrl + 'produtos', prod)
  }

  putEditaProduto(prod: Produto): Observable<Produto> {
    return this.http.put<Produto>(this.apiUrl + 'produtos/' + prod.id, prod)
  }

  deleteProduto(id: number): Observable<Produto>{
    return this.http.delete<Produto>(this.apiUrl + 'produtos/' + id )
  }
}
