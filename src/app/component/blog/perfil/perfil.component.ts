import { Blog } from './../model/blog';
import { Usuarios } from './../model/usuarios';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSerializer } from '@angular/router';
import { BlogService } from '../service/blog.service';
import { UsuariosService } from '../service/usuarios.service';
import { Comentarios } from './../model/comentarios';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  blog: Blog[] = [];

  users: Usuarios[] = [];

  user: Usuarios = {
    username: '',
    pfp: '',
    resumo: '',
    postagens: [],
    id: 0
  };
  post: Blog = {
    titulo: '',
    data: '',
    texto: '',
    imagem: '',
    autor: 0,
    comentarios: [],
    id: 0
  };
  comentarios: Comentarios[] = [];

  coment: Comentarios = {
    texto: '',
    autor: 0,
    curtidas: 0,
    data: '',
    id: 0
  }

  idDoAutor: number = 0;

  idDaPostagem: number = 0;

  constructor(
    private rotaAtiva: ActivatedRoute,
    private apiBlog: BlogService,
    private apiUsuarios: UsuariosService
  ) { }

  ngOnInit(): void {
    this.idDoAutor = (this.rotaAtiva.snapshot.params['id'])
    this.pegarInfos();
    this.showPost();

  }

  pegarInfos(): void {
    this.apiBlog.getUsuarioPorId(this.idDoAutor).subscribe((data) => {
      this.user = data
    })
  }

  showPost(): void {
    this.apiBlog.getAllBlog().subscribe((data) => {
      for (let pub of data) {
        if (pub.autor == this.idDoAutor) {
          this.blog.push(pub)

        }
      }
    })
  }
  // getAllUser(): void{
  //   this.apiUsuarios.getUsuarioPorId(this)
  // }

  // showPost(id: number): string {
  //   this.apiUsuarios.getUsuarioPorId(this.idDoAutor).subscribe((data) => {
  //     this.user = data;
  //     this.apiUsuarios.getAllUsuarios().subscribe((data) => {
  //       this.users = data;
  //     })
  //     console.log(id)
  //   })

  //   return ''
  // }



  //  this.apiBlog.getAllBlog().subscribe((data) => {
  // this.posts = data  / fazer um for if

  // precisa fazer a url perfil/iddoautor/iddapostagem
  // necessário criar uma nova rota

  // postagens do autor


  likePubli(): void {
    this.post.comentarios[0].curtidas++
    this.apiBlog.putnewBlog(this.post).subscribe((data) => {
      console.log(data)
      this.blog = data
    })
  }

  mostrarCurtidas(): number {
    for (let like of this.post.comentarios) {
      if (like.autor == this.idDoAutor) {
        return like.curtidas
      }
    }
    return 0
  }

}


