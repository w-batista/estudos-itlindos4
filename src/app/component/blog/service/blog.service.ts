import { Usuarios } from './../model/usuarios';
import { Blog } from './../model/blog';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from  'rxjs';



@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  readonly apiUrl: string = 'http://localhost:3000/';

  // BLOG/POST

  getAllBlog(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl + 'blog')
  }

  getBlogPorId(id: number): Observable<Blog> {
    return this.http.get<Blog>(this.apiUrl + 'blog/' + id)
  }

  insereNovoPost(post: Blog): Observable<Blog>{
    return this.http.post<Blog>(this.apiUrl + 'blog', post)
  }

  putnewBlog(publi: Blog): Observable<Blog[]> {
    return this.http.put<Blog[]>(this.apiUrl + 'blog/' + publi.id, publi)
  }

  // AUTORES/USUARIOS
  getAllUsuarios(): Observable<Usuarios[]>{
    return this.http.get<Usuarios[]>(this.apiUrl + 'usuarios')
  }

  getUsuarioPorId(id: number): Observable<Usuarios>{
    return this.http.get<Usuarios>(this.apiUrl + 'usuarios/' + id)
  }

  putUsuarioPorid(usuario: Usuarios): Observable<Usuarios> {
    return this.http.put<Usuarios>(this.apiUrl + 'usuarios/' + usuario.id, usuario)
  }
}
