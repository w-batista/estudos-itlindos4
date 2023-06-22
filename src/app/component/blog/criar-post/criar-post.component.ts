import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Blog } from '../model/blog';
import { BlogService } from '../service/blog.service';
import { Usuarios } from '../model/usuarios';

@Component({
  selector: 'app-criar-post',
  templateUrl: './criar-post.component.html',
  styleUrls: ['./criar-post.component.scss']
})
export class CriarPostComponent {

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
  
  constructor(
    private apiBlog: BlogService
  ) {
    this.formPost = new FormGroup({
      titulo: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
      texto: new FormControl('', [Validators.required, Validators.minLength(255)]),
      imagem: new FormControl(''),
      id: new FormControl ()
    })
  }

  converteData(data: string): string {
    return data.split('T')[0].trim().split('-').reverse().join('/')
  }

  criarPost(): void {
    console.log(this.formPost)
    let postParaEnviar: Blog = {
      titulo: this.formPost.value.titulo,
      texto: this.formPost.value.texto,
      imagem: this.formPost.value.imagem,
      autor: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string)?.id : 0,
      comentarios: [],
      id: 0,
      data: this.pegaAgoraISO()
    }
    let novoPost = this.apiBlog
    this.apiBlog.insereNovoPost(postParaEnviar).subscribe ((data) => {
      const dadosDoNovoPost = data

      let usuarioAlterado = JSON.parse(localStorage.getItem('user') as string) as Usuarios

      usuarioAlterado.postagens.push(dadosDoNovoPost.id);

      this.apiBlog.putUsuarioPorid(usuarioAlterado).subscribe();
      
      alert ('Postagem criada!')
    })
  }

  pegaAgoraISO(): string {
    let agora: Date = new Date()
    return agora.toISOString()
    }

}
