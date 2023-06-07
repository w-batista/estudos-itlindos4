import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Departamento } from '../model/departamento';
import { Produtos } from '../model/produtos';

@Injectable({
  providedIn: 'root'
})
export class CmsService {

  constructor(private http: HttpClient) { }

  readonly apiUrl: string = 'http://localhost:3000/';

  getAllDepartamentos(): Observable<Departamento[]>{
    return this.http.get<Departamento[]>(`${this.apiUrl}departamentos`)
  }

  getDepartamentoById(id: number): Observable<Departamento>{
    return this.http.get<Departamento>(`${this.apiUrl}departamentos/${id}`)
  }

  insereNovoDep(dep: Departamento): Observable<Departamento>{
    return this.http.post<Departamento>(this.apiUrl + 'departamentos/', dep)
  }

  putEditarDep(dep: Departamento): Observable<Departamento>{
    return this.http.put<Departamento>(this.apiUrl + 'departamentos/' + dep.id, dep)
  }

  deleteDepartamento(id: number): Observable<Departamento>{
    return this.http.delete<Departamento>(this.apiUrl + 'departamentos/' + id)
  }

  getAllProduto(): Observable<Produtos[]> {
    return this.http.get<Produtos[]>(this.apiUrl + 'produtos')
  }

  getProdutoById(id: number): Observable<Produtos> {
    return this.http.get<Produtos>(this.apiUrl + 'produtos/' + id)
  }

  insereNovoProduto(prod: Produtos): Observable<Produtos>{
    return this.http.post<Produtos>(this.apiUrl + 'produtos', prod)
  }

  putEditaProduto(prod: Produtos): Observable<Produtos> {
    return this.http.put<Produtos>(this.apiUrl + 'produtos/' + prod.id, prod)
  }

  deleteProduto(id: number): Observable<Produtos>{
    return this.http.delete<Produtos>(this.apiUrl + 'produtos/' + id )
  }





}


