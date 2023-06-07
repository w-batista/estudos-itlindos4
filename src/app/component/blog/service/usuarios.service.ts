import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from  'rxjs';
import { Usuarios } from './../model/usuarios';




@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  readonly apiUrl: string = 'http://localhost:3000/'




  getAllUsuarios(): Observable<Usuarios[]>{
    return this.http.get<Usuarios[]>(this.apiUrl + 'usuarios')
  }

  getUsuarioPorId(id: number): Observable<Usuarios>{
    return this.http.get<Usuarios>(this.apiUrl + 'usuarios/' + id)
  }

  postNovoUser(post: Usuarios): Observable<Usuarios>{
    return this.http.post<Usuarios>(this.apiUrl + 'usuarios/' , post)
  }

  // insereNovoComent(post: Usuarios): Observable<Usuarios[]>{
  //   return this.http.post<Usuarios[]>(this.apiUrl + 'usuarios', post)
  // }


}
