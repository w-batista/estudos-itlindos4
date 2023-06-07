import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuarios } from '../model/usuarios';
import { Blog } from '../model/blog';
import { BlogService } from '../service/blog.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../service/usuarios.service';
import { Comentarios } from './../model/comentarios';


@Component({
  selector: 'app-blog-interna',
  templateUrl: './blog-interna.component.html',
  styleUrls: ['./blog-interna.component.scss']
})
export class BlogInternaComponent implements OnInit {

  formPost: FormGroup;

  blog: Blog = {
    titulo: '',
    data: '',
    texto: '',
    imagem: '',
    autor: 0,
    comentarios: [],
    id: 0
  };
  coment: Comentarios = {
    texto: '',
    autor: 0,
    curtidas: 0,
    data: '',
    id: 0
  }
  post: Blog[] = []
  users: Usuarios[] = [];
  idDaUrl: number = 0;
  comentarios: Comentarios[] = [];

  idDoAutor: number = 0;


  constructor(
    private rotaAtiva: ActivatedRoute,
    private apiBlog: BlogService,
    private apiUsuarios: UsuariosService
  ) {
    this.formPost = new FormGroup({
      texto: new FormControl('',[Validators.required, Validators.minLength(25), Validators.maxLength(255)]),
    })
   }

   ngOnInit(): void {
     this.idDoAutor = Number(this.rotaAtiva.snapshot.params['id'])
     this.pegarInfos();
    }

    pegarInfos(): void {
      this.apiUsuarios.getAllUsuarios().subscribe((resp) => {
        this.users = resp
        this.apiBlog.getBlogPorId(this.idDoAutor).subscribe((data) => {
          this.blog = data
        })
      })
    }

    converteData(data: string): string{
      return data.split(':')[0].trim().split('/').reverse().join('/')
    }


    findAutor(id: number): string {
      for (let autor of this.users){
        if (autor.id == id){
          return autor.username
        }
      }

      return ''
    }

    pegarComentario(post: Blog): void{
      this.apiBlog.insereNovoPost(post).subscribe((data) => {
        alert ('Comentário enviado')
        this.pegarInfos();

    })
  }



  adicionaComentario(publi: Comentarios): void {
    this.apiBlog.insereNovoPost( this.blog ).subscribe( ( data )=>{
      this.blog = data
    })
    window.location.href = `http://localhost:4200/blog/interna/${this.idDoAutor}`
  }
  editarComentario(){
    this.coment = {
      texto: this.formPost.value.texto,
      autor: 2,
      curtidas: 0,
      id: 0,
      data: this.pegaAgoraISO()
    }
    let novoComent = this.blog
    this.blog.comentarios.push(this.coment)
  this.apiBlog.putnewBlog(novoComent).subscribe ((data) =>{
    this.coment = {
      texto: this.formPost.value.texto = '',
      autor: 0,
      curtidas: 0,
      id: 0,
      data: this.pegaAgoraISO()
    }
  })
  this.adicionaComentario(this.coment)
  }

  pegaAgoraISO(): string{
    let agora: Date = new Date()
    return agora.toISOString()
  }

  likePubli(): void {
    this.blog.comentarios[0].curtidas ++
    this.apiBlog.insereNovoPost(this.blog).subscribe((data) => {
      this.blog = data
      this.apiBlog.getBlogPorId(this.coment.id).subscribe((data) => {
        this.blog = data
      })
    })
  }

  mostrarCurtidas(): number {
    for ( let like of this.blog.comentarios){
      if (like.autor == this.idDoAutor){
        return like.curtidas
      }
    }
    return 0
  }

}
